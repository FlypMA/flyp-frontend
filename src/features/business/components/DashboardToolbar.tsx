// 🛠️ Dashboard Toolbar - MVP Version
// Location: src/features/business-dashboard/components/DashboardToolbar.tsx
// Purpose: Business dashboard toolbar with actions and user info

import { Button } from '@/shared/components/buttons';
import { User } from '@/shared/types';
import { Code, Download, Edit3, Eye, Info, Maximize, RefreshCw, Save, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';

interface DashboardToolbarProps {
  onRefresh?: () => void;
  onDownload?: () => void;
  onFullScreen?: () => void;
  isGenerating?: boolean;
  user?: User | null;
  reportName?: string;
  reportId?: string;
  activeTab?: 'preview' | 'source' | 'info';
  onTabChange?: (tab: 'preview' | 'source' | 'info') => void;
  onReportNameChange?: (name: string) => void;
}

const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  onRefresh,
  onDownload,
  onFullScreen,
  isGenerating = false,
  user,
  reportName = 'Business Report',
  reportId,
  activeTab = 'preview',
  onTabChange,
  onReportNameChange,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [customReportName, setCustomReportName] = useState<string>(reportName);

  // Generate unique report names based on report ID
  const generateUniqueReportName = useCallback(() => {
    const trendWords = [
      'Wave',
      'Pulse',
      'Flow',
      'Surge',
      'Spike',
      'Shift',
      'Boom',
      'Peak',
      'Rise',
      'Growth',
      'Momentum',
      'Trend',
      'Insight',
      'Analysis',
      'Overview',
      'Summary',
    ];

    const randomWord = trendWords[Math.floor(Math.random() * trendWords.length)];
    const timestamp = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    return `${randomWord} Report - ${timestamp}`;
  }, []);

  // Handle report name editing
  const handleEditName = () => {
    setIsEditingName(true);
    setCustomReportName(reportName);
  };

  const handleSaveName = () => {
    if (customReportName.trim() && onReportNameChange) {
      onReportNameChange(customReportName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setCustomReportName(reportName);
    setIsEditingName(false);
  };

  const handleGenerateName = () => {
    const newName = generateUniqueReportName();
    setCustomReportName(newName);
    if (onReportNameChange) {
      onReportNameChange(newName);
    }
  };

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'source', label: 'Source', icon: Code },
    { id: 'info', label: 'Info', icon: Info },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Report name and tabs */}
        <div className="flex items-center space-x-6">
          {/* Report name */}
          <div className="flex items-center space-x-2">
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={customReportName}
                  onChange={e => setCustomReportName(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <Button size="sm" variant="tertiary" onClick={handleSaveName} className="p-1 h-8 w-8">
                  <Save className="w-4 h-4 text-green-600" />
                </Button>
                <Button
                  size="sm"
                  variant="tertiary"
                  onClick={handleCancelEdit}
                  className="p-1 h-8 w-8"
                >
                  <X className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-semibold text-gray-900">{reportName}</h1>
                <Button size="sm" variant="tertiary" onClick={handleEditName} className="p-1 h-8 w-8">
                  <Edit3 className="w-4 h-4 text-gray-500" />
                </Button>
                <Button
                  size="sm"
                  variant="tertiary"
                  onClick={handleGenerateName}
                  className="p-1 h-8 w-8"
                  title="Generate new name"
                >
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id as 'preview' | 'source' | 'info')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side - Actions and user info */}
        <div className="flex items-center space-x-4">
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="tertiary"
              onClick={onRefresh}
              disabled={isGenerating}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>

            <Button
              size="sm"
              variant="tertiary"
              onClick={onDownload}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </Button>

            <Button
              size="sm"
              variant="tertiary"
              onClick={onFullScreen}
              className="flex items-center space-x-2"
            >
              <Maximize className="w-4 h-4" />
              <span>Full Screen</span>
            </Button>
          </div>

          {/* User info */}
          {user && (
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">{user.name || 'User'}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardToolbar;
