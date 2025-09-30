/**
 * 👤 Profile Card Component
 * Location: src/shared/components/business/ProfileCard.tsx
 * Purpose: Display user profile card on dashboard
 */

import { Camera, CircleCheckBig } from 'lucide-react';
import React from 'react';

interface ProfileCardData {
  fullName: string;
  location: string;
  profileImage?: string;
  bio: string;
  ownedBusinesses: number;
  exits: number;
  yearsOnPlatform: number;
}

interface ProfileCardProps {
  profileData?: ProfileCardData;
  onEdit?: () => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData, onEdit, className = '' }) => {
  if (!profileData) {
    return null;
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 ${className}`}
      onClick={onEdit}
    >
      {/* Header with Profile Image and Name */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <div className="relative group">
            {profileData.profileImage ? (
              <img
                src={profileData.profileImage}
                alt={profileData.fullName}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-bold">
                {profileData.fullName[0] || '?'}
              </div>
            )}
            {/* Camera Overlay on Hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          {/* Checkmark Badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
            <CircleCheckBig className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileData.fullName}</h1>
          <p className="text-gray-600">{profileData.location}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Owned businesses</span>
          <span className="font-semibold text-gray-900">{profileData.ownedBusinesses}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Exits</span>
          <span className="font-semibold text-gray-900">{profileData.exits}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Years on UpSwitch</span>
          <span className="font-semibold text-gray-900">{profileData.yearsOnPlatform}</span>
        </div>
      </div>

      {/* Bio */}
      {profileData.bio && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{profileData.bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
