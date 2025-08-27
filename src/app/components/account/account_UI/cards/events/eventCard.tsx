import React from 'react';
// Assuming ActivityType and Event interfaces are defined elsewhere and imported here
import { ActivityType, Event } from '../../../../../types/api/events/event';
import { Platform } from '../../../../../types/api/platforms/platform';

interface EventCardProps {
  event: Event;
  platform?: Platform; // This is optional in case some events do not have a platform associated
}

const EventCard: React.FC<EventCardProps> = ({ event, platform }) => {
  const generateFullDescription = (activity: ActivityType, description: string): string => {
    // Define a mapping from ActivityType to prefix
    const activityPrefixMap: Record<ActivityType, string> = {
      [ActivityType.View]: 'Viewed',
      [ActivityType.Leave]: 'Left', // Assuming you might reintroduce or use this type
      [ActivityType.Video]: 'Watched',
      [ActivityType.Audio]: 'Listened to',
    };

    // Get the prefix for the current activity
    const prefix = activityPrefixMap[activity] || '';

    // Check if the description already starts with the prefix (to avoid duplication)
    if (description.startsWith(prefix)) {
      return description; // Return the original description if it already includes the prefix
    }

    // Concatenate the prefix with the description if not already included
    return `${prefix} ${description}`;
  };

  return (
    <a href={event.url} target="_blank" rel="noopener noreferrer" className="no-underline">
      <div className="event-card bg-zinc-800 shadow-md rounded-lg overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-center">
          {platform?.favIconUrl && (
            <img
              src={platform.favIconUrl}
              alt={`${platform.name} Favicon`}
              className="w-8 h-8 object-cover md:mr-4 rounded-full"
            />
          )}
          <div className="mt-4 md:mt-0">
            <h3 className="font-semibold text-md text-gray-100">
              {platform?.name || 'Unknown Platform'}
            </h3>
            <p className="text-gray-200 text-sm pb-1">
              {generateFullDescription(event.activity, event.description)}
            </p>
            {event.createdAt && (
              <p className="text-gray-400 text-xs">Date: {event.createdAt.toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default EventCard;
