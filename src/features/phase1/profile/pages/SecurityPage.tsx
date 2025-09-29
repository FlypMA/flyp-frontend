/**
 * 🔒 Security Page
 * 
 * Standalone security settings page using the split layout architecture
 * 
 * @author Senior CTO
 * @version 1.0.0
 */

import React from 'react';
import { SecuritySection } from '../components/sections/SecuritySection';
import { ProfileSplitLayout } from '../layouts/ProfileSplitLayout';

// =============================================================================
// SECURITY PAGE COMPONENT
// =============================================================================

export const SecurityPage: React.FC = () => {
  return (
    <ProfileSplitLayout showFooter={false} showNavigation={false}>
      <SecuritySection />
    </ProfileSplitLayout>
  );
};

export default SecurityPage;


