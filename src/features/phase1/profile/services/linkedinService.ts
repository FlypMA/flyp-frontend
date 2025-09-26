/**
 * 🔗 LinkedIn Integration Service
 *
 * Service for integrating with LinkedIn API to import profile data
 */

import {
  BusinessOwnerProfile,
  Certification,
  Credential,
  InvestmentExperience,
  InvestmentFocus,
  InvestorProfile,
  PersonalInfo,
} from '../types/profile.types';

// =============================================================================
// LINKEDIN API TYPES
// =============================================================================

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline?: string;
  summary?: string;
  location?: {
    name: string;
    country: string;
  };
  profilePicture?: {
    displayImage: string;
  };
  industry?: string;
  positions?: LinkedInPosition[];
  educations?: LinkedInEducation[];
  skills?: LinkedInSkill[];
  languages?: LinkedInLanguage[];
  contactInfo?: {
    emailAddress?: string;
    phoneNumbers?: Array<{
      number: string;
      type: string;
    }>;
  };
}

export interface LinkedInPosition {
  id: string;
  title: string;
  companyName: string;
  companyId?: string;
  location?: string;
  description?: string;
  startDate?: {
    year: number;
    month?: number;
  };
  endDate?: {
    year: number;
    month?: number;
  };
  isCurrent: boolean;
}

export interface LinkedInEducation {
  id: string;
  schoolName: string;
  degreeName?: string;
  fieldOfStudy?: string;
  startDate?: {
    year: number;
  };
  endDate?: {
    year: number;
  };
}

export interface LinkedInSkill {
  id: string;
  name: string;
}

export interface LinkedInLanguage {
  id: string;
  name: string;
  proficiency?: string;
}

// =============================================================================
// LINKEDIN SERVICE CLASS
// =============================================================================

class LinkedInService {
  private baseUrl = 'https://api.linkedin.com/v2';
  private clientId: string;
  private redirectUri: string;

  constructor() {
    this.clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID || '';
    this.redirectUri = `${window.location.origin}/auth/linkedin/callback`;
  }

  /**
   * Get LinkedIn authorization URL
   */
  getAuthorizationUrl(): string {
    const scopes = [
      'r_liteprofile',
      'r_emailaddress',
      'r_basicprofile',
      'r_fullprofile',
      'r_organization_social',
      'w_organization_social',
    ].join(' ');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state: this.generateState(),
      scope: scopes,
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch('/api/auth/linkedin/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    return data.access_token;
  }

  /**
   * Get LinkedIn profile data
   */
  async getProfile(accessToken: string): Promise<LinkedInProfile> {
    const fields = [
      'id',
      'firstName',
      'lastName',
      'headline',
      'summary',
      'location',
      'profilePicture(displayImage~:playableStreams)',
      'industry',
      'positions',
      'educations',
      'skills',
      'languages',
      'contactInfo',
    ].join(',');

    const response = await fetch(`${this.baseUrl}/people/~:(${fields})`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn profile');
    }

    return response.json();
  }

  /**
   * Import LinkedIn profile data to our profile format
   */
  async importProfile(accessToken: string): Promise<{
    personalInfo: Partial<PersonalInfo>;
    businessData?: Partial<BusinessOwnerProfile>;
    investorData?: Partial<InvestorProfile>;
  }> {
    const linkedinProfile = await this.getProfile(accessToken);

    // Map LinkedIn data to our PersonalInfo format
    const personalInfo: Partial<PersonalInfo> = {
      firstName: linkedinProfile.firstName,
      lastName: linkedinProfile.lastName,
      professionalTitle: linkedinProfile.headline,
      bio: linkedinProfile.summary,
      industry: linkedinProfile.industry,
      avatarUrl: linkedinProfile.profilePicture?.displayImage,
      city: linkedinProfile.location?.name,
      country: linkedinProfile.location?.country || 'Netherlands',
      email: linkedinProfile.contactInfo?.emailAddress,
      phone: linkedinProfile.contactInfo?.phoneNumbers?.[0]?.number,
    };

    // Extract company information from current position
    const currentPosition = linkedinProfile.positions?.find(pos => pos.isCurrent);
    if (currentPosition) {
      personalInfo.company = currentPosition.companyName;
      personalInfo.professionalTitle = currentPosition.title;
    }

    // Create professional summary from LinkedIn summary and positions
    if (linkedinProfile.summary || linkedinProfile.positions) {
      personalInfo.professionalSummary = this.createProfessionalSummary(
        linkedinProfile.summary,
        linkedinProfile.positions || []
      );
    }

    // Determine if this is a business owner or investor based on profile data
    const isBusinessOwner = this.isBusinessOwnerProfile(linkedinProfile);
    const isInvestor = this.isInvestorProfile(linkedinProfile);

    let businessData: Partial<BusinessOwnerProfile> | undefined;
    let investorData: Partial<InvestorProfile> | undefined;

    if (isBusinessOwner) {
      businessData = this.mapToBusinessOwnerProfile(linkedinProfile);
    }

    if (isInvestor) {
      investorData = this.mapToInvestorProfile(linkedinProfile);
    }

    return {
      personalInfo,
      businessData,
      investorData,
    };
  }

  /**
   * Check if profile indicates business ownership
   */
  private isBusinessOwnerProfile(profile: LinkedInProfile): boolean {
    const businessOwnerKeywords = [
      'founder',
      'ceo',
      'owner',
      'entrepreneur',
      'startup',
      'co-founder',
      'managing director',
      'president',
      'director',
      'executive',
    ];

    const headline = profile.headline?.toLowerCase() || '';
    const summary = profile.summary?.toLowerCase() || '';
    const positions = profile.positions?.map(pos => pos.title.toLowerCase()).join(' ') || '';

    const text = `${headline} ${summary} ${positions}`;
    return businessOwnerKeywords.some(keyword => text.includes(keyword));
  }

  /**
   * Check if profile indicates investment activity
   */
  private isInvestorProfile(profile: LinkedInProfile): boolean {
    const investorKeywords = [
      'investor',
      'investment',
      'venture capital',
      'private equity',
      'angel',
      'portfolio',
      'fund',
      'capital',
      'acquisition',
      'merger',
      'm&a',
    ];

    const headline = profile.headline?.toLowerCase() || '';
    const summary = profile.summary?.toLowerCase() || '';
    const positions = profile.positions?.map(pos => pos.title.toLowerCase()).join(' ') || '';

    const text = `${headline} ${summary} ${positions}`;
    return investorKeywords.some(keyword => text.includes(keyword));
  }

  /**
   * Map LinkedIn profile to BusinessOwnerProfile
   */
  private mapToBusinessOwnerProfile(profile: LinkedInProfile): Partial<BusinessOwnerProfile> {
    const currentPosition = profile.positions?.find(pos => pos.isCurrent);
    const previousPositions = profile.positions?.filter(pos => !pos.isCurrent) || [];

    return {
      businessName: currentPosition?.companyName || '',
      currentRole: currentPosition?.title || '',
      industry: profile.industry || '',
      yearsInBusiness: this.calculateYearsInBusiness(profile.positions || []),
      yearsInIndustry: this.calculateYearsInIndustry(profile.positions || [], profile.industry),
      industryExpertise: this.extractIndustryExpertise(profile),
      professionalCertifications: this.mapEducationsToCertifications(profile.educations || []),
    };
  }

  /**
   * Map LinkedIn profile to InvestorProfile
   */
  private mapToInvestorProfile(profile: LinkedInProfile): Partial<InvestorProfile> {
    return {
      investmentExperience: this.calculateInvestmentExperience(profile.positions || []),
      professionalCredentials: this.mapEducationsToCredentials(profile.educations || []),
      investmentFocus: this.extractIndustryFocus(profile),
    };
  }

  /**
   * Create professional summary from LinkedIn data
   */
  private createProfessionalSummary(summary?: string, positions: LinkedInPosition[] = []): string {
    let professionalSummary = summary || '';

    if (positions.length > 0) {
      const currentPosition = positions.find(pos => pos.isCurrent);
      if (currentPosition) {
        professionalSummary += `\n\nCurrent Role: ${currentPosition.title} at ${currentPosition.companyName}`;
        if (currentPosition.description) {
          professionalSummary += `\n\n${currentPosition.description}`;
        }
      }
    }

    return professionalSummary.trim();
  }

  /**
   * Calculate years in business
   */
  private calculateYearsInBusiness(positions: LinkedInPosition[]): number {
    if (positions.length === 0) return 0;

    const earliestPosition = positions.reduce((earliest, current) => {
      const currentStart = current.startDate?.year || 0;
      const earliestStart = earliest.startDate?.year || 0;
      return currentStart < earliestStart ? current : earliest;
    });

    const startYear = earliestPosition.startDate?.year || new Date().getFullYear();
    return new Date().getFullYear() - startYear;
  }

  /**
   * Calculate years in industry
   */
  private calculateYearsInIndustry(positions: LinkedInPosition[], industry?: string): number {
    if (!industry) return 0;

    const industryPositions = positions.filter(
      pos =>
        pos.companyName.toLowerCase().includes(industry.toLowerCase()) ||
        pos.title.toLowerCase().includes(industry.toLowerCase())
    );

    if (industryPositions.length === 0) return 0;

    return this.calculateYearsInBusiness(industryPositions);
  }

  /**
   * Extract industry expertise from profile
   */
  private extractIndustryExpertise(profile: LinkedInProfile): string[] {
    const expertise: string[] = [];

    if (profile.industry) {
      expertise.push(profile.industry);
    }

    // Extract from positions
    const industries = profile.positions?.map(pos => pos.companyName).filter(Boolean) || [];
    expertise.push(...industries);

    // Extract from skills
    const skills = profile.skills?.map(skill => skill.name) || [];
    expertise.push(...skills);

    return [...new Set(expertise)]; // Remove duplicates
  }

  /**
   * Map educations to certifications
   */
  private mapEducationsToCertifications(educations: LinkedInEducation[]): Certification[] {
    return educations.map(edu => ({
      id: `cert-${edu.schoolName}-${edu.endDate?.year || 'unknown'}`,
      name: edu.degreeName || 'Degree',
      issuer: edu.schoolName,
      dateObtained: edu.endDate?.year ? `${edu.endDate.year}-01-01` : '2020-01-01',
    }));
  }

  /**
   * Calculate investment experience
   */
  private calculateInvestmentExperience(positions: LinkedInPosition[]): InvestmentExperience {
    const investmentPositions = positions.filter(
      pos =>
        pos.title.toLowerCase().includes('investor') ||
        pos.title.toLowerCase().includes('investment') ||
        pos.title.toLowerCase().includes('venture') ||
        pos.title.toLowerCase().includes('capital')
    );

    const yearsActive = this.calculateYearsInBusiness(investmentPositions);

    return {
      yearsActive,
      totalDeals: Math.floor(yearsActive * 2), // Estimate based on years
      successfulExits: Math.floor(yearsActive * 1.5),
      averageDealSize: 250000,
      investmentPhilosophy: 'Focus on technology companies with strong growth potential',
      riskTolerance: 'moderate' as const,
    };
  }

  /**
   * Map educations to credentials
   */
  private mapEducationsToCredentials(educations: LinkedInEducation[]): Credential[] {
    return educations.map(edu => ({
      id: `cred-${edu.schoolName}-${edu.endDate?.year || 'unknown'}`,
      type: 'education' as const,
      name: `${edu.degreeName || 'Degree'} from ${edu.schoolName}`,
      issuer: edu.schoolName,
      dateObtained: edu.endDate?.year ? `${edu.endDate.year}-01-01` : '2020-01-01',
    }));
  }

  /**
   * Extract industry focus from profile
   */
  private extractIndustryFocus(profile: LinkedInProfile): InvestmentFocus {
    const industries: string[] = [];
    const businessSizes: string[] = [];
    const businessStages: string[] = [];
    const geographicRegions: string[] = [];
    const businessModels: string[] = [];
    const specializations: string[] = [];

    if (profile.industry) {
      industries.push(profile.industry);
    }

    // Extract from positions
    const positionIndustries = profile.positions?.map(pos => pos.companyName).filter(Boolean) || [];
    industries.push(...positionIndustries);

    // Default values
    businessSizes.push('€100K-€500K', '€500K-€1M');
    businessStages.push('growth', 'expansion');
    geographicRegions.push(profile.location?.country || 'Netherlands');
    businessModels.push('SaaS', 'E-commerce');

    return {
      industries: [...new Set(industries)],
      businessSizes,
      businessStages,
      geographicRegions,
      businessModels,
      specializations: [...new Set(specializations)],
    };
  }

  /**
   * Generate random state for OAuth
   */
  private generateState(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export const linkedinService = new LinkedInService();
export default linkedinService;
