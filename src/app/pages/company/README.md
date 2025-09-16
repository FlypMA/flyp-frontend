# Company Pages

This directory contains company information, legal, and compliance pages for the BetweenDeals platform.

## Directory Structure

```
company/
├── about/              # Company information and about pages
├── legal/              # Legal and compliance pages
│   ├── termsAndConditions/  # Terms and conditions
│   ├── privacyPolicy/       # Privacy policy
│   ├── cookiePolicy/        # Cookie policy
│   ├── gdpr/               # GDPR compliance
│   └── security/           # Security information
```

## Pages

### About Pages

#### About
Comprehensive company information page showcasing BetweenDeals' mission, values, and services.

**Features:**
- Company mission and vision
- Team information and values
- Service overview and benefits
- Statistics and achievements
- Call-to-action sections
- SEO optimization

**Usage:**
```tsx
import { About } from '@/app/pages/company';

// Route: /about
<About />
```

**Content Sections:**
- Hero section with company introduction
- Mission and vision statements
- Team and company values
- Service benefits and features
- Statistics and achievements
- Contact and call-to-action

### Legal Pages

#### Terms and Conditions
Comprehensive terms and conditions page covering platform usage, user responsibilities, and legal obligations.

**Features:**
- Complete terms and conditions
- User responsibilities and obligations
- Platform usage guidelines
- Liability and warranty information
- Dispute resolution procedures
- Regular updates and versioning

**Usage:**
```tsx
import { TermsAndConditions } from '@/app/pages/company';

// Route: /terms-and-conditions
<TermsAndConditions />
```

**Key Sections:**
- Service description and scope
- User accounts and responsibilities
- Business listings and transactions
- Payment terms and conditions
- Intellectual property rights
- Limitation of liability
- Termination and suspension
- Governing law and jurisdiction

#### Privacy Policy
Detailed privacy policy covering data collection, usage, and protection practices.

**Features:**
- Data collection practices
- Data usage and processing
- User rights and controls
- Third-party integrations
- Data security measures
- GDPR compliance information

**Usage:**
```tsx
import { PrivacyPolicy } from '@/app/pages/company';

// Route: /privacy-policy
<PrivacyPolicy />
```

**Key Sections:**
- Information collection
- Data usage and processing
- Data sharing and disclosure
- User rights and choices
- Data security and protection
- International data transfers
- Children's privacy
- Policy updates and changes

#### Cookie Policy
Cookie usage and management policy for website functionality and analytics.

**Features:**
- Cookie types and purposes
- Cookie management options
- Third-party cookies
- User consent mechanisms
- Cookie preferences
- Analytics and tracking

**Usage:**
```tsx
import { CookiePolicy } from '@/app/pages/company';

// Route: /cookie-policy
<CookiePolicy />
```

**Cookie Categories:**
- Essential cookies (required for functionality)
- Performance cookies (analytics and optimization)
- Functionality cookies (user preferences)
- Marketing cookies (advertising and targeting)

#### GDPR Compliance
General Data Protection Regulation compliance information and user rights.

**Features:**
- GDPR compliance overview
- User rights and data protection
- Data processing activities
- Consent management
- Data portability
- Right to erasure

**Usage:**
```tsx
import { GdprCompliance } from '@/app/pages/company';

// Route: /gdpr-compliance
<GdprCompliance />
```

**GDPR Rights:**
- Right to access personal data
- Right to rectification
- Right to erasure
- Right to restrict processing
- Right to data portability
- Right to object
- Rights related to automated decision-making

#### Security
Information security practices and measures implemented by BetweenDeals.

**Features:**
- Security measures and practices
- Data encryption and protection
- Access controls and authentication
- Incident response procedures
- Security certifications
- User security responsibilities

**Usage:**
```tsx
import { Security } from '@/app/pages/company';

// Route: /security
<Security />
```

**Security Measures:**
- Data encryption in transit and at rest
- Secure authentication and authorization
- Regular security assessments
- Incident monitoring and response
- Employee security training
- Third-party security audits

## Design and User Experience

### Consistent Styling
- **Typography**: Consistent heading hierarchy and text styling
- **Layout**: Clean, readable layout with proper spacing
- **Navigation**: Easy navigation between legal pages
- **Accessibility**: Screen reader friendly and keyboard navigable

### Content Organization
- **Structured Content**: Well-organized sections with clear headings
- **Readable Format**: Proper paragraph spacing and bullet points
- **Visual Hierarchy**: Clear distinction between sections and subsections
- **Cross-References**: Links between related legal documents

## SEO and Performance

### SEO Optimization
- **Meta Tags**: Proper title, description, and keyword tags
- **Structured Data**: Schema markup for legal documents
- **Internal Linking**: Links to related pages and sections
- **Content Quality**: Comprehensive, valuable content

### Performance
- **Fast Loading**: Optimized for quick page load times
- **Mobile Responsive**: Fully responsive design
- **Accessibility**: WCAG 2.1 AA compliance
- **Search Engine Friendly**: Proper HTML structure and semantics

## Legal Compliance

### Regulatory Requirements
- **GDPR Compliance**: European data protection regulations
- **CCPA Compliance**: California consumer privacy act
- **Industry Standards**: Financial services compliance
- **International Laws**: Multi-jurisdictional compliance

### Regular Updates
- **Version Control**: Document versioning and change tracking
- **Update Notifications**: User notification of policy changes
- **Legal Review**: Regular legal review and updates
- **Compliance Monitoring**: Ongoing compliance monitoring

## Integration Points

### Navigation Integration
- **Footer Links**: Legal pages linked in site footer
- **User Account**: Legal documents accessible from user account
- **Registration Flow**: Terms acceptance during registration
- **Cookie Consent**: Cookie policy integration with consent management

### Content Management
- **CMS Integration**: Content management system integration
- **Version Control**: Document versioning and history
- **Translation Support**: Multi-language support for legal documents
- **Template System**: Consistent legal document templates

## Maintenance and Updates

### Content Updates
- **Regular Reviews**: Quarterly legal document reviews
- **Change Tracking**: Document change history and notifications
- **User Communication**: Clear communication of policy changes
- **Legal Consultation**: Regular legal consultation and updates

### Technical Maintenance
- **Link Checking**: Regular broken link checking
- **Performance Monitoring**: Page load time monitoring
- **Accessibility Testing**: Regular accessibility audits
- **SEO Monitoring**: Search engine optimization monitoring
