/**
 * ⚙️ Preferences Page
 * 
 * Standalone preferences settings page using the split layout architecture
 * 
 * @author Senior CTO
 * @version 1.0.0
 */

import React from 'react';
import { PreferencesSection } from '../components/sections/PreferencesSection';
import { ProfileSplitLayout } from '../layouts/ProfileSplitLayout';

// =============================================================================
// PREFERENCES PAGE COMPONENT
// =============================================================================

export const PreferencesPage: React.FC = () => {
  return (
    <ProfileSplitLayout showFooter={false} showNavigation={false}>
      <PreferencesSection />
    </ProfileSplitLayout>
  );
};

export default PreferencesPage;


