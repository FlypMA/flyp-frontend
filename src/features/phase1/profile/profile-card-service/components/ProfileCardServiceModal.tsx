// 👤 Profile Card Service Modal
// Location: src/features/phase1/profile/profile-card-service/components/ProfileCardServiceModal.tsx
// Purpose: Main modal for comprehensive 3-step profile card creation

import { SecondaryButton } from '@/shared/components/buttons';
import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useState } from 'react';
import PersonalInfoStep from '../steps/PersonalInfoStep';
import ProfessionalInfoStep from '../steps/ProfessionalInfoStep';
import ReviewProfileCardStep from '../steps/ReviewProfileCardStep';
import { ProfileCard, ProfileCardServiceModalProps } from '../types/ProfileCardTypes';

const ProfileCardServiceModal: React.FC<ProfileCardServiceModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialData,
  isEditing = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileData, setProfileData] = useState<Partial<ProfileCard>>(
    initialData || {
      ownedBusinesses: 1, // Default value for required field
      exits: 0, // Default value
    }
  );

  const totalSteps = 3;

  // Step configuration
  const stepConfig = [
    {
      id: 1,
      title: 'Personal Info',
      icon: '👤',
    },
    {
      id: 2,
      title: 'Professional',
      icon: '💼',
    },
    {
      id: 3,
      title: 'Review',
      icon: '✅',
    },
  ];

  const handleDataChange = (stepData: Partial<ProfileCard>) => {
    setProfileData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!profileData.fullName || !profileData.location) {
        alert('Please fill in all required fields');
        return;
      }
    } else if (currentStep === 2) {
      if (!profileData.bio) {
        alert('Please write a bio about yourself');
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalSteps) {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Allow clicking on previous steps
    if (stepId < currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validation
      console.log('🔍 Profile Card Data:', profileData);

      const isValid =
        profileData.fullName &&
        profileData.location &&
        profileData.bio &&
        typeof profileData.ownedBusinesses === 'number';

      if (!isValid) {
        console.error('❌ Validation failed. Missing fields:', {
          fullName: profileData.fullName ? '✅' : '❌',
          location: profileData.location ? '✅' : '❌',
          bio: profileData.bio ? '✅' : '❌',
          ownedBusinesses: typeof profileData.ownedBusinesses === 'number' ? '✅' : '❌',
        });
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      const completedProfile: ProfileCard = {
        fullName: profileData.fullName!,
        location: profileData.location!,
        timezone: profileData.timezone || 'Europe/Amsterdam',
        profileImage: profileData.profileImage || '',
        bio: profileData.bio!,
        jobTitle: profileData.jobTitle || '',
        company: profileData.company || '',
        industry: profileData.industry || '',
        education: profileData.education || '',
        keyAchievements: profileData.keyAchievements || '',
        ownedBusinesses: profileData.ownedBusinesses!,
        exits: profileData.exits || 0,
        businessNotes: profileData.businessNotes || '',
        yearsOnPlatform: profileData.yearsOnPlatform || 5,
        status: 'complete',
        createdAt: (initialData && isEditing && initialData.createdAt) || new Date(),
        updatedAt: new Date(),
      };

      console.log(`${isEditing ? '🔄 Updating' : '✅ Creating'} profile card:`, completedProfile);

      // Save to localStorage
      localStorage.setItem('profileCard', JSON.stringify(completedProfile));
      localStorage.setItem('hasProfileCard', 'true');
      console.log('💾 Profile card saved to localStorage');

      setIsSubmitting(false);

      if (onComplete) {
        onComplete(completedProfile);
      }

      onClose();
    } catch (error) {
      console.error('❌ Error completing profile card:', error);
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const stepProps = {
      data: profileData,
      onDataChange: handleDataChange,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === totalSteps,
      isLoading: isSubmitting,
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <ProfessionalInfoStep {...stepProps} />;
      case 3:
        return <ReviewProfileCardStep {...stepProps} />;
      default:
        return <PersonalInfoStep {...stepProps} />;
    }
  };

  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Your Profile"
      showHeader={false}
    >
      <div className="flex h-full min-h-0 bg-black p-4">
        {/* Sidebar Navigation - Fixed Width */}
        <div className="flex-shrink-0 w-[160px] bg-black h-full flex flex-col items-center justify-center space-y-8">
          {stepConfig.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Progress Line Above */}
              {index > 0 && (
                <div
                  className={`w-0.5 h-12 -mb-4 ${
                    currentStep > step.id ? 'bg-white' : 'bg-gray-600'
                  }`}
                />
              )}

              {/* Step Icon */}
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={step.id > currentStep}
                className={`
                  w-16 h-16 rounded-lg flex items-center justify-center text-2xl transition-all
                  ${
                    currentStep === step.id
                      ? 'bg-gray-800 ring-2 ring-white'
                      : step.id < currentStep
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-gray-900 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                {step.icon}
              </button>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-h-0 ml-4 bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Step Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Step Title and Progress */}
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900">
                  {stepConfig[currentStep - 1].title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>

              {/* Save and Exit Button */}
              <SecondaryButton onClick={onClose} size="sm" aria-label="Save and exit">
                Save and exit
              </SecondaryButton>
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white">{renderStepContent()}</div>

          {/* Navigation Footer - Sticky */}
          <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
              <SecondaryButton
                onClick={handlePrevious}
                disabled={currentStep === 1}
                size="sm"
                aria-label="Back"
              >
                Back
              </SecondaryButton>
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[165px] h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? isEditing
                    ? 'Updating...'
                    : 'Completing...'
                  : currentStep === totalSteps
                    ? isEditing
                      ? 'Update'
                      : 'Complete'
                    : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </FullscreenModal>
  );
};

export default ProfileCardServiceModal;
