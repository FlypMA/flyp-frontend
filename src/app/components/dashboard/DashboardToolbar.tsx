import React, { useState, useCallback } from 'react';
import { Eye, Code, Info, RefreshCw, Download, Maximize } from 'lucide-react';
import BetweendealsLoadingLogo from '../main_UI/BetweendealsLoadingLogo';
import { UserAvatarDropdown } from '../account/account_UI/navigation';
import { User } from '../../types/api/users/user';

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
  _reportContent?: string;
}

const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  onRefresh,
  onDownload,
  onFullScreen,
  isGenerating = false,
  user,
  reportName,
  reportId,
  activeTab = 'preview',
  onTabChange,
  _reportContent,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [customReportName, setCustomReportName] = useState<string>('');

  // Debug logging
  console.log('🎯 DashboardToolbar - user prop:', user);
  console.log('🎯 DashboardToolbar - user exists:', !!user);

  // Generate unique trend report names based on URL report ID
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
      'Edge',
      'Vibe',
      'Buzz',
      'Momentum',
      'Force',
    ];

    const descriptors = [
      'Social',
      'Digital',
      'Viral',
      'Market',
      'Brand',
      'Content',
      'Audience',
      'Engagement',
      'Growth',
      'Impact',
      'Cultural',
      'Global',
    ];

    const formats = [
      'Analytics',
      'Insights',
      'Report',
      'Dashboard',
      'Study',
      'Brief',
      'Overview',
      'Analysis',
      'Snapshot',
      'Summary',
      'Intelligence',
      'Tracker',
    ];

    // Extract report ID from URL or use provided reportId
    let seedSource = reportId;
    if (!seedSource) {
      // Try to extract from current URL path like /reports/abc123_xyz789
      const urlPath = window.location.pathname;
      const urlMatch = urlPath.match(/\/reports\/([a-zA-Z0-9_]+)/);
      seedSource = urlMatch ? urlMatch[1] : Date.now().toString();
    }

    // Use the actual report ID characters for seeding (more deterministic)
    let hashSum = 0;
    for (let i = 0; i < seedSource.length; i++) {
      hashSum += seedSource.charCodeAt(i) * (i + 1);
    }

    const trendWord = trendWords[hashSum % trendWords.length];
    const descriptor = descriptors[(hashSum * 2) % descriptors.length];
    const format = formats[(hashSum * 3) % formats.length];

    return `${trendWord} ${descriptor} ${format}`;
  }, [reportId]);

  // Debug report ID extraction
  React.useEffect(() => {
    const urlPath = window.location.pathname;
    const urlMatch = urlPath.match(/\/reports\/([a-zA-Z0-9_]+)/);
    const extractedId = urlMatch ? urlMatch[1] : 'none';
    console.log('🆔 DashboardToolbar - URL report ID extracted:', extractedId);
    console.log('🆔 DashboardToolbar - Props report ID:', reportId);
    console.log('🏷️ DashboardToolbar - Generated name:', generateUniqueReportName());
  }, [reportId, generateUniqueReportName]);

  // Get the report display name
  const getReportDisplayName = () => {
    if (customReportName) {
      return customReportName;
    }
    if (reportName) {
      return reportName;
    }
    return generateUniqueReportName();
  };

  // Handle clicking on the report name to edit
  const handleNameClick = () => {
    setCustomReportName(getReportDisplayName());
    setIsEditingName(true);
  };

  // Handle saving the edited name
  const handleNameSave = () => {
    setIsEditingName(false);
  };

  // Handle canceling the edit
  const handleNameCancel = () => {
    setCustomReportName('');
    setIsEditingName(false);
  };

  // Handle key press in the input
  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };

  // Get display name with proper fallback
  const getDisplayName = () => {
    if (user?.name && user.name !== 'Guest') {
      return user.name;
    }
    return 'Guest';
  };

  return (
    <nav className="relative min-h-12 w-full shrink-0 flex items-center gap-2 px-4 py-2 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm">
      <div className="relative max-w-full gap-1 flex w-full shrink-0 items-center">
        <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="relative flex w-full flex-shrink-0 items-center justify-between">
            {/* Left Section - Project Info */}
            <div className="flex flex-shrink-0 items-center gap-2" style={{ width: '23%' }}>
              <div className="relative flex items-center gap-2 group">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  {isGenerating ? (
                    <BetweendealsLoadingLogo size="sm" color="white" />
                  ) : (
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"></div>
                  )}

                  {/* Desktop - Editable Report Name */}
                  {isEditingName ? (
                    <input
                      type="text"
                      value={customReportName}
                      onChange={e => setCustomReportName(e.target.value)}
                      onBlur={handleNameSave}
                      onKeyDown={handleNameKeyPress}
                      className="hidden md:block bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-sm font-semibold text-white focus:outline-none focus:border-blue-400 min-w-[200px]"
                      autoFocus
                      placeholder="Enter report name..."
                    />
                  ) : (
                    <button
                      onClick={handleNameClick}
                      className="hidden md:block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-200 cursor-pointer hover:scale-105"
                      title="Click to edit report name"
                    >
                      {getReportDisplayName()}
                      {isGenerating && (
                        <span className="ml-2 text-xs text-gray-400 animate-pulse">
                          generating...
                        </span>
                      )}
                    </button>
                  )}

                  {/* Mobile - Abbreviated Name */}
                  <button
                    onClick={handleNameClick}
                    className="md:hidden text-xs text-blue-400 font-bold hover:text-blue-300 transition-colors cursor-pointer"
                    title="Click to edit report name"
                  >
                    {getReportDisplayName().split(' ')[0]}
                    {isGenerating && (
                      <span className="ml-1 text-xs text-gray-400 animate-pulse">...</span>
                    )}
                  </button>
                </div>

                {/* Edit indicator */}
                {!isEditingName && (
                  <div className="hidden md:block text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    ✏️
                  </div>
                )}
              </div>
            </div>

            {/* Center Section - Controls */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1">
              <button
                className={`p-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'preview'
                    ? 'bg-zinc-700 text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-zinc-800'
                }`}
                onClick={() => onTabChange?.('preview')}
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                className={`p-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'source'
                    ? 'bg-zinc-700 text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-zinc-800'
                }`}
                onClick={() => onTabChange?.('source')}
                title="Source Code"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                className={`p-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'info'
                    ? 'bg-zinc-700 text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-zinc-800'
                }`}
                onClick={() => onTabChange?.('info')}
                title="Backend Info"
              >
                <Info className="w-4 h-4" />
              </button>

              <div className="mx-2 h-6 w-px bg-zinc-700" />

              <button
                className="p-2 rounded-lg transition-all duration-200 text-gray-400 hover:text-gray-300 hover:bg-zinc-800"
                onClick={onRefresh}
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                className="p-2 rounded-lg transition-all duration-200 text-gray-400 hover:text-gray-300 hover:bg-zinc-800"
                onClick={onDownload}
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                className="p-2 rounded-lg transition-all duration-200 text-gray-400 hover:text-gray-300 hover:bg-zinc-800"
                onClick={onFullScreen}
                title="Open Full Screen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>

            {/* Right Section - User Avatar */}
            <div className="flex items-center gap-1.5">
              {/* User Avatar Dropdown */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {user ? getDisplayName() : 'Loading...'}
                  </p>
                </div>
                {user ? (
                  <UserAvatarDropdown user={user} />
                ) : (
                  <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                    <span className="text-xs text-zinc-300">?</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardToolbar;
