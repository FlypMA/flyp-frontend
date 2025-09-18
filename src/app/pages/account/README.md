# Account Pages

This directory contains all account-related pages including user onboarding, authentication, and account management.

## Directory Structure

```
account/
├── onboarding/           # User onboarding flows
│   ├── buyer/           # Buyer-specific onboarding
│   ├── seller/          # Seller-specific onboarding
│   └── signUpComplete/  # Post-registration completion
├── passwordReset/       # Password reset functionality
└── users/              # User account management
```

## Pages

### Onboarding Pages

#### BuyerOnboarding

Comprehensive onboarding flow for buyers to set up their profiles and preferences.

**Features:**

- Multi-step onboarding process
- Investment preferences setup
- Industry interests selection
- Budget range configuration
- Notification preferences
- Profile completion tracking

**Usage:**

```tsx
import { BuyerOnboarding } from '@/app/pages/account';

// Route: /onboarding/buyer
<BuyerOnboarding />;
```

#### SellerOnboarding

Onboarding flow for sellers to set up their business profiles and listing preferences.

**Features:**

- Business information collection
- Listing preferences setup
- Contact information verification
- Business verification process
- Pricing strategy selection
- Marketing preferences

**Usage:**

```tsx
import { SellerOnboarding } from '@/app/pages/account';

// Route: /onboarding/seller
<SellerOnboarding />;
```

#### SignUpComplete

Post-registration completion page with next steps and verification.

**Features:**

- Email verification status
- Next steps guidance
- Account activation
- Welcome message
- Quick start actions

**Usage:**

```tsx
import { SignUpComplete } from '@/app/pages/account';

// Route: /signup/complete
<SignUpComplete />;
```

### Password Reset Pages

#### ForgotPasswordPage

Password reset request page for users who have forgotten their passwords.

**Features:**

- Email input validation
- Password reset request submission
- Success/error feedback
- Security information
- Alternative recovery options

**Usage:**

```tsx
import { ForgotPasswordPage } from '@/app/pages/account';

// Route: /forgot-password
<ForgotPasswordPage />;
```

#### ResetPasswordPage

Password reset form for users with valid reset tokens.

**Features:**

- Token validation
- New password input
- Password strength validation
- Confirmation matching
- Security requirements

**Usage:**

```tsx
import { ResetPasswordPage } from '@/app/pages/account';

// Route: /reset-password/:token
<ResetPasswordPage />;
```

### User Management Pages

#### UserProfile

User profile management page for viewing and editing personal information.

**Features:**

- Profile information display
- Editable profile fields
- Avatar upload
- Contact information management
- Privacy settings
- Account verification status

**Usage:**

```tsx
import { UserProfile } from '@/app/pages/account';

// Route: /account/profile
<UserProfile />;
```

#### UserSettings

Comprehensive user settings page for account configuration.

**Features:**

- Account preferences
- Notification settings
- Privacy controls
- Security settings
- Data export options
- Account deletion

**Usage:**

```tsx
import { UserSettings } from '@/app/pages/account';

// Route: /account/settings
<UserSettings />;
```

#### UserBilling

Billing and subscription management page.

**Features:**

- Subscription status
- Payment methods
- Billing history
- Invoice downloads
- Plan upgrades/downgrades
- Payment failure handling

**Usage:**

```tsx
import { UserBilling } from '@/app/pages/account';

// Route: /account/billing
<UserBilling />;
```

#### UserNotifications

Notification preferences and management page.

**Features:**

- Notification categories
- Delivery preferences
- Frequency settings
- Channel selection (email, SMS, push)
- Notification history
- Unsubscribe options

**Usage:**

```tsx
import { UserNotifications } from '@/app/pages/account';

// Route: /account/notifications
<UserNotifications />;
```

## Authentication & Authorization

All account pages implement proper authentication and authorization:

- **Protected Routes**: Most pages require authentication
- **Role-Based Access**: Different access levels for buyers/sellers
- **Session Management**: Proper session handling and validation
- **Security Headers**: CSRF protection and secure headers

## User Experience Features

- **Progressive Disclosure**: Information revealed step-by-step
- **Form Validation**: Real-time validation with helpful error messages
- **Auto-save**: Draft saving for long forms
- **Progress Indicators**: Clear progress through multi-step processes
- **Responsive Design**: Mobile-first responsive layout
- **Accessibility**: Screen reader support and keyboard navigation

## Integration Points

- **Authentication Service**: User authentication and session management
- **User Service**: Profile and settings management
- **Notification Service**: Email and push notifications
- **Payment Service**: Billing and subscription management
- **Analytics**: User behavior tracking and conversion optimization

## Security Considerations

- **Input Validation**: All user inputs are validated and sanitized
- **CSRF Protection**: Cross-site request forgery protection
- **Rate Limiting**: Protection against brute force attacks
- **Data Encryption**: Sensitive data encrypted in transit and at rest
- **Privacy Compliance**: GDPR and privacy regulation compliance
