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
  // Legacy Account Routes
  { path: '/account', loader: createRoleBasedRedirect('/my-business', '/users') },
  { path: '/account/settings', loader: () => redirect('/users/settings') },
  { path: '/account/seller', loader: () => redirect('/my-business') },
  { path: '/account/seller/dashboard', loader: () => redirect('/my-business') },

  // Legacy Business Routes
  { path: '/business', loader: () => redirect('/my-business') },
  { path: '/business/*', loader: ({ params }) => redirect(`/my-business/${params['*'] || ''}`) },

  // Legacy Dashboard Routes
  { path: '/dashboard', loader: createRoleBasedRedirect('/my-business', '/marketplace') },
  { path: '/dashboard/buyer', loader: () => redirect('/marketplace') },

  // Legacy Role Routes
  { path: '/selling', loader: () => redirect('/my-business') },
  { path: '/selling/*', loader: ({ params }) => redirect(`/my-business/${params['*'] || ''}`) },
  { path: '/buying', loader: () => redirect('/marketplace') },
  { path: '/buying/*', loader: () => redirect('/marketplace') },
  { path: '/buyer', loader: () => redirect('/marketplace') },
  { path: '/seller', loader: () => redirect('/my-business') },
  { path: '/profile', loader: () => redirect('/users/profile') },
];
