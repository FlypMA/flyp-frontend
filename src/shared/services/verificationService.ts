// Note: Import API client when available
// import apiConfig from '../api/apiConfig';

export interface VerificationDocument {
  id: string;
  type:
    | 'business_registration'
    | 'tax_certificate'
    | 'ownership_proof'
    | 'financial_statements'
    | 'other';
  name: string;
  size: number;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'requires_resubmission';
  reviewNotes?: string;
  url?: string;
}

export interface VerificationSubmission {
  organizationId: string;
  documents: VerificationDocument[];
  submissionDate: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewDate?: string;
  reviewNotes?: string;
}

export interface DocumentUploadResponse {
  success: boolean;
  documentId: string;
  uploadUrl?: string;
  error?: string;
}

class VerificationService {
  // API client will be initialized when available
  // private apiClient = apiConfig;

  /**
   * Upload a verification document
   */
  async uploadDocument(
    file: File,
    documentType: VerificationDocument['type'],
    organizationId: string
  ): Promise<DocumentUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);
      formData.append('organizationId', organizationId);

      const response = await fetch('/api/verification/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Document upload error:', error);
      return {
        success: false,
        documentId: '',
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Get verification status for an organization
   */
  async getVerificationStatus(organizationId: string): Promise<VerificationSubmission | null> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        organizationId,
        documents: [],
        submissionDate: new Date().toISOString(),
        status: 'draft',
      };
    } catch (error) {
      console.error('Error fetching verification status:', error);
      return null;
    }
  }

  /**
   * Submit documents for verification
   */
  async submitForVerification(
    organizationId: string
  ): Promise<{ success: boolean; submissionId?: string; error?: string }> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        submissionId: `submission_${Date.now()}`,
      };
    } catch (error) {
      console.error('Error submitting for verification:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Submission failed',
      };
    }
  }

  /**
   * Delete a document
   */
  async deleteDocument(documentId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
      };
    }
  }

  /**
   * Get required documents for verification
   */
  getRequiredDocuments(): Array<{
    type: VerificationDocument['type'];
    name: string;
    description: string;
    required: boolean;
    acceptedFormats: string[];
    maxSize: number; // in MB
  }> {
    return [
      {
        type: 'business_registration',
        name: 'Business Registration',
        description: 'Official business registration document or articles of incorporation',
        required: true,
        acceptedFormats: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
        maxSize: 10,
      },
      {
        type: 'tax_certificate',
        name: 'Tax Certificate',
        description: 'Recent tax certificate or VAT registration document',
        required: true,
        acceptedFormats: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
        maxSize: 10,
      },
      {
        type: 'ownership_proof',
        name: 'Proof of Ownership',
        description: 'Document proving your ownership or authorization to sell the business',
        required: true,
        acceptedFormats: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
        maxSize: 10,
      },
      {
        type: 'financial_statements',
        name: 'Financial Statements',
        description:
          'Recent financial statements or profit & loss summary (optional but recommended)',
        required: false,
        acceptedFormats: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
        maxSize: 25,
      },
    ];
  }

  /**
   * Validate file before upload
   */
  validateFile(
    file: File,
    documentType: VerificationDocument['type']
  ): { valid: boolean; error?: string } {
    const requirements = this.getRequiredDocuments().find(req => req.type === documentType);

    if (!requirements) {
      return { valid: false, error: 'Invalid document type' };
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > requirements.maxSize) {
      return { valid: false, error: `File size must be less than ${requirements.maxSize}MB` };
    }

    // Check file format
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!requirements.acceptedFormats.includes(fileExtension)) {
      return {
        valid: false,
        error: `File format not supported. Accepted formats: ${requirements.acceptedFormats.join(', ')}`,
      };
    }

    return { valid: true };
  }

  private getAuthToken(): string {
    // Get auth token from localStorage or cookies
    return localStorage.getItem('authToken') || '';
  }
}

export default new VerificationService();
