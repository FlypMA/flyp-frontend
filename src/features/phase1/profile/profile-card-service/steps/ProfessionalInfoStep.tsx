/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 💼 Professional Information Step
 * Step 2 of Profile Card Creation
 * About Me, Work & Education, and Business Metrics
 */

import {
  CustomInputField,
  CustomNumberInputField,
  CustomTextarea,
} from '@/shared/components/forms';
import React from 'react';
import { ProfileCardStepProps } from '../types/ProfileCardTypes';

export const ProfessionalInfoStep: React.FC<ProfileCardStepProps> = ({
  data,
  onDataChange,
  onNext,
}) => {
  const formData = {
    bio: data.bio || '',
    jobTitle: data.jobTitle || '',
    company: data.company || '',
    industry: data.industry || '',
    education: data.education || '',
    keyAchievements: data.keyAchievements || '',
    ownedBusinesses: data.ownedBusinesses || 1,
    exits: data.exits || 0,
    businessNotes: data.businessNotes || '',
  };

  const handleInputChange = (field: string, value: string | number) => {
    onDataChange({ ...data, [field]: value });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* About Me Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About Me</h2>
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Tell others about yourself, your background, and what makes you trustworthy in
              business.
            </p>
            <CustomTextarea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={e => handleInputChange('bio', e.target.value)}
              onBlur={() => {}}
              placeholder="Share your story, experience, and what drives you in business..."
              rows={5}
              required
            />
          </div>
        </div>

        <hr className="shrink-0 bg-divider border-none w-full h-divider my-8" role="separator" />

        {/* Work & Education Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Work & Education</h2>
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Add your work and education information manually or use the LinkedIn import above.
            </p>

            <div className="space-y-6">
              {/* Job Title */}
              <CustomInputField
                label="What do you do for work?"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={e => handleInputChange('jobTitle', e.target.value)}
                placeholder=" "
              />

              {/* Company */}
              <CustomInputField
                label="Company"
                name="company"
                value={formData.company}
                onChange={e => handleInputChange('company', e.target.value)}
                placeholder=" "
              />

              {/* Industry */}
              <CustomInputField
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={e => handleInputChange('industry', e.target.value)}
                placeholder=" "
              />

              {/* Education */}
              <CustomTextarea
                label="Education"
                name="education"
                value={formData.education}
                onChange={e => handleInputChange('education', e.target.value)}
                onBlur={() => {}}
                placeholder="Your educational background (university, degree, etc.)"
                rows={5}
              />

              {/* Key Achievements */}
              <CustomTextarea
                label="Key Achievements"
                name="keyAchievements"
                value={formData.keyAchievements}
                onChange={e => handleInputChange('keyAchievements', e.target.value)}
                onBlur={() => {}}
                placeholder="Notable accomplishments in your career"
                rows={5}
              />
            </div>
          </div>
        </div>

        <hr className="shrink-0 bg-divider border-none w-full h-divider my-8" role="separator" />

        {/* My Businesses Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Businesses</h2>
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Track your business portfolio. These metrics are automatically tracked by the platform
              but can be edited here.
            </p>

            <div className="space-y-6">
              {/* Owned Businesses */}
              <CustomNumberInputField
                label="Owned Businesses"
                name="ownedBusinesses"
                value={formData.ownedBusinesses}
                onChange={e => handleInputChange('ownedBusinesses', parseInt(e.target.value) || 0)}
                onBlur={() => {}}
                placeholder=" "
                min={0}
                required
              />

              {/* Exits */}
              <CustomNumberInputField
                label="Exits"
                name="exits"
                value={formData.exits}
                onChange={e => handleInputChange('exits', parseInt(e.target.value) || 0)}
                onBlur={() => {}}
                placeholder=" "
                min={0}
                required
              />

              {/* Business Portfolio Notes */}
              <CustomTextarea
                label="Business Portfolio Notes"
                name="businessNotes"
                value={formData.businessNotes}
                onChange={e => handleInputChange('businessNotes', e.target.value)}
                onBlur={() => {}}
                placeholder="Additional notes about your business experience and portfolio"
                rows={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoStep;
