// 🎨 Button Examples - Caregiver Brand System
// Location: src/shared/components/buttons/ButtonExamples.tsx
// Purpose: Comprehensive examples of brand-aligned button usage

import { ArrowRight, HelpCircle, Save, Settings } from 'lucide-react';
import * as React from 'react';
import {
  Button,
  ButtonGroup,
  CTAActions,
  DangerButton,
  FormActions,
  GhostButton,
  NavigationActions,
  OutlineButton,
  PrimaryButton,
  SecondaryButton,
  SubtleButton,
  SupportiveButton,
} from './index';

/**
 * Button Examples Component
 * 
 * Demonstrates all button variants and patterns following
 * the Caregiver brand archetype guidelines
 */
export const ButtonExamples: React.FC = () => {
  const handleAction = (action: string) => {
    console.log(`Button clicked: ${action}`);
  };

  return (
    <div className="p-8 space-y-12 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Button Component Examples
        </h1>
        <p className="text-neutral-600 mb-8">
          Caregiver brand-aligned button system for warm, trustworthy UI
        </p>

        {/* Basic Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Basic Button Variants
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="primary" onClick={() => handleAction('primary')}>
              Primary
            </Button>
            <Button variant="supportive" onClick={() => handleAction('supportive')}>
              Supportive
            </Button>
            <Button variant="subtle" onClick={() => handleAction('subtle')}>
              Subtle
            </Button>
            <Button variant="secondary" onClick={() => handleAction('secondary')}>
              Secondary
            </Button>
            <Button variant="outline" onClick={() => handleAction('outline')}>
              Outline
            </Button>
            <Button variant="ghost" onClick={() => handleAction('ghost')}>
              Ghost
            </Button>
            <Button variant="light" onClick={() => handleAction('light')}>
              Light
            </Button>
            <Button variant="danger" onClick={() => handleAction('danger')}>
              Danger
            </Button>
          </div>
        </section>

        {/* Brand-Specific Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Brand-Specific Components
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PrimaryButton onClick={() => handleAction('PrimaryButton')}>
              Primary
            </PrimaryButton>
            <SupportiveButton onClick={() => handleAction('SupportiveButton')}>
              Supportive
            </SupportiveButton>
            <SubtleButton onClick={() => handleAction('SubtleButton')}>
              Subtle
            </SubtleButton>
            <SecondaryButton onClick={() => handleAction('SecondaryButton')}>
              Secondary
            </SecondaryButton>
            <OutlineButton onClick={() => handleAction('OutlineButton')}>
              Outline
            </OutlineButton>
            <GhostButton onClick={() => handleAction('GhostButton')}>
              Ghost
            </GhostButton>
            <DangerButton onClick={() => handleAction('DangerButton')}>
              Danger
            </DangerButton>
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Button Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </section>

        {/* With Icons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Buttons with Icons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PrimaryButton 
              startContent={<ArrowRight />}
              onClick={() => handleAction('with-start-icon')}
            >
              Get Started
            </PrimaryButton>
            <SupportiveButton 
              endContent={<HelpCircle />}
              onClick={() => handleAction('with-end-icon')}
            >
              Need Help?
            </SupportiveButton>
            <GhostButton 
              isIconOnly
              onClick={() => handleAction('icon-only')}
            >
              <Settings />
            </GhostButton>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Loading States
          </h2>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton loading>
              Processing...
            </PrimaryButton>
            <SupportiveButton isLoading>
              Saving...
            </SupportiveButton>
            <Button variant="outline" loading>
              Loading...
            </Button>
          </div>
        </section>

        {/* Disabled States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Disabled States
          </h2>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton disabled>
              Disabled Primary
            </PrimaryButton>
            <SupportiveButton isDisabled>
              Disabled Supportive
            </SupportiveButton>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </section>

        {/* Form Actions Pattern */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Form Actions Pattern
          </h2>
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              User Profile Form
            </h3>
            <div className="space-y-4 mb-6">
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              />
            </div>
            <FormActions
              primary={{ 
                label: "Save Changes", 
                type: "submit",
                startContent: <Save />
              }}
              secondary={{ 
                label: "Cancel", 
                onClick: () => handleAction('cancel-form')
              }}
            />
          </div>
        </section>

        {/* CTA Actions Pattern */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Call-to-Action Pattern
          </h2>
          <div className="bg-gradient-to-r from-primary-50 to-calm-50 p-8 rounded-xl border border-primary-200">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              Ready to Sell Your Business?
            </h3>
            <p className="text-neutral-600 mb-6">
              Get started with our trusted platform and expert guidance.
            </p>
            <CTAActions
              primary={{ 
                label: "Start Your Sale", 
                size: "lg",
                onClick: () => handleAction('start-sale')
              }}
              supportive={{ 
                label: "Get Free Valuation", 
                size: "lg",
                onClick: () => handleAction('get-valuation')
              }}
            />
          </div>
        </section>

        {/* Navigation Actions Pattern */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Navigation Actions Pattern
          </h2>
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Onboarding Step 2 of 5
            </h3>
            <p className="text-neutral-600 mb-6">
              Please provide your business information to continue.
            </p>
            <NavigationActions
              continue={{ 
                label: "Continue", 
                onClick: () => handleAction('continue-onboarding')
              }}
              back={{ 
                label: "Back", 
                onClick: () => handleAction('back-onboarding')
              }}
            />
          </div>
        </section>

        {/* Button Groups */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Button Groups
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Horizontal</h4>
              <ButtonGroup layout="horizontal" spacing="normal">
                <PrimaryButton>Save</PrimaryButton>
                <OutlineButton>Cancel</OutlineButton>
                <GhostButton>Reset</GhostButton>
              </ButtonGroup>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Vertical</h4>
              <ButtonGroup layout="vertical" spacing="normal">
                <PrimaryButton>Primary Action</PrimaryButton>
                <SupportiveButton>Supportive Action</SupportiveButton>
                <OutlineButton>Secondary Action</OutlineButton>
              </ButtonGroup>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Stacked</h4>
              <ButtonGroup layout="stacked" spacing="tight">
                <PrimaryButton fullWidth>Full Width Primary</PrimaryButton>
                <OutlineButton fullWidth>Full Width Secondary</OutlineButton>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* Full Width Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Full Width Buttons
          </h2>
          <div className="space-y-4">
            <PrimaryButton fullWidth>
              Complete Setup
            </PrimaryButton>
            <SupportiveButton fullWidth>
              Get Expert Help
            </SupportiveButton>
            <OutlineButton fullWidth>
              Explore Options
            </OutlineButton>
          </div>
        </section>

        {/* Brand Psychology Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Brand Psychology Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Trust Building (Primary)
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Use for main actions that build confidence and trust
              </p>
              <PrimaryButton>
                Start Your Business Sale
              </PrimaryButton>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Anxiety Reduction (Supportive)
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Use for "we're here to help" messaging
              </p>
              <SupportiveButton>
                We've Got You Covered
              </SupportiveButton>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Gentle Encouragement (Subtle)
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Use for gentle emphasis without pressure
              </p>
              <SubtleButton>
                Learn More
              </SubtleButton>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Professional (Secondary)
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Use for professional, non-threatening actions
              </p>
              <SecondaryButton>
                View Documentation
              </SecondaryButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonExamples;
