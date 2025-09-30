# 🗺️ Current Sitemap Analysis - Upswitch Frontend

**Analysis Date**: September 30, 2025  
**Prepared By**: CTO  
**Purpose**: Document current public sitemap and identify improvement opportunities

---

## 📊 Current Public Navigation Structure

### **Desktop Top Navigation**

```
Logo | How to Sell | Browse Businesses | Free Valuation | [Login] [Sign Up]
```

**Current Items**:

1. **How to Sell** → `/for-sellers`
2. **Browse Businesses** → `/search`
3. **Free Valuation** → `/resources/valuation-guide`

**Auth Actions**:

- Login (opens modal)
- Sign Up (opens modal)

---

### **Mobile Navigation**

**Current Sections**:

**Discover**

- Home → `/`
- Browse Businesses → `/search`
- How to Sell → `/for-sellers`

**Resources**

- Free Valuation → `/resources/valuation-guide`

---

### **Current Footer Structure**

```
┌─────────────────────────────────────────────────────────────┐
│  Brand Section    │  Platform  │  Resources  │  Company     │
│                   │           │             │              │
│  [Logo]           │  For       │  Valuation  │  About Us    │
│  Upswitch         │  Sellers   │  Guide      │  Contact     │
│                   │           │             │              │
│  European M&A     │  For       │  Due        │  Email       │
│  Platform         │  Buyers    │  Diligence  │  Location    │
│                   │           │             │              │
│  Trust Badges     │           │             │              │
├─────────────────────────────────────────────────────────────┤
│  Privacy | Terms | Cookie Policy | GDPR | Security         │
├─────────────────────────────────────────────────────────────┤
│  © 2025 Upswitch  │  Licensed M&A Platform • VAT Info      │
└─────────────────────────────────────────────────────────────┘
```

**Columns**:

1. **Brand** (col-span-1)
   - Logo + tagline
   - Description
   - Trust badges

2. **Platform** (col-span-1)
   - For Sellers
   - For Buyers

3. **Resources** (col-span-1)
   - Valuation Guide
   - Due Diligence Checklist

4. **Company** (col-span-1)
   - About Us
   - Contact
   - Email
   - Location

**Legal Bar**:

- Privacy Policy
- Terms of Service
- Cookie Policy
- GDPR Compliance
- Security

---

## 🎯 Current User Journeys

### **Seller Journey**

```
Homepage → How to Sell → Free Valuation → Sign Up → Dashboard
```

### **Buyer Journey**

```
Homepage → Browse Businesses → Listing Details → Sign Up → Messages
```

### **Research Journey**

```
Homepage → Resources → Guides → About → Contact
```

---

## 📉 Current Gaps & Issues

### **Navigation Issues**

1. **Limited Main Navigation**
   - Only 3 items in main nav
   - No "About", "Contact", "Help" in top nav
   - No pricing/plans visibility
   - No blog/resources section

2. **Unclear Value Proposition**
   - "How to Sell" is seller-specific
   - "Browse Businesses" is buyer-specific
   - No clear dual-audience homepage CTA

3. **Missing Key Pages**
   - No pricing page
   - No testimonials/case studies standalone page
   - No blog/resources hub
   - No security/trust center

4. **Footer Issues**
   - Missing social media links
   - No newsletter signup
   - Missing investor/partner links
   - No careers page

---

## 🔍 Available Pages (Not in Navigation)

These pages exist but are not easily discoverable:

**Public Pages**:

- `/about` - About page ✓
- `/contact` - Contact page ✓
- `/help` - Help center ✓
- `/faq` - FAQ page ✓
- `/resources/due-diligence` - Due diligence checklist ✓

**Variation Pages** (Design Exploration):

- Homepage variations (A/B/C)
- Seller landing variations (A/B/C)
- Valuation variations (A/B/C)

---

## 📊 Competitive Benchmark

### **Airbnb** (Reference)

```
Top Nav: Places to stay | Experiences | Online Experiences
Footer: Support | Community | Hosting | About
```

### **Fiverr** (Reference)

```
Top Nav: Fiverr Business | Explore | English | Sign In | Join
Footer: Categories | About | Support | Community | More From Fiverr
```

### **Typeform** (Reference)

```
Top Nav: Product | Templates | Resources | Pricing | Enterprise
Footer: Product | Templates | Resources | Help | Community | Policies
```

---

## 🎯 Strategic Recommendations Preview

Based on this analysis, the following improvements are needed:

1. **Expand main navigation** to include 5-7 core pages
2. **Add secondary navigation** for resources, company info
3. **Restructure footer** to include more pages and social links
4. **Add missing pages**: Pricing, How It Works, Security/Trust
5. **Improve discoverability** of Help, FAQ, Resources
6. **Add engagement features**: Newsletter, blog, testimonials

See `SITEMAP_RECOMMENDATIONS.md` for detailed variations.

---

**Next Steps**: Review sitemap variations and select preferred approach.
