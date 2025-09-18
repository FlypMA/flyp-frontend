# Test Pages

This directory contains development and testing pages that should be removed or restricted in production environments.

## Directory Structure

```
test/
├── index.ts           # Test pages exports
├── README.md          # This documentation file
└── RoleTest.tsx       # Role-based access control testing
```

## Pages

### RoleTest

Development testing page for verifying role-based access control and route protection functionality.

**Features:**

- Role-based access control testing
- User authentication status display
- Route guard testing
- Permission verification
- Development debugging tools

**Usage:**

```tsx
import { RoleTest } from '@/app/pages/test';

// Route: /test/role (development only)
<RoleTest />;
```

**Testing Capabilities:**

- **User Authentication**: Display current user information
- **Role Verification**: Test different user roles and permissions
- **Route Guards**: Verify route protection functionality
- **Access Control**: Test role-based content access
- **Permission Testing**: Validate user permissions

**Role Testing:**

- **Seller Role**: Test seller-specific access and permissions
- **Buyer Role**: Test buyer-specific access and permissions
- **Admin Role**: Test admin access and elevated permissions
- **Both Role**: Test users with multiple role access
- **Unauthenticated**: Test access for non-logged-in users

## Development Features

### Authentication Testing

- **User Status**: Display current authentication status
- **User Details**: Show user information and role
- **Session Testing**: Verify session management
- **Token Validation**: Test authentication tokens
- **Login State**: Monitor login/logout states

### Role-Based Testing

- **Role Guards**: Test useRoleGuard hook functionality
- **Permission Checks**: Verify role-based permissions
- **Content Access**: Test role-based content display
- **Route Protection**: Validate route access control
- **Navigation Testing**: Test role-based navigation

### Debug Information

- **User Object**: Display complete user object
- **Role Information**: Show detailed role information
- **Permission Matrix**: Display available permissions
- **Access Status**: Show access control status
- **Error States**: Display authentication errors

## Security Considerations

### Production Safety

- **Development Only**: These pages should not be accessible in production
- **Access Control**: Restrict access to development environments
- **Sensitive Information**: Avoid displaying sensitive user data
- **Security Testing**: Use for security testing only
- **Cleanup**: Remove or disable in production builds

### Best Practices

- **Environment Checks**: Verify development environment
- **Access Logging**: Log access to test pages
- **Data Sanitization**: Sanitize displayed user data
- **Error Handling**: Proper error handling and display
- **Documentation**: Document testing procedures

## Testing Workflows

### Role Testing Workflow

1. **Login as Different Users**: Test with various user roles
2. **Verify Access Control**: Check role-based access
3. **Test Route Guards**: Validate route protection
4. **Check Permissions**: Verify user permissions
5. **Test Navigation**: Validate role-based navigation

### Authentication Testing Workflow

1. **Login/Logout**: Test authentication flows
2. **Session Management**: Verify session handling
3. **Token Validation**: Test authentication tokens
4. **Error States**: Test authentication errors
5. **State Persistence**: Verify state management

## Integration Points

### Authentication Integration

```tsx
// Test authentication state
const { user, isAuthenticated } = useAuth();
console.log('User:', user);
console.log('Authenticated:', isAuthenticated);
```

### Role Guard Integration

```tsx
// Test role guards
const sellerGuard = useRoleGuard(['seller', 'both', 'admin']);
const buyerGuard = useRoleGuard(['buyer', 'both', 'admin']);
const adminGuard = useRoleGuard(['admin']);
```

### Route Protection Integration

```tsx
// Test route protection
<Route
  path="/test/role"
  element={
    <RoleProtectedRoute roles={['admin', 'developer']}>
      <RoleTest />
    </RoleProtectedRoute>
  }
/>
```

## Development Guidelines

### Usage Guidelines

- **Development Only**: Use only in development environments
- **Testing Purpose**: Use for testing and debugging only
- **Data Privacy**: Be careful with user data display
- **Security**: Don't expose sensitive information
- **Cleanup**: Remove before production deployment

### Testing Procedures

- **Regular Testing**: Test role functionality regularly
- **Edge Cases**: Test edge cases and error states
- **User Scenarios**: Test realistic user scenarios
- **Security Testing**: Verify security measures
- **Performance Testing**: Test performance impact

## Future Enhancements

### Planned Features

- **Automated Testing**: Automated role testing
- **Test Data**: Mock user data for testing
- **Performance Testing**: Role-based performance testing
- **Security Testing**: Enhanced security testing
- **Integration Testing**: End-to-end testing

### Testing Tools

- **Test Suites**: Comprehensive test suites
- **Mock Data**: Realistic test data
- **Automation**: Automated testing workflows
- **Reporting**: Test result reporting
- **Monitoring**: Test monitoring and alerts

## Maintenance

### Regular Maintenance

- **Code Updates**: Keep test code updated
- **Security Reviews**: Regular security reviews
- **Access Audits**: Audit test page access
- **Documentation**: Keep documentation current
- **Cleanup**: Regular cleanup of test data

### Production Deployment

- **Environment Checks**: Verify production environment
- **Access Control**: Ensure test pages are disabled
- **Security Review**: Review security implications
- **Documentation**: Update deployment documentation
- **Monitoring**: Monitor for unauthorized access
