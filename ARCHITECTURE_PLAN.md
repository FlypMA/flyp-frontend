# BetweenDeals URL Architecture - Airbnb-Inspired Design

## Current Problems

- **Inconsistent patterns**: `/dashboard/buyer` vs `/account/seller`
- **Confusing hierarchy**: Mixed dashboard/account terminology
- **Poor scalability**: No clear separation of concerns

## Proposed Architecture (Following Airbnb Model)

### Core Concept

Like Airbnb's host/guest separation, we create clear seller/buyer domains:

```
Airbnb:              BetweenDeals:
/hosting/    →       /selling/     (business owners selling)
/trips/      →       /buying/      (buyers acquiring businesses)
/users/      →       /users/       (universal user management)
/messages/   →       /messages/    (universal messaging)
```

## New URL Structure

### 🏢 Seller Domain `/selling/`

```
/selling/                    # Seller dashboard overview
/selling/businesses/         # Manage business listings
/selling/businesses/new      # Create new listing
/selling/businesses/:id      # Edit specific listing
/selling/businesses/:id/analytics
/selling/businesses/:id/inquiries
/selling/valuations/         # Valuation tools
/selling/documents/          # Document vault
/selling/performance/        # Analytics dashboard
```

### 💰 Buyer Domain `/buying/`

```
/buying/                     # Buyer dashboard overview
/buying/search/              # Search businesses
/buying/saved/               # Saved searches & favorites
/buying/inquiries/           # Manage inquiries
/buying/watchlist/           # Businesses being tracked
/buying/offers/              # Active offers/negotiations
```

### 👤 Universal User Domain `/users/`

```
/users/profile/              # Edit profile
/users/settings/             # Account settings
/users/billing/              # Billing & subscriptions
/users/security/             # Password, 2FA
/users/notifications/        # Notification preferences
```

### 💬 Universal Communication `/messages/`

```
/messages/                   # Message center
/messages/:conversationId    # Specific conversation
```

### 📋 Public Marketplace `/listings/`

```
/listings/                   # Browse all listings
/listings/:id                # View specific listing
/listings/:id/data-room      # Data room access
```

## Benefits of This Architecture

### 1. **Clear Mental Model**

- `/selling/` = "I'm here to sell my business"
- `/buying/` = "I'm here to buy a business"
- `/users/` = "I'm managing my account"
- `/messages/` = "I'm communicating"

### 2. **Role-Based Access Control**

```javascript
// Clear permissions model
if (userRole.includes('seller')) {
  allowAccess('/selling/*');
}
if (userRole.includes('buyer')) {
  allowAccess('/buying/*');
}
// Everyone gets users/ and messages/
```

### 3. **Scalable Navigation**

```javascript
// Easy to add features within domains
/selling/tax-planning/     # New seller feature
/buying/financing/         # New buyer feature
/users/teams/             # Team management
```

### 4. **SEO & Analytics Benefits**

- Clear funnel tracking: `/buying/*` → conversion
- Role-based performance: `/selling/*` → listing quality
- Clean URL structure for marketing

### 5. **Development Team Clarity**

- **Seller Team**: Owns `/selling/*` routes
- **Buyer Team**: Owns `/buying/*` routes
- **Platform Team**: Owns `/users/*` and `/messages/*`

## Implementation Priority

### Phase 1: Core Architecture ✅

1. Update `UrlGeneratorService`
2. Update main routing configuration
3. Add redirects for backward compatibility

### Phase 2: Navigation Updates

1. Update all internal navigation links
2. Update dashboard redirects after login
3. Update breadcrumbs and menus

### Phase 3: Testing & Migration

1. Test all routes work correctly
2. Update any hardcoded URLs
3. Monitor for broken links

## Backward Compatibility

```javascript
// Automatic redirects
/dashboard/buyer → /buying/
/account/seller → /selling/
/dashboard → /users/profile (or role-based redirect)
```

This architecture creates a **professional, scalable, and intuitive** URL structure that will serve BetweenDeals well as it grows.
