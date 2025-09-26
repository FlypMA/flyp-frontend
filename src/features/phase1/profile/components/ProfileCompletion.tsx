/**
 * 📈 Profile Completion Component
 *
 * Component for displaying profile completion progress and guidance
 */

import { Button, Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import { AlertCircle, ArrowRight, CheckCircle, Target, TrendingUp } from 'lucide-react';
import React from 'react';
import { Profile, ProfileCompletion as ProfileCompletionType } from '../types/profile.types';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfileCompletionProps {
  profile: Profile;
  completion: ProfileCompletionType | null;
  onRefresh?: () => void;
  className?: string;
}

// =============================================================================
// PROFILE COMPLETION COMPONENT
// =============================================================================

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({
  profile,
  completion,
  onRefresh,
  className = '',
}) => {
  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'primary';
    if (percentage >= 50) return 'warning';
    return 'danger';
  };

  const getCompletionLevel = (percentage: number) => {
    if (percentage >= 90)
      return { level: 'Expert', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 70)
      return { level: 'Advanced', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 50)
      return { level: 'Intermediate', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Beginner', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const renderOverallProgress = () => {
    if (!completion) return null;

    const completionLevel = getCompletionLevel(completion.overallPercentage);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
            <p className="text-sm text-gray-600">
              Complete your profile to increase visibility and trust
            </p>
          </div>
          <Chip
            size="sm"
            color={getCompletionColor(completion.overallPercentage)}
            variant="flat"
            className={completionLevel.color}
          >
            {completionLevel.level}
          </Chip>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-semibold text-gray-900">
              {completion.overallPercentage}%
            </span>
          </div>
          <Progress
            value={completion.overallPercentage}
            color={getCompletionColor(completion.overallPercentage)}
            className="mb-2"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(completion.sections).map(([section, percentage]) => (
            <div key={section} className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{percentage}%</div>
              <div className="text-xs text-gray-600 capitalize">
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSectionProgress = () => {
    if (!completion) return null;

    const sections = [
      {
        key: 'personalInfo',
        title: 'Personal Information',
        description: 'Basic profile information',
        icon: <CheckCircle className="w-4 h-4" />,
      },
      {
        key: 'businessOwnerData',
        title: 'Business Information',
        description: 'Business details and context',
        icon: <Target className="w-4 h-4" />,
      },
      {
        key: 'investorData',
        title: 'Investment Profile',
        description: 'Investment preferences and experience',
        icon: <TrendingUp className="w-4 h-4" />,
      },
      {
        key: 'sharedData',
        title: 'Communication & Privacy',
        description: 'Communication preferences and privacy settings',
        icon: <CheckCircle className="w-4 h-4" />,
      },
    ];

    return (
      <div className="space-y-4">
        {sections.map(section => {
          const percentage =
            completion.sections[section.key as keyof typeof completion.sections] || 0;
          const isComplete = percentage >= 80;
          const isIncomplete = percentage < 50;

          return (
            <div
              key={section.key}
              className={`p-4 border rounded-lg ${
                isComplete
                  ? 'border-green-200 bg-green-50'
                  : isIncomplete
                    ? 'border-red-200 bg-red-50'
                    : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      isComplete
                        ? 'bg-green-100 text-green-600'
                        : isIncomplete
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{section.title}</h4>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{percentage}%</div>
                  <div className="text-xs text-gray-500">
                    {isComplete ? 'Complete' : isIncomplete ? 'Needs attention' : 'In progress'}
                  </div>
                </div>
              </div>
              <Progress value={percentage} color={getCompletionColor(percentage)} size="sm" />
            </div>
          );
        })}
      </div>
    );
  };

  const renderRecommendations = () => {
    if (!completion || !completion.recommendations) return null;

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
            <ul className="space-y-1">
              {completion.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start space-x-2">
                  <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderMissingFields = () => {
    if (!completion || !completion.missingFields || completion.missingFields.length === 0)
      return null;

    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-yellow-900 mb-2">Missing Required Fields</h4>
            <div className="flex flex-wrap gap-2">
              {completion.missingFields.map((field, index) => (
                <Chip key={index} size="sm" variant="flat" color="warning">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompletionBenefits = () => {
    const benefits = [
      {
        title: 'Increased Visibility',
        description: 'Complete profiles appear higher in search results',
        icon: <TrendingUp className="w-5 h-5" />,
      },
      {
        title: 'Enhanced Trust',
        description: 'Detailed profiles build credibility with other users',
        icon: <CheckCircle className="w-5 h-5" />,
      },
      {
        title: 'Better Matches',
        description: 'Complete profiles help us find better opportunities',
        icon: <Target className="w-5 h-5" />,
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              {benefit.icon}
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{benefit.title}</h4>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    );
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  if (!completion) {
    return (
      <Card className={`border border-gray-200 shadow-sm ${className}`}>
        <CardBody className="p-8 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Completion</h3>
          <p className="text-gray-600 mb-4">
            Complete your profile to increase visibility and build trust.
          </p>
          {onRefresh && (
            <Button variant="solid" color="primary" onPress={onRefresh}>
              Check Progress
            </Button>
          )}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className={`border border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
              <p className="text-gray-600 text-sm">
                Track your profile progress and get recommendations
              </p>
            </div>
          </div>
          {onRefresh && (
            <Button variant="bordered" color="primary" size="sm" onPress={onRefresh}>
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-6">
          {/* Overall Progress */}
          {renderOverallProgress()}

          {/* Section Progress */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Section Progress</h4>
            {renderSectionProgress()}
          </div>

          {/* Recommendations */}
          {renderRecommendations()}

          {/* Missing Fields */}
          {renderMissingFields()}

          {/* Completion Benefits */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Benefits of Completing Your Profile</h4>
            {renderCompletionBenefits()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCompletion;
