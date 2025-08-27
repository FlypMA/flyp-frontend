import React from 'react';
import { User } from '../../types/api/users/user';

interface AvatarProps {
  user?: User | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRing?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 'md', showRing = false, className = '' }) => {
  // Get user initials for avatar fallback
  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      const nameParts = name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return name.charAt(0).toUpperCase();
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const userInitials = getUserInitials(user?.name, user?.email);

  // Size configurations
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-sm',
    xl: 'w-12 h-12 text-base',
  };

  const ringClass = showRing ? 'ring-2 ring-white shadow-sm' : '';

  return (
    <div className={`${sizeClasses[size]} ${ringClass} ${className}`}>
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user?.name || 'User'}
          className={`${sizeClasses[size]} object-cover rounded-full ${ringClass}`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ${ringClass}`}
        >
          <span className="text-white font-semibold">{userInitials}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
