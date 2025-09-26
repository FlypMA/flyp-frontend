/**
 * 🎓 Professional Background Component
 *
 * Shared professional background section for both business owners and investors
 * Emphasizes common professional experience and achievements
 */

import { Button } from '@/shared/components/buttons';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { Award, Briefcase, GraduationCap, Star, Target, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Profile } from '../../types/profile.types';
import { CommonProfessionalBackground } from '../../types/roleBased.types';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfessionalBackgroundProps {
  profile: Profile;
  isEditing?: boolean;
  onUpdate?: (data: Partial<CommonProfessionalBackground>) => void;
  onFieldUpdate?: (field: string, value: any) => void;
  className?: string;
}

// =============================================================================
// PROFESSIONAL BACKGROUND COMPONENT
// =============================================================================

export const ProfessionalBackground: React.FC<ProfessionalBackgroundProps> = ({
  profile,
  isEditing = false,
  onUpdate,
  onFieldUpdate,
  className = '',
}) => {
  const [localData, setLocalData] = useState<Partial<CommonProfessionalBackground>>({});

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleFieldChange = (field: keyof CommonProfessionalBackground, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onFieldUpdate?.(field, value);
  };

  const handleSave = () => {
    onUpdate?.(localData);
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderCurrentRole = () => {
    const currentRole = profile.personalInfo.professionalTitle || 'Professional';
    const company = profile.personalInfo.company || 'Independent';
    const industry = profile.personalInfo.industry || 'Various';
    const yearsExperience =
      profile.businessOwnerData?.yearsInIndustry ||
      profile.investorData?.investmentExperience?.yearsActive ||
      '5+';

    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentRole}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="font-medium">Company:</span>
                <span>{company}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="font-medium">Industry:</span>
                <span>{industry}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="font-medium">Experience:</span>
                <span>{yearsExperience} years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderIndustryExpertise = () => {
    const expertise =
      profile.businessOwnerData?.industryExpertise ||
      profile.investorData?.investmentFocus?.industries ||
      [];

    if (expertise.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          Industry Expertise
        </h4>
        <div className="flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <Chip
              key={index}
              size="sm"
              variant="flat"
              color="primary"
              className="bg-blue-100 text-blue-800"
            >
              {skill}
            </Chip>
          ))}
        </div>
      </div>
    );
  };

  const renderPreviousVentures = () => {
    const ventures = profile.businessOwnerData?.previousVentures || [];

    if (ventures.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
          Previous Ventures
        </h4>
        <div className="space-y-4">
          {ventures.map(venture => (
            <div key={venture.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{venture.name}</h5>
                  <p className="text-gray-600 text-sm">
                    {venture.role} • {venture.industry}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{venture.duration}</p>
                  {venture.description && (
                    <p className="text-gray-700 text-sm mt-2">{venture.description}</p>
                  )}
                </div>
                <div className="ml-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={venture.outcome === 'Acquired by larger company' ? 'success' : 'default'}
                  >
                    {venture.outcome}
                  </Chip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPreviousDeals = () => {
    const deals = profile.investorData?.previousDeals || [];

    if (deals.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Target className="w-5 h-5 text-green-500 mr-2" />
          Previous Investments
        </h4>
        <div className="space-y-4">
          {deals.map(deal => (
            <div key={deal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{deal.companyName}</h5>
                  <p className="text-gray-600 text-sm">
                    {deal.industry} • {deal.year}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">€{deal.dealSize.toLocaleString()}</p>
                  {deal.description && (
                    <p className="text-gray-700 text-sm mt-2">{deal.description}</p>
                  )}
                </div>
                <div className="ml-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={deal.outcome === 'successful' ? 'success' : 'default'}
                  >
                    {deal.outcome}
                  </Chip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCertifications = () => {
    const certifications =
      profile.businessOwnerData?.professionalCertifications ||
      profile.investorData?.professionalCredentials ||
      [];

    if (certifications.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <GraduationCap className="w-5 h-5 text-purple-500 mr-2" />
          Professional Certifications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map(cert => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900">{cert.name}</h5>
              <p className="text-gray-600 text-sm">{cert.issuer}</p>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(cert.dateObtained).getFullYear()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    const achievements = profile.businessOwnerData?.keyAchievements || [];

    if (achievements.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Award className="w-5 h-5 text-yellow-500 mr-2" />
          Key Achievements
        </h4>
        <div className="space-y-4">
          {achievements.map(achievement => (
            <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Award className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{achievement.title}</h5>
                  <p className="text-gray-700 text-sm mt-1">{achievement.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{new Date(achievement.date).getFullYear()}</span>
                    <Chip size="sm" variant="flat" color="warning">
                      {achievement.impact} impact
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProfessionalNetwork = () => {
    const network = profile.businessOwnerData?.professionalNetwork || '';

    if (!network) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Users className="w-5 h-5 text-blue-500 mr-2" />
          Professional Network
        </h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">{network}</p>
        </div>
      </div>
    );
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <Card className={`border border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Professional Background</h3>
              <p className="text-gray-600 text-sm">Your professional experience and achievements</p>
            </div>
          </div>
          {isEditing && (
            <Button variant="primary" color="primary" size="sm" onPress={handleSave}>
              Save Changes
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-6">
          {/* Current Role */}
          {renderCurrentRole()}

          {/* Industry Expertise */}
          {renderIndustryExpertise()}

          {/* Previous Ventures (Business Owners) */}
          {renderPreviousVentures()}

          {/* Previous Deals (Investors) */}
          {renderPreviousDeals()}

          {/* Certifications */}
          {renderCertifications()}

          {/* Achievements */}
          {renderAchievements()}

          {/* Professional Network */}
          {renderProfessionalNetwork()}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfessionalBackground;
