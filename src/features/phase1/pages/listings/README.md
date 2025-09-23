# Listings Pages

This directory contains all pages related to business listing management, including creation, editing, viewing, and searching for business listings.

## Directory Structure

```
listings/
├── CreateListingPage.tsx    # Business listing creation
├── EditListingPage.tsx      # Business listing editing
├── ListingDetails.tsx       # Individual listing view
└── ListingSearch.tsx        # Listing search and discovery
```

## Pages

### CreateListingPage

Page for creating new business listings with comprehensive onboarding and data collection.

**Features:**

- Modal-based listing creation
- Multi-step onboarding process
- Business information collection
- Image and document upload
- Validation and error handling
- SEO optimization

**Usage:**

```tsx
import { CreateListingPage } from '@/app/pages/listings';

// Route: /listings/create
<CreateListingPage />;
```

**Functionality:**

- **Auto-opens Modal**: Automatically opens the seller onboarding modal
- **Data Collection**: Comprehensive business information gathering
- **Validation**: Real-time form validation and error handling
- **Navigation**: Smart navigation after completion
- **Integration**: Integrates with seller onboarding modal

### EditListingPage

Page for editing existing business listings with pre-populated data and update capabilities.

**Features:**

- Pre-populated form data
- Update existing listing information
- Image and document management
- Status and visibility controls
- Save and publish options
- Change tracking

**Usage:**

```tsx
import { EditListingPage } from '@/app/pages/listings';

// Route: /listings/:id/edit
<EditListingPage />;
```

**Functionality:**

- **Data Loading**: Loads existing listing data
- **Form Pre-population**: Pre-fills form with current data
- **Update Capabilities**: Modify listing information
- **Media Management**: Update images and documents
- **Status Management**: Change listing status and visibility
- **Version Control**: Track changes and updates

### ListingDetails

Comprehensive individual listing view with detailed business information and interaction capabilities.

**Features:**

- Complete business information display
- Image gallery and media viewing
- Inquiry and contact functionality
- NDA and confidentiality handling
- Social sharing capabilities
- SEO optimization

**Usage:**

```tsx
import { ListingDetails } from '@/app/pages/listings';

// Route: /listings/:id
<ListingDetails />;
```

**Content Sections:**

- **Business Overview**: Company information and description
- **Financial Information**: Revenue, profit, and financial metrics
- **Location and Facilities**: Business location and premises
- **Images and Media**: Photo gallery and document viewing
- **Contact and Inquiry**: Buyer inquiry and contact forms
- **Related Listings**: Similar business recommendations

**Interactive Features:**

- **Image Gallery**: Full-screen image viewing with navigation
- **Inquiry Modal**: Business inquiry and contact forms
- **NDA Handling**: Non-disclosure agreement management
- **Social Sharing**: Share listing on social media
- **Save to Favorites**: Bookmark listings for later
- **Contact Seller**: Direct communication with seller

### ListingSearch

Advanced search and discovery page for finding business listings with comprehensive filtering and sorting options.

**Features:**

- Advanced search and filtering
- Price range and location filters
- Industry and sector filtering
- Sorting and pagination
- Save search functionality
- Search result optimization

**Usage:**

```tsx
import { ListingSearch } from '@/app/pages/listings';

// Route: /listings/search
<ListingSearch />;
```

**Search Capabilities:**

- **Text Search**: Search by business name, description, or keywords
- **Location Filter**: Filter by country, region, or city
- **Price Range**: Filter by asking price range
- **Industry Filter**: Filter by business sector or industry
- **Size Filter**: Filter by revenue, employees, or business size
- **Status Filter**: Filter by listing status and availability

**Advanced Features:**

- **Save Search**: Save search criteria for future use
- **Search Alerts**: Get notified of new matching listings
- **Sorting Options**: Sort by price, date, relevance, or popularity
- **Pagination**: Navigate through large result sets
- **Map View**: Geographic view of listings
- **Export Results**: Export search results to CSV or PDF

## User Experience Features

### Search and Discovery

- **Intuitive Search**: Easy-to-use search interface
- **Smart Filters**: Intelligent filtering suggestions
- **Search Suggestions**: Auto-complete and search suggestions
- **Recent Searches**: Quick access to recent search queries
- **Popular Searches**: Trending and popular search terms

### Listing Management

- **Draft System**: Save listings as drafts before publishing
- **Status Management**: Control listing visibility and status
- **Analytics**: Track listing views, inquiries, and performance
- **Media Management**: Upload and organize images and documents
- **Version History**: Track changes and updates to listings

### Buyer Experience

- **Detailed Information**: Comprehensive business information
- **Visual Content**: High-quality images and media
- **Contact Options**: Multiple ways to contact sellers
- **Confidentiality**: Secure handling of sensitive information
- **Comparison Tools**: Compare multiple listings

## Technical Implementation

### State Management

- **Search State**: Search criteria, filters, and results
- **Listing State**: Individual listing data and status
- **Form State**: Form data and validation state
- **UI State**: Modal states, loading states, and interactions
- **Cache State**: Cached search results and listing data

### Data Integration

- **API Integration**: Backend API for listing data
- **Image Upload**: File upload and image processing
- **Search Engine**: Full-text search and filtering
- **Analytics**: User behavior and listing performance tracking
- **Notifications**: Real-time updates and alerts

### Performance Optimization

- **Lazy Loading**: Load images and content on demand
- **Pagination**: Efficient handling of large result sets
- **Caching**: Cache search results and listing data
- **Image Optimization**: Optimized image loading and display
- **Search Optimization**: Fast search and filtering performance

## SEO and Marketing

### SEO Optimization

- **Meta Tags**: Optimized titles, descriptions, and keywords
- **Structured Data**: Schema markup for business listings
- **URL Structure**: SEO-friendly URLs for listings
- **Internal Linking**: Strategic internal link structure
- **Content Quality**: High-quality, valuable content

### Marketing Features

- **Social Sharing**: Share listings on social media
- **Email Sharing**: Share listings via email
- **Print Options**: Print-friendly listing views
- **Embed Codes**: Embed listings on external websites
- **Analytics**: Track listing performance and engagement

## Security and Privacy

### Data Protection

- **Confidential Information**: Secure handling of sensitive data
- **NDA Management**: Non-disclosure agreement workflows
- **Access Control**: Role-based access to listing information
- **Data Encryption**: Encrypted data transmission and storage
- **Privacy Compliance**: GDPR and privacy regulation compliance

### User Authentication

- **Protected Routes**: Authentication required for certain actions
- **Role-based Access**: Different access levels for buyers and sellers
- **Session Management**: Secure session handling
- **Permission Checks**: Verify user permissions for actions
- **Audit Logging**: Track user actions and changes

## Integration Points

### Authentication Integration

```tsx
// Check user authentication and role
const authResult = await authService.checkAuthentication();
if (authResult.isAuthenticated) {
  // Allow listing creation/editing
} else {
  // Redirect to login
}
```

### Search Integration

```tsx
// Search listings with filters
const searchResults = await searchListings({
  query: searchQuery,
  filters: appliedFilters,
  sort: sortOption,
  page: currentPage,
});
```

### Analytics Integration

```tsx
// Track listing interactions
analytics.track('listing_view', {
  listingId: listing.id,
  userId: user.id,
  source: 'search_results',
});
```
