/**
 * 🎨 Welcome Panel Component
 * Location: src/shared/components/modals/domains/authentication/panels/WelcomePanel.tsx
 * Purpose: Visual welcome panel for TwoPanelModal
 */

import React from 'react';
import { AuthenticationType } from '../AuthenticationModal';

interface WelcomePanelProps {
  type: AuthenticationType;
  onSwitchType?: (type: AuthenticationType) => void;
}

export const WelcomePanel: React.FC<WelcomePanelProps> = ({ type, onSwitchType }) => {
  const content = {
    login: {
      title: 'Welcome back to flyp',
      subtitle: 'Continue your business journey',
      features: [
        'Access your business dashboard',
        'Manage your listings',
        'Connect with qualified buyers',
        'Track your business metrics',
      ],
    },
    signup: {
      title: 'Start your flyp journey',
      subtitle: 'Join thousands of successful business owners',
      features: [
        'List your business for sale',
        'Get professional valuations',
        'Connect with serious buyers',
        'Secure transaction process',
      ],
    },
  };

  const currentContent = content[type];

  return (
    <div className="h-full flex flex-col justify-center items-center text-white p-12">
      <div className="max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">f</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{currentContent.title}</h1>
          <p className="text-lg text-white text-opacity-90">{currentContent.subtitle}</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {currentContent.features.map((feature, index) => (
            <div key={index} className="flex items-center text-left">
              <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full mr-3 flex-shrink-0" />
              <span className="text-white text-opacity-90">{feature}</span>
            </div>
          ))}
        </div>

        {/* Switch Type Button */}
        {onSwitchType && (
          <div className="text-center">
            <p className="text-white text-opacity-75 text-sm mb-3">
              {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => onSwitchType(type === 'login' ? 'signup' : 'login')}
              className="text-white font-medium underline hover:no-underline transition-all"
            >
              {type === 'login' ? 'Create an account' : 'Sign in instead'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePanel;
