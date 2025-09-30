// 👤 Profile Card Service Types
// Location: src/features/phase1/profile/profile-card-service/types/ProfileCardTypes.ts
// Purpose: Type definitions for profile card creation

export interface ProfileCard {
  // Personal Information
  fullName: string;
  location: string;
  timezone?: string;
  profileImage?: string; // URL to uploaded image or base64

  // About Me
  bio: string;

  // Work & Education
  jobTitle?: string;
  company?: string;
  industry?: string;
  education?: string;
  keyAchievements?: string;

  // Business Metrics
  ownedBusinesses: number;
  exits: number;
  businessNotes?: string;

  // Platform Metadata
  yearsOnPlatform: number;
  status: 'draft' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileCardStepProps {
  data: Partial<ProfileCard>;
  onDataChange: (stepData: Partial<ProfileCard>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
}

export interface ProfileCardServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (card: ProfileCard) => void;
  initialData?: ProfileCard;
  isEditing?: boolean;
}
