// 🏢 Business Details Step - Listing Wizard
// Location: src/features/phase1/business/wizard/steps/BusinessDetailsStep.tsx
// Purpose: Step 3 - Business story and details

import { AnimatedTextarea } from '@/shared/components/forms';
import { BarChart3 } from 'lucide-react';
import React from 'react';
import { BusinessDetails } from '../types';

// NOTE: This is a legacy step that will be replaced. Using type assertions for compatibility.
const BusinessDetailsStep: React.FC<any> = ({ data, onDataChange }) => {
  const businessDetails = (data as any).businessDetails || ({} as BusinessDetails);

  const handleInputChange = (field: keyof BusinessDetails, value: string) => {
    onDataChange({
      businessDetails: {
        ...businessDetails,
        [field]: value,
      },
    } as any);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <BarChart3 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Tell Your Business Story</h2>
        <p className="text-neutral-600">
          Help potential buyers understand what makes your business special
        </p>
      </div>

      {/* Helpful guidance box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Helpful guidance</h3>
            <p className="text-sm text-blue-700">
              Be specific and detailed. Buyers want to understand your business model, competitive
              advantages, and growth potential. Include concrete examples and metrics where
              possible.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatedTextarea
          label="What does your business do? (Products & Services)"
          placeholder="Describe your core products or services. For example: 'We provide cloud-based CRM software for small businesses, with features including lead management, sales tracking, and customer analytics. Our platform serves over 500 active customers and processes 10,000+ leads monthly.'"
          value={businessDetails.key_products || ''}
          onChange={e => handleInputChange('key_products', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="key_products"
        />

        <AnimatedTextarea
          label="Who are your customers? (Target Market)"
          placeholder="Define your target market and customer segments. For example: 'Our primary customers are small to medium-sized businesses (10-100 employees) in the professional services sector, including law firms, accounting practices, and consulting companies. We also serve growing startups in the technology sector.'"
          value={businessDetails.target_market || ''}
          onChange={e => handleInputChange('target_market', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="target_market"
        />

        <AnimatedTextarea
          label="What makes you different? (Competitive Advantage)"
          placeholder="Explain your unique value proposition and competitive advantages. For example: 'Our proprietary AI-powered lead scoring algorithm increases conversion rates by 40% compared to traditional CRM systems. We have exclusive partnerships with three major industry associations and hold two patents for our core technology.'"
          value={businessDetails.competitive_advantage || ''}
          onChange={e => handleInputChange('competitive_advantage', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="competitive_advantage"
        />

        <AnimatedTextarea
          label="What's the growth potential? (Growth Opportunities)"
          placeholder="Describe untapped opportunities and growth potential. For example: 'We have identified three key expansion opportunities: 1) International markets (currently 95% domestic), 2) Enterprise segment (currently focused on SMBs), 3) Mobile app development (currently web-only). Market research shows 300% growth potential in these areas.'"
          value={businessDetails.growth_opportunities || ''}
          onChange={e => handleInputChange('growth_opportunities', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="growth_opportunities"
        />

        <AnimatedTextarea
          label="What assets do you have? (Key Assets)"
          placeholder="List your key business assets. For example: 'Intellectual property: 2 patents, 3 trademarks, proprietary software code. Physical assets: Office equipment, inventory worth €50,000. Intangible assets: Customer database (2,500 contacts), brand recognition, established supplier relationships.'"
          value={businessDetails.key_assets || ''}
          onChange={e => handleInputChange('key_assets', e.target.value)}
          minRows={3}
          onBlur={() => {}}
          name="key_assets"
        />

        <AnimatedTextarea
          label="How do you operate? (Operational Highlights)"
          placeholder="Describe your operational model and key processes. For example: 'We operate a lean, remote-first team of 8 employees across 4 countries. Our development follows agile methodology with 2-week sprints. Customer support is provided 24/7 through our helpdesk system. We use automated deployment pipelines and have 99.9% uptime.'"
          value={businessDetails.operational_highlights || ''}
          onChange={e => handleInputChange('operational_highlights', e.target.value)}
          minRows={3}
          onBlur={() => {}}
          name="operational_highlights"
        />
      </div>
    </div>
  );
};

export default BusinessDetailsStep;
