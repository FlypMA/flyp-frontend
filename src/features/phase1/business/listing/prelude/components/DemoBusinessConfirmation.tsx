import React from 'react';
import BusinessConfirmationPage from './BusinessConfirmationPage';

const DemoBusinessConfirmation: React.FC = () => {
  const handleBack = () => {
    console.log('Back button clicked');
    alert('Back button clicked - this would navigate back to business type selection.');
  };

  const handleGetStarted = () => {
    console.log('Get Started button clicked');
    alert(
      'Get Started clicked - this would continue to the next step in the listing creation flow.'
    );
  };

  return (
    <BusinessConfirmationPage
      selectedBusinessType="catering"
      onBack={handleBack}
      onGetStarted={handleGetStarted}
    />
  );
};

export default DemoBusinessConfirmation;
