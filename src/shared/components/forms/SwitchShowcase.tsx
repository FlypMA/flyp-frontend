import React, { useState } from 'react';

/**
 * Switch Showcase Component
 *
 * Demonstrates the beautiful, redesigned switch components with crystal-clear states.
 * Shows professional design with obvious selected/unselected indicators.
 */
const SwitchShowcase: React.FC = () => {
  const [anonymousListing, setAnonymousListing] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [featuredListing, setFeaturedListing] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const switches = [
    {
      id: 'anonymous',
      title: 'Anonymous Listing',
      description: 'Hide your business name from public view',
      value: anonymousListing,
      setValue: setAnonymousListing,
      disabled: false,
    },
    {
      id: 'notifications',
      title: 'Email Notifications',
      description: 'Receive updates about your listing and inquiries',
      value: emailNotifications,
      setValue: setEmailNotifications,
      disabled: false,
    },
    {
      id: 'featured',
      title: 'Featured Listing',
      description: 'Highlight your listing at the top of search results',
      value: featuredListing,
      setValue: setFeaturedListing,
      disabled: false,
    },
    {
      id: 'autorenew',
      title: 'Auto-Renewal',
      description: 'Automatically renew your listing when it expires',
      value: autoRenew,
      setValue: setAutoRenew,
      disabled: false,
    },
    {
      id: 'marketing',
      title: 'Marketing Communications',
      description: 'Receive tips and insights about selling your business',
      value: marketingEmails,
      setValue: setMarketingEmails,
      disabled: true, // Example of disabled state
    },
  ];

  const SwitchComponent = ({
    id,
    title,
    description,
    value,
    setValue,
    disabled = false,
  }: {
    id: string;
    title: string;
    description: string;
    value: boolean;
    setValue: (value: boolean) => void;
    disabled?: boolean;
  }) => (
    <div
      className={`switch-container ${value ? 'switch-active' : ''} ${disabled ? 'switch-disabled' : ''}`}
      onClick={() => !disabled && setValue(!value)}
    >
      <div className="switch-content">
        <h4 className="switch-title">{title}</h4>
        <p className="switch-description">{description}</p>
      </div>

      <label className="professional-switch">
        <input
          type="checkbox"
          checked={value}
          onChange={e => !disabled && setValue(e.target.checked)}
          disabled={disabled}
          aria-label={`Toggle ${title}`}
        />
        <span className="switch-slider"></span>
      </label>

      <div className="switch-labels">
        <span className={`switch-label ${!value ? 'active' : ''}`}>OFF</span>
        <span className={`switch-label ${value ? 'active' : ''}`}>ON</span>
      </div>
    </div>
  );

  return (
    <div className="professional-form max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Beautiful Switch Components</h2>
        <p className="text-lg text-slate-600">
          Crystal-clear switch states with professional styling and obvious interactive feedback
        </p>
      </div>

      <div className="space-y-6">
        {switches.map(switchConfig => (
          <SwitchComponent key={switchConfig.id} {...switchConfig} />
        ))}
      </div>

      {/* State Overview */}
      <div className="mt-12 bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Current Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {switches.map(switchConfig => (
            <div
              key={switchConfig.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100"
            >
              <span className="font-medium text-slate-700">{switchConfig.title}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  switchConfig.value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {switchConfig.disabled ? 'Disabled' : switchConfig.value ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">✨ Switch Design Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Crystal Clear States</p>
              <p className="text-sm text-slate-600">Obvious ON/OFF indicators with checkmarks</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Container Highlighting</p>
              <p className="text-sm text-slate-600">Entire container changes when active</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Smooth Animations</p>
              <p className="text-sm text-slate-600">Bouncy toggle with cubic-bezier easing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Gradient Effects</p>
              <p className="text-sm text-slate-600">Beautiful gradients for active states</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Accessibility First</p>
              <p className="text-sm text-slate-600">
                Proper focus states and screen reader support
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Mobile Optimized</p>
              <p className="text-sm text-slate-600">Touch-friendly with proper sizing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">💻 Usage Example</h3>
        <div className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            {`<div className="switch-container switch-active">
  <div className="switch-content">
    <h4 className="switch-title">Anonymous Listing</h4>
    <p className="switch-description">Hide your business name from public view</p>
  </div>
  
  <label className="professional-switch">
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => setValue(e.target.checked)}
      aria-label="Toggle Anonymous Listing"
    />
    <span className="switch-slider"></span>
  </label>
  
  <div className="switch-labels">
    <span className="switch-label">OFF</span>
    <span className="switch-label active">ON</span>
  </div>
</div>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SwitchShowcase;
