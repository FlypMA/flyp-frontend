// 👤 Profile Card Service Modal
// Location: src/features/phase1/profile/profile-card-service/components/ProfileCardServiceModal.tsx
// Purpose: Main modal for 3-step profile card creation

import { SecondaryButton } from '@/shared/components/buttons';
import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfoStep from '../steps/BasicInfoStep';
import ProfessionalBackgroundStep from '../steps/ProfessionalBackgroundStep';
import ReviewProfileStep from '../steps/ReviewProfileStep';
import { ProfileCard, ProfileCardServiceModalProps } from '../types/ProfileCardTypes';

const ProfileCardServiceModal: React.FC<ProfileCardServiceModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialData,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileData, setProfileData] = useState<Partial<ProfileCard>>(initialData || {});

  const totalSteps = 3;

  // Step configuration
  const stepConfig = [
    {
      id: 1,
      title: 'Basic Info',
      icon: '👤',
    },
    {
      id: 2,
      title: 'Background',
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
    if (stepId <= currentStep) {
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
        return;
      }

      const completedProfile: ProfileCard = {
        fullName: profileData.fullName,
        location: profileData.location,
        profileImage: profileData.profileImage || '',
        bio: profileData.bio,
        ownedBusinesses: profileData.ownedBusinesses,
        exits: profileData.exits || 0,
        yearsOnPlatform: profileData.yearsOnPlatform || 0,
        status: 'complete',
        createdAt: isEditing && initialData?.createdAt ? initialData.createdAt : new Date(),
        updatedAt: new Date(),
      };

      console.log(
        isEditing ? '✏️ Updating profile card:' : '✅ Creating profile card:',
        completedProfile
      );

      if (onComplete) {
        onComplete(completedProfile);
      }

      localStorage.setItem('profileCard', JSON.stringify(completedProfile));
      localStorage.setItem('hasProfileCard', 'true');

      console.log('💾 Saved to localStorage');
      console.log('🔄 Navigating to /my-business');

      onClose();
      navigate('/my-business');
    } catch (error) {
      console.error('❌ Error creating profile card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: // Basic Info
        return !!(profileData.fullName && profileData.location);
      case 2: // Professional Background
        return !!(profileData.bio && typeof profileData.ownedBusinesses === 'number');
      case 3: // Review
        return true;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
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
        return <BasicInfoStep {...stepProps} />;
      case 2:
        return <ProfessionalBackgroundStep {...stepProps} />;
      case 3:
        return <ReviewProfileStep {...stepProps} />;
      default:
        return null;
    }
  };

  const currentStepConfig = stepConfig[currentStep - 1];

  return (
    <FullscreenModal isOpen={isOpen} onClose={onClose} showProgress={false} showHeader={false}>
      <div className="h-full flex">
        {/* Left Sidebar - Step Navigation */}
        <div className="w-40 bg-black flex-shrink-0 flex flex-col items-center py-8 space-y-8">
          {stepConfig.map(step => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isClickable = step.id <= currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center space-y-2">
                {/* Progress Line (above icon) */}
                <div
                  className={`w-12 h-0.5 ${isCompleted || isActive ? 'bg-white' : 'bg-gray-600'}`}
                />

                {/* Icon Button */}
                <button
                  onClick={() => isClickable && handleStepClick(step.id)}
                  disabled={!isClickable}
                  className={`
                    w-14 h-14 rounded-lg flex items-center justify-center text-2xl
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-white text-black ring-2 ring-white ring-offset-2 ring-offset-black'
                        : isCompleted
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-800 text-gray-500'
                    }
                    ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                  aria-label={step.title}
                >
                  {step.icon}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          {/* Step Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Step Title and Progress */}
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900">{currentStepConfig.title}</h2>
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
          <div className="flex-1 overflow-y-auto min-h-0 bg-gray-50 p-8">{renderCurrentStep()}</div>

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
                disabled={!canProceed() || isSubmitting}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[165px] h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? isEditing
                    ? 'Updating...'
                    : 'Saving...'
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
