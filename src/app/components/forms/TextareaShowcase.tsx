import React, { useState } from 'react';
import { Textarea, Button } from '@heroui/react';
import { FormField } from '../common';

/**
 * Textarea Showcase Component
 *
 * Demonstrates the beautiful, redesigned textarea component with all its states.
 * Shows the professional design with clear selected/unselected states.
 */
const TextareaShowcase: React.FC = () => {
  const [businessDescription, setBusinessDescription] = useState('');
  const [projectDetails, setProjectDetails] = useState('Sample text to show filled state...');
  const [feedback, setFeedback] = useState('');
  const [showError, setShowError] = useState(false);

  return (
    <div className="professional-form max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Beautiful Textarea Design</h2>
        <p className="text-lg text-slate-600">
          Redesigned textarea components with clear states and professional styling
        </p>
      </div>

      <div className="space-y-8">
        {/* Default State Example */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Default State</h3>
          <FormField
            label="Business Description"
            required
            helpText="Describe your business, its history, and what makes it unique"
          >
            <Textarea
              placeholder="Describe your business, its history, and what makes it unique..."
              value={businessDescription}
              onValueChange={setBusinessDescription}
              variant="bordered"
              minRows={4}
            />
          </FormField>
        </div>

        {/* Filled State Example */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Filled State</h3>
          <FormField
            label="Project Details"
            required
            helpText="This textarea contains text to demonstrate the filled state"
          >
            <Textarea
              placeholder="Enter project details..."
              value={projectDetails}
              onValueChange={setProjectDetails}
              variant="bordered"
              minRows={4}
            />
          </FormField>
        </div>

        {/* Error State Example */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Error State</h3>
          <FormField
            label="Feedback"
            required
            error={
              showError
                ? 'This field is required and must be at least 10 characters long'
                : undefined
            }
            helpText="Provide detailed feedback about your experience"
          >
            <Textarea
              placeholder="Share your feedback..."
              value={feedback}
              onValueChange={setFeedback}
              variant="bordered"
              minRows={4}
              isInvalid={showError}
            />
          </FormField>
          <Button
            size="sm"
            variant="bordered"
            onPress={() => setShowError(!showError)}
            className="mt-4 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {showError ? 'Hide Error' : 'Show Error State'}
          </Button>
        </div>

        {/* Disabled State Example */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Disabled State</h3>
          <FormField
            label="Archived Message"
            helpText="This field is disabled and cannot be edited"
          >
            <Textarea
              placeholder="This textarea is disabled..."
              value="This is a disabled textarea that cannot be edited."
              variant="bordered"
              minRows={3}
              isDisabled
            />
          </FormField>
        </div>

        {/* Large Textarea Example */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Large Format</h3>
          <FormField
            label="Detailed Business Plan"
            required
            helpText="Provide a comprehensive overview of your business strategy, market analysis, and growth plans"
          >
            <Textarea
              placeholder="Enter your detailed business plan here. Include market analysis, competitive landscape, revenue model, growth strategy, team overview, financial projections, and any other relevant information that would help investors understand your business..."
              value=""
              onValueChange={() => {}}
              variant="bordered"
              minRows={6}
            />
          </FormField>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">✨ Design Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Beautiful Label Design</p>
              <p className="text-sm text-slate-600">
                Gradient header with clear typography hierarchy
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Professional Interactions</p>
              <p className="text-sm text-slate-600">
                Smooth hover and focus states with animations
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Clear State Indicators</p>
              <p className="text-sm text-slate-600">
                Obvious visual feedback for all interaction states
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-slate-900">Mobile Optimized</p>
              <p className="text-sm text-slate-600">
                Touch-friendly design with iOS zoom prevention
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextareaShowcase;
