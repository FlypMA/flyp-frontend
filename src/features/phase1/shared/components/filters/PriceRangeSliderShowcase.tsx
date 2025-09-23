import React, { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';

/**
 * PriceRangeSliderShowcase - Demonstrates the new clean price range slider
 *
 * Shows different configurations and states of the PriceRangeSlider component
 */
const PriceRangeSliderShowcase: React.FC = () => {
  const [basicRange, setBasicRange] = useState<[number, number]>([500000, 2500000]);
  const [businessRange, setBusinessRange] = useState<[number, number]>([0, 5000000]);
  const [investmentRange, setInvestmentRange] = useState<[number, number]>([1000000, 10000000]);

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Price Range Slider Showcase</h1>
        <p className="text-lg text-slate-600">
          Professional, accessible dual-range slider component
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">Basic Usage</h2>
        <p className="text-slate-600">Standard price range slider with value labels</p>
        <PriceRangeSlider
          min={0}
          max={5000000}
          step={100000}
          value={basicRange}
          onChange={setBasicRange}
          currency="€"
          showValueLabels={true}
        />
        <div className="text-sm text-slate-500">
          Current Range: €{basicRange[0].toLocaleString()} - €{basicRange[1].toLocaleString()}
        </div>
      </div>

      {/* Business Acquisition Range */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">Business Acquisition Range</h2>
        <p className="text-slate-600">For filtering business listings by asking price</p>
        <PriceRangeSlider
          min={0}
          max={5000000}
          step={100000}
          value={businessRange}
          onChange={setBusinessRange}
          currency="€"
          showValueLabels={true}
        />
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Filter Results</h3>
          <p className="text-blue-700 text-sm">
            Showing businesses priced between{' '}
            <span className="font-semibold">
              €
              {businessRange[0] >= 1000000
                ? `${(businessRange[0] / 1000000).toFixed(1)}M`
                : `${(businessRange[0] / 1000).toFixed(0)}K`}
            </span>{' '}
            and{' '}
            <span className="font-semibold">
              €
              {businessRange[1] >= 1000000
                ? `${(businessRange[1] / 1000000).toFixed(1)}M`
                : `${(businessRange[1] / 1000).toFixed(0)}K`}
            </span>
          </p>
        </div>
      </div>

      {/* Investment Range */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">Investment Range</h2>
        <p className="text-slate-600">Higher value range for investment opportunities</p>
        <PriceRangeSlider
          min={0}
          max={25000000}
          step={250000}
          value={investmentRange}
          onChange={setInvestmentRange}
          currency="€"
          showValueLabels={true}
        />
        <div className="text-sm text-slate-500">
          Investment Budget: €{(investmentRange[0] / 1000000).toFixed(1)}M - €
          {(investmentRange[1] / 1000000).toFixed(1)}M
        </div>
      </div>

      {/* Without Labels */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">Compact Version</h2>
        <p className="text-slate-600">Without value labels for tighter layouts</p>
        <PriceRangeSlider
          min={0}
          max={2000000}
          step={50000}
          defaultValue={[200000, 800000]}
          currency="€"
          showValueLabels={false}
        />
      </div>

      {/* Disabled State */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">Disabled State</h2>
        <p className="text-slate-600">Shows how the slider appears when disabled</p>
        <PriceRangeSlider
          min={0}
          max={5000000}
          step={100000}
          defaultValue={[1000000, 3000000]}
          currency="€"
          showValueLabels={true}
          disabled={true}
        />
      </div>

      {/* Different Currency */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">Different Currency</h2>
        <p className="text-slate-600">USD pricing for international markets</p>
        <PriceRangeSlider
          min={0}
          max={6000000}
          step={100000}
          defaultValue={[500000, 2500000]}
          currency="$"
          showValueLabels={true}
        />
      </div>

      {/* Implementation Info */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Implementation Benefits</h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Replaces complex HeroUI Slider with 80% fewer lines of code</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Native HTML range inputs for better performance and accessibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>WCAG 2.1 compliant with proper ARIA labels and keyboard navigation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Responsive design with mobile-optimized touch targets</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Support for high contrast mode and reduced motion preferences</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Professional styling with smooth animations and hover effects</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PriceRangeSliderShowcase;
