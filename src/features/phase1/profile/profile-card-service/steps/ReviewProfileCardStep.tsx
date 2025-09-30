/**
 * ✅ Review Profile Card Step
 * Step 3 of Profile Card Creation
 * Comprehensive review of all profile data
 */

import { Avatar } from '@heroui/react';
import { Briefcase, Building2, GraduationCap, MapPin, Trophy } from 'lucide-react';
import React from 'react';
import { ProfileCardStepProps } from '../types/ProfileCardTypes';

export const ReviewProfileCardStep: React.FC<ProfileCardStepProps> = ({ data }) => {
  const formData = {
    fullName: data.fullName || '',
    location: data.location || '',
    timezone: data.timezone || '',
    profileImage: data.profileImage || '',
    bio: data.bio || '',
    jobTitle: data.jobTitle || '',
    company: data.company || '',
    industry: data.industry || '',
    education: data.education || '',
    keyAchievements: data.keyAchievements || '',
    ownedBusinesses: data.ownedBusinesses || 0,
    exits: data.exits || 0,
    businessNotes: data.businessNotes || '',
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Profile</h2>
          <p className="text-gray-600">
            Review all your information before completing your profile card.
          </p>
        </div>

        {/* Profile Card Preview */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8 shadow-lg">
          {/* Header with Avatar */}
          <div className="flex items-start space-x-6 mb-8">
            <Avatar
              src={formData.profileImage || undefined}
              name={formData.fullName}
              size="lg"
              className="w-32 h-32"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.fullName}</h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{formData.location}</span>
                {formData.timezone && <span className="ml-4 text-sm">({formData.timezone})</span>}
              </div>
              {formData.jobTitle && (
                <div className="flex items-center text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="font-medium">{formData.jobTitle}</span>
                  {formData.company && <span className="ml-2">at {formData.company}</span>}
                </div>
              )}
              {formData.industry && (
                <p className="text-sm text-gray-500">Industry: {formData.industry}</p>
              )}
            </div>
          </div>

          {/* About Me */}
          {formData.bio && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{formData.bio}</p>
            </div>
          )}

          {/* Business Metrics */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Portfolio</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Owned Businesses</span>
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formData.ownedBusinesses}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Successful Exits</span>
                  <Trophy className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formData.exits}</p>
              </div>
            </div>
            {formData.businessNotes && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Portfolio Notes:</p>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {formData.businessNotes}
                </p>
              </div>
            )}
          </div>

          {/* Education */}
          {formData.education && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {formData.education}
              </p>
            </div>
          )}

          {/* Key Achievements */}
          {formData.keyAchievements && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Key Achievements
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {formData.keyAchievements}
              </p>
            </div>
          )}
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-sm text-primary-800">
            ✅ Your profile looks great! Click "Complete" to save your profile card and return to
            your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewProfileCardStep;
