/**
 * ⚙️ Preferences Section
 *
 * Simple preferences management for language and timezone settings
 *
 * @author Senior CTO
 * @version 1.0.0
 */

import { Button } from '@/shared/components/buttons';
import { CustomDropdown } from '@/shared/components/forms';
import React, { useState } from 'react';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface PreferencesSectionProps {
  className?: string;
}

// =============================================================================
// PREFERENCES SECTION COMPONENT
// =============================================================================

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({ className = '' }) => {
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Europe/Amsterdam');

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleSavePreferences = () => {
    // TODO: Implement preferences save logic
    // Preferences save logic will be implemented here
    // Current values: { language, timezone }
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className={`max-w-4xl mx-auto p-8 ${className}`}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Preferences</h1>
        <p className="text-gray-600">Customize your language and timezone settings</p>
      </div>

      {/* Language and Timezone Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomDropdown
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[
              { value: 'en', label: 'English' },
              { value: 'nl', label: 'Nederlands' },
              { value: 'de', label: 'Deutsch' },
              { value: 'fr', label: 'Français' },
            ]}
            placeholder="Select language"
            className="w-full"
          />

          <CustomDropdown
            label="Timezone"
            value={timezone}
            onChange={setTimezone}
            options={[
              // GMT-12 to GMT-11 (Pacific)
              { value: 'Pacific/Baker_Island', label: 'Baker Island (GMT-12)' },
              { value: 'Pacific/Midway', label: 'Midway Island (GMT-11)' },

              // GMT-10 to GMT-9 (Hawaii/Alaska)
              { value: 'Pacific/Honolulu', label: 'Honolulu (GMT-10)' },
              { value: 'Pacific/Gambier', label: 'Gambier Islands (GMT-9)' },
              { value: 'America/Anchorage', label: 'Anchorage (GMT-9)' },

              // GMT-8 to GMT-7 (Pacific/Mountain)
              { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-8)' },
              { value: 'America/Vancouver', label: 'Vancouver (GMT-8)' },
              { value: 'America/Denver', label: 'Denver (GMT-7)' },
              { value: 'America/Phoenix', label: 'Phoenix (GMT-7)' },

              // GMT-6 to GMT-5 (Central/Eastern)
              { value: 'America/Chicago', label: 'Chicago (GMT-6)' },
              { value: 'America/Mexico_City', label: 'Mexico City (GMT-6)' },
              { value: 'America/New_York', label: 'New York (GMT-5)' },
              { value: 'America/Toronto', label: 'Toronto (GMT-5)' },

              // GMT-4 to GMT-3 (Atlantic/South America)
              { value: 'America/Caracas', label: 'Caracas (GMT-4)' },
              { value: 'America/Santiago', label: 'Santiago (GMT-3)' },
              { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
              { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },

              // GMT-2 to GMT-1 (Mid-Atlantic)
              { value: 'Atlantic/South_Georgia', label: 'South Georgia (GMT-2)' },
              { value: 'Atlantic/Azores', label: 'Azores (GMT-1)' },

              // GMT+0 (Greenwich)
              { value: 'Europe/London', label: 'London (GMT+0)' },
              { value: 'Europe/Dublin', label: 'Dublin (GMT+0)' },
              { value: 'Africa/Casablanca', label: 'Casablanca (GMT+0)' },

              // GMT+1 (Central European)
              { value: 'Europe/Amsterdam', label: 'Amsterdam (GMT+1)' },
              { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
              { value: 'Europe/Berlin', label: 'Berlin (GMT+1)' },
              { value: 'Europe/Rome', label: 'Rome (GMT+1)' },
              { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
              { value: 'Africa/Lagos', label: 'Lagos (GMT+1)' },

              // GMT+2 (Eastern European)
              { value: 'Europe/Athens', label: 'Athens (GMT+2)' },
              { value: 'Europe/Helsinki', label: 'Helsinki (GMT+2)' },
              { value: 'Europe/Kiev', label: 'Kiev (GMT+2)' },
              { value: 'Africa/Cairo', label: 'Cairo (GMT+2)' },
              { value: 'Africa/Johannesburg', label: 'Johannesburg (GMT+2)' },

              // GMT+3 (Moscow/Middle East)
              { value: 'Europe/Moscow', label: 'Moscow (GMT+3)' },
              { value: 'Asia/Dubai', label: 'Dubai (GMT+4)' },
              { value: 'Asia/Tehran', label: 'Tehran (GMT+3:30)' },
              { value: 'Asia/Kabul', label: 'Kabul (GMT+4:30)' },

              // GMT+5 to GMT+6 (Central Asia)
              { value: 'Asia/Karachi', label: 'Karachi (GMT+5)' },
              { value: 'Asia/Kolkata', label: 'Kolkata (GMT+5:30)' },
              { value: 'Asia/Dhaka', label: 'Dhaka (GMT+6)' },
              { value: 'Asia/Almaty', label: 'Almaty (GMT+6)' },

              // GMT+7 to GMT+8 (Southeast Asia)
              { value: 'Asia/Bangkok', label: 'Bangkok (GMT+7)' },
              { value: 'Asia/Jakarta', label: 'Jakarta (GMT+7)' },
              { value: 'Asia/Shanghai', label: 'Shanghai (GMT+8)' },
              { value: 'Asia/Hong_Kong', label: 'Hong Kong (GMT+8)' },
              { value: 'Asia/Singapore', label: 'Singapore (GMT+8)' },
              { value: 'Asia/Manila', label: 'Manila (GMT+8)' },
              { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },

              // GMT+9 to GMT+10 (East Asia/Australia)
              { value: 'Asia/Seoul', label: 'Seoul (GMT+9)' },
              { value: 'Australia/Sydney', label: 'Sydney (GMT+10)' },
              { value: 'Australia/Melbourne', label: 'Melbourne (GMT+10)' },
              { value: 'Pacific/Port_Moresby', label: 'Port Moresby (GMT+10)' },

              // GMT+11 to GMT+12 (Pacific)
              { value: 'Pacific/Norfolk', label: 'Norfolk Island (GMT+11)' },
              { value: 'Pacific/Auckland', label: 'Auckland (GMT+12)' },
              { value: 'Pacific/Fiji', label: 'Fiji (GMT+12)' },
              { value: 'Pacific/Tongatapu', label: 'Tongatapu (GMT+13)' },
            ]}
            placeholder="Select timezone"
            className="w-full"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSavePreferences}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSection;
