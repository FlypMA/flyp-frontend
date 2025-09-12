// 🔄 Legacy Redirect Routes - Clean, centralized redirect management
import { RouteObject, redirect } from 'react-router-dom';
import { getUserRole } from '@shared/utils/auth-utils';

// Centralized redirect logic
const createRoleBasedRedirect = (sellerPath: string, buyerPath: string) => {
  return () => {
    const userRole = getUserRole();
    return redirect(userRole === 'seller' || userRole === 'both' ? sellerPath : buyerPath);
  };
};

export const redirectRoutes: RouteObject[] = [
  // Legacy Account Routes (matching legacy app exactly)
  { path: '/account', loader: createRoleBasedRedirect('/my-business', '/users') },
  { path: '/account/settings', loader: () => redirect('/users/settings') },
  { path: '/account/seller', loader: () => redirect('/my-business') },
  { path: '/account/seller/dashboard', loader: () => redirect('/my-business') },

  // Legacy Business Routes (matching legacy app exactly)
  { path: '/business', loader: () => redirect('/my-business') },
  { path: '/business/*', loader: ({ params }) => redirect(`/my-business/${params['*'] || ''}`) },

  // Legacy Dashboard Routes (matching legacy app exactly)
  { path: '/dashboard', loader: createRoleBasedRedirect('/my-business', '/search') },
  { path: '/dashboard/buyer', loader: () => redirect('/search') },

  // Legacy Role Routes (matching legacy app exactly)
  { path: '/selling', loader: () => redirect('/my-business') },
  { path: '/selling/*', loader: ({ params }) => redirect(`/my-business/${params['*'] || ''}`) },
  { path: '/buying', loader: () => redirect('/search') },
  { path: '/buying/*', loader: () => redirect('/search') },
  { path: '/buyer', loader: () => redirect('/search') },
  { path: '/seller', loader: () => redirect('/my-business') },
  { path: '/profile', loader: () => redirect('/users/profile') },

  // Additional legacy redirects to match legacy app
  { path: '/seller/listings/new', loader: () => redirect('/my-business/listings/new') },
  { path: '/seller/dashboard', loader: () => redirect('/my-business') },
  { path: '/support/faq', loader: () => redirect('/faq') },
  { path: '/navigation-test', loader: () => redirect('/') },
];
