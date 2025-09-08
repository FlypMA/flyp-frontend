import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Divider, Avatar } from '@heroui/react';
import {
  Menu,
  X,
  Home,
  Search,
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  User as UserIcon,
  ChevronRight,
  Bell,
  Heart,
  Shield,
} from 'lucide-react';
import { BetweendealsLogo } from '../common';
import { UserProfile } from '../../../types/api';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { authService } from '../../services/users/authenticationService';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';

interface MobileNavigationProps {
  user?: UserProfile | null;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ user, isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useAuthModal();
  const [isClosing, setIsClosing] = useState(false);

  // Close navigation when route changes
  useEffect(() => {
    if (isOpen) {
      handleClose();
    }
  }, [location.pathname]);

  // Prevent body scroll when navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onToggle();
      setIsClosing(false);
    }, 200);
  };

  const handleNavigation = (href: string) => {
    handleClose();
    setTimeout(() => {
      navigate(href);
    }, 250);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Navigation sections based on authentication state
  const getNavigationSections = (): NavSection[] => {
    const publicSections: NavSection[] = [
      {
        title: 'Discover',
        items: [
          { label: 'Home', href: '/', icon: Home },
          { label: 'For Buyers', href: '/search', icon: TrendingUp },
          { label: 'For Sellers', href: '/for-sellers', icon: Building2 },
        ],
      },
      {
        title: 'Resources',
        items: [{ label: 'Valuation Guide', href: '/resources/valuation-guide', icon: DollarSign }],
      },
    ];

    if (user) {
      // Authenticated user sections
      const userRole = user.role || 'buyer';
      const isDashboard =
        location.pathname.includes('/dashboard') || location.pathname.includes('/account');

      const authenticatedSections: NavSection[] = [
        {
          title: 'Dashboard',
          items: [
            {
              label: userRole === 'seller' ? 'Business Overview' : 'Buyer Dashboard',
              href: userRole === 'seller' ? '/business/overview' : '/dashboard/buyer',
              icon: Home,
            },
            { label: 'Saved Listings', href: '/account/saved', icon: Heart },
            { label: 'Notifications', href: '/account/notifications', icon: Bell, badge: '3' },
          ],
        },
      ];

      if (userRole === 'seller') {
        authenticatedSections.push({
          title: 'Business Management',
          items: [
            { label: 'Manage Listings', href: '/business/listings', icon: Building2 },
            { label: 'Create Listing', href: '/seller/listings/new', icon: FileText, isNew: true },
            { label: 'Business Valuation', href: '/business/valuation', icon: Users },
          ],
        });
      }

      authenticatedSections.push({
        title: 'Account',
        items: [
          { label: 'Profile Settings', href: '/profile/settings', icon: Settings },
          { label: 'Subscription', href: '/account/billing', icon: Shield },
        ],
      });

      return [...authenticatedSections, ...publicSections];
    }

    return publicSections;
  };

  const navigationSections = getNavigationSections();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleClose}
        />
      )}

      {/* Mobile Navigation Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 lg:hidden transform transition-all duration-300 ease-out ${
          isOpen && !isClosing ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <Link
            to="/"
            className="flex items-center space-x-3 group nav-logo-group"
            onClick={() => handleNavigation('/')}
          >
            <BetweendealsLogo
              variant="mobile"
              className="w-12 h-12 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-primary-600 ml-2">
              betweendeals
            </span>
          </Link>
          <Button
            isIconOnly
            variant="ghost"
            className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
            onPress={handleClose}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Profile Section (if authenticated) */}
        {user && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name || user.email || 'User'}
                  className="w-12 h-12 object-cover rounded-full ring-2 ring-white shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  <span className="text-white text-sm font-semibold">
                    {(() => {
                      const name = user.full_name;
                      const email = user.email;
                      if (name) {
                        const nameParts = name.split(' ');
                        if (nameParts.length >= 2) {
                          return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
                        }
                        return name.charAt(0).toUpperCase();
                      }
                      if (email) {
                        return email.charAt(0).toUpperCase();
                      }
                      return 'U';
                    })()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{user.full_name || 'User'}</h3>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                <span className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  {user.role === 'seller' ? 'Seller' : 'Buyer'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-6">
            {navigationSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                {section.title && (
                  <h3 className="px-6 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <nav className="space-y-1 px-3">
                  {section.items.map((item, itemIndex) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <button
                        key={itemIndex}
                        onClick={() => handleNavigation(item.href)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className={`w-5 h-5 transition-colors ${
                              isActive
                                ? 'text-blue-600'
                                : 'text-slate-500 group-hover:text-slate-700'
                            }`}
                          />
                          <span className="font-medium">{item.label}</span>
                          {item.isNew && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 transition-all duration-200 ${
                              isActive
                                ? 'text-blue-500'
                                : 'text-slate-400 group-hover:text-slate-600'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50">
          {user ? (
            // Authenticated user footer
            <div className="p-6">
              <Button
                variant="ghost"
                onPress={handleLogout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                startContent={<LogOut className="w-5 h-5" />}
              >
                Sign out
              </Button>
            </div>
          ) : (
            // Guest user footer
            <div className="p-6 space-y-3">
              <Button
                onPress={() => {
                  handleClose();
                  setTimeout(() => openModal('login'), 250);
                }}
                variant="ghost"
                className="w-full text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                Log in
              </Button>
              <Button
                onPress={() => handleNavigation('/for-sellers')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Sell your business
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
