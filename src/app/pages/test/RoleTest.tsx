/**
 * 🧪 Role Test Page - UpSwitch MVP
 * Test page to verify role-based route protection is working
 *
 * This page demonstrates:
 * - useRoleGuard hook usage
 * - Role-based content display
 * - Access control testing
 */

import * as React from 'react';
import { useAuth } from '../../providers/auth-provider';
import { useRoleGuard } from '../../routing/route-guards';

const RoleTest: React.FC = () => {
  const { user } = useAuth();
  const sellerGuard = useRoleGuard(['seller', 'both', 'admin']);
  const buyerGuard = useRoleGuard(['buyer', 'both', 'admin']);
  const adminGuard = useRoleGuard(['admin']);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Role-Based Access Control Test</h1>

          {/* Current User Info */}
          <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current User Information</h2>
            {user ? (
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-medium">Name:</span> {user.name || 'Not set'}
                </div>
                <div>
                  <span className="font-medium">Role:</span>
                  <span className="ml-2 px-2 py-1 bg-primary-200 text-primary-800 rounded-full text-xs">
                    {user.role}
                  </span>
                </div>
                <div>
                  <span className="font-medium">User ID:</span> {user.id}
                </div>
              </div>
            ) : (
              <p className="text-primary-700">Not logged in</p>
            )}
          </div>

          {/* Role Access Tests */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seller Access */}
            <div className="p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                🏢 Seller Access
                {sellerGuard.hasAccess ? (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    ✅ Granted
                  </span>
                ) : (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    ❌ Denied
                  </span>
                )}
              </h3>

              {sellerGuard.hasAccess ? (
                <div className="space-y-3">
                  <div className="text-green-700 text-sm">✅ Can access business dashboard</div>
                  <div className="text-green-700 text-sm">✅ Can manage listings</div>
                  <div className="text-green-700 text-sm">✅ Can view business analytics</div>
                  <div className="text-green-700 text-sm">✅ Can access valuation tools</div>
                </div>
              ) : (
                <div className="text-red-600 text-sm">
                  ❌ Seller features are restricted for your account type
                </div>
              )}
            </div>

            {/* Buyer Access */}
            <div className="p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                🛒 Buyer Access
                {buyerGuard.hasAccess ? (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    ✅ Granted
                  </span>
                ) : (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    ❌ Denied
                  </span>
                )}
              </h3>

              {buyerGuard.hasAccess ? (
                <div className="space-y-3">
                  <div className="text-green-700 text-sm">✅ Can browse listings</div>
                  <div className="text-green-700 text-sm">✅ Can save businesses</div>
                  <div className="text-green-700 text-sm">✅ Can send inquiries</div>
                  <div className="text-green-700 text-sm">✅ Can access messages</div>
                </div>
              ) : (
                <div className="text-red-600 text-sm">
                  ❌ Buyer features are restricted for your account type
                </div>
              )}
            </div>

            {/* Admin Access */}
            <div className="p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                👑 Admin Access
                {adminGuard.hasAccess ? (
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    ✅ Granted
                  </span>
                ) : (
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                    ❌ Denied
                  </span>
                )}
              </h3>

              {adminGuard.hasAccess ? (
                <div className="space-y-3">
                  <div className="text-purple-700 text-sm">✅ Can access admin panel</div>
                  <div className="text-purple-700 text-sm">✅ Can manage all users</div>
                  <div className="text-purple-700 text-sm">✅ Can view system analytics</div>
                  <div className="text-purple-700 text-sm">✅ Can access all features</div>
                </div>
              ) : (
                <div className="text-gray-600 text-sm">
                  ❌ Admin features require administrator privileges
                </div>
              )}
            </div>
          </div>

          {/* Role Capabilities Summary */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Role Capabilities Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Current User Can:</h4>
                <ul className="space-y-1 text-gray-600">
                  {sellerGuard.isSeller && <li>• Access seller dashboard</li>}
                  {buyerGuard.isBuyer && <li>• Browse and save listings</li>}
                  {adminGuard.isAdmin && <li>• Administer the platform</li>}
                  <li>• Manage account settings</li>
                  <li>• Access messages</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Access Control Status:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Authentication: {user ? '✅ Authenticated' : '❌ Not authenticated'}</li>
                  <li>• Seller Routes: {sellerGuard.hasAccess ? '✅ Accessible' : '❌ Blocked'}</li>
                  <li>• Buyer Routes: {buyerGuard.hasAccess ? '✅ Accessible' : '❌ Blocked'}</li>
                  <li>• Admin Routes: {adminGuard.hasAccess ? '✅ Accessible' : '❌ Blocked'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test Navigation */}
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-yellow-800">Test Navigation</h3>
            <p className="text-yellow-700 text-sm mb-4">
              Try navigating to these protected routes to test the role-based access control:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2 text-yellow-800">Seller-Only Routes:</h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>
                    • <code>/my-business</code> - Business Dashboard
                  </li>
                  <li>
                    • <code>/my-business/listings</code> - Manage Listings
                  </li>
                  <li>
                    • <code>/my-business/valuations</code> - Valuation Tools
                  </li>
                  <li>
                    • <code>/my-business/analytics</code> - Business Analytics
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-yellow-800">All Authenticated Routes:</h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>
                    • <code>/listings</code> - Browse Businesses
                  </li>
                  <li>
                    • <code>/messages</code> - Messages
                  </li>
                  <li>
                    • <code>/users/profile</code> - Account Settings
                  </li>
                  <li>
                    • <code>/users/profile</code> - User Profile
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleTest;
