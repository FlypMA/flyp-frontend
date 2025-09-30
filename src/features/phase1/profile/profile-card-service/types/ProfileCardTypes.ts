// 👤 Profile Card Service Types
// Location: src/features/phase1/profile/profile-card-service/types/ProfileCardTypes.ts
// Purpose: Type definitions for profile card creation

export interface ProfileCard {
  // Basic Info
  fullName: string;
  location: string;
  profileImage?: string;

  // Professional Background
  bio: string;
  ownedBusinesses: number;
  exits: number;
  yearsOnPlatform: number;

  // Metadata
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
