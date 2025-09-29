/**
 * 👤 Profile Settings Page
 * 
 * Main profile settings page using the split layout architecture
 * Now only shows the About Me section (other sections have dedicated routes)
 * 
 * @author Senior CTO
 * @version 1.0.0
 */

import React from 'react';
import { AboutMeSection } from '../components/sections/AboutMeSection';
import { ProfileSplitLayout } from '../layouts/ProfileSplitLayout';

// =============================================================================
// PROFILE SETTINGS PAGE COMPONENT
// =============================================================================

export const ProfileSettingsPage: React.FC = () => {
  return (
    <ProfileSplitLayout showFooter={false} showNavigation={false}>
      <AboutMeSection />
    </ProfileSplitLayout>
  );
};

export default ProfileSettingsPage;
