import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Divider,
  Switch,
} from '@heroui/react';
import { Field, Form } from 'react-final-form';
import { AnimatedInput, AnimatedTextarea } from './index';
import { User, Mail, Building2, Euro, Phone } from 'lucide-react';

/**
 * Demo component showing how to use the AnimatedInput and AnimatedTextarea components
 * This showcases both standalone usage and react-final-form integration
 */

interface StandaloneFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  phone: string;
  budget: string;
}

interface ReactFinalFormData {
  contactName: string;
  contactEmail: string;
  businessTitle: string;
  description: string;
  website: string;
}

const FormExamples: React.FC = () => {
  // State for standalone form
  const [standaloneData, setStandaloneData] = useState<StandaloneFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    phone: '',
    budget: '',
  });

  const [showBothForms, setShowBothForms] = useState(true);

  // Standalone form handlers
  const handleStandaloneChange = (field: keyof StandaloneFormData) => (value: string) => {
    setStandaloneData(prev => ({ ...prev, [field]: value }));
  };

  const handleStandaloneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Standalone form submitted:', standaloneData);
    alert('Standalone form submitted! Check console for data.');
  };

  // React Final Form handlers
  const handleReactFinalFormSubmit = (values: ReactFinalFormData) => {
    console.log('React Final Form submitted:', values);
    alert('React Final Form submitted! Check console for data.');
  };

  const validateReactFinalForm = (values: ReactFinalFormData) => {
    const errors: Partial<ReactFinalFormData> = {};
    if (!values.contactName) errors.contactName = 'Name is required';
    if (!values.contactEmail) errors.contactEmail = 'Email is required';
    if (!values.businessTitle) errors.businessTitle = 'Business title is required';
    return errors;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Animated Form Components Demo</h1>
        <p className="text-lg text-neutral-600 mb-6">
          Consistent animated input styling inspired by sign-up modal design
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm">Show both forms:</span>
          <Switch isSelected={showBothForms} onValueChange={setShowBothForms} color="primary" />
        </div>
      </div>

      <div className={`grid ${showBothForms ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>
        {/* Standalone Form */}
        <Card className="border border-neutral-200">
          <CardHeader>
            <h2 className="text-xl font-semibold text-neutral-900">Standalone Usage</h2>
            <p className="text-sm text-neutral-600">Direct component usage with state management</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleStandaloneSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedInput
                  label="Full Name"
                  placeholder="Enter your name"
                  value={standaloneData.name}
                  onChange={handleStandaloneChange('name')}
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  required
                  name="name"
                />

                <AnimatedInput
                  label="Email Address"
                  type="email"
                  placeholder="your.email@company.com"
                  value={standaloneData.email}
                  onChange={handleStandaloneChange('email')}
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  required
                  name="email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedInput
                  label="Company"
                  placeholder="Your company name"
                  value={standaloneData.company}
                  onChange={handleStandaloneChange('company')}
                  startContent={<Building2 className="w-4 h-4 text-gray-400" />}
                  name="company"
                />

                <AnimatedInput
                  label="Phone Number"
                  type="tel"
                  placeholder="+32 123 456 789"
                  value={standaloneData.phone}
                  onChange={handleStandaloneChange('phone')}
                  startContent={<Phone className="w-4 h-4 text-gray-400" />}
                  name="phone"
                />
              </div>

              <AnimatedInput
                label="Investment Budget"
                type="number"
                placeholder="Enter budget amount"
                value={standaloneData.budget}
                onChange={handleStandaloneChange('budget')}
                startContent={<Euro className="w-4 h-4 text-gray-400" />}
                endContent={<span className="text-foreground-400">EUR</span>}
                name="budget"
              />

              <AnimatedTextarea
                variant="standalone"
                label="Message"
                placeholder="Tell us about your requirements..."
                value={standaloneData.message}
                onChange={handleStandaloneChange('message')}
                minRows={4}
                maxRows={8}
                description="Provide details about what you're looking for"
                name="message"
              />

              <Button type="submit" color="primary" size="lg" className="w-full">
                Submit Standalone Form
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* React Final Form */}
        {showBothForms && (
          <Card className="border border-neutral-200">
            <CardHeader>
              <h2 className="text-xl font-semibold text-neutral-900">
                React Final Form Integration
              </h2>
              <p className="text-sm text-neutral-600">
                Integration with react-final-form validation
              </p>
            </CardHeader>
            <CardBody>
              <Form
                onSubmit={handleReactFinalFormSubmit}
                validate={validateReactFinalForm}
                render={({ handleSubmit, submitting, form }) => (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field
                        name="contactName"
                        render={props => (
                          <AnimatedInput
                            {...props}
                            label="Contact Name"
                            placeholder="Enter contact name"
                            startContent={<User className="w-4 h-4 text-gray-400" />}
                            required
                          />
                        )}
                      />

                      <Field
                        name="contactEmail"
                        render={props => (
                          <AnimatedInput
                            {...props}
                            label="Contact Email"
                            type="email"
                            placeholder="contact@company.com"
                            startContent={<Mail className="w-4 h-4 text-gray-400" />}
                            required
                          />
                        )}
                      />
                    </div>

                    <Field
                      name="businessTitle"
                      render={props => (
                        <AnimatedInput
                          {...props}
                          label="Business Title"
                          placeholder="Enter business title"
                          description="This will be the main title for your listing"
                          required
                        />
                      )}
                    />

                    <Field
                      name="website"
                      render={props => (
                        <AnimatedInput
                          {...props}
                          label="Website URL"
                          type="url"
                          placeholder="https://yourwebsite.com"
                        />
                      )}
                    />

                    <Field
                      name="description"
                      render={props => (
                        <AnimatedTextarea
                          variant="react-final-form"
                          {...props}
                          label="Business Description"
                          placeholder="Describe your business in detail..."
                          minRows={4}
                          description="Provide a comprehensive overview of your business"
                        />
                      )}
                    />

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={submitting}
                        className="flex-1"
                      >
                        Submit React Final Form
                      </Button>
                      <Button
                        type="button"
                        variant="bordered"
                        size="lg"
                        onPress={() => form.reset()}
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                )}
              />
            </CardBody>
          </Card>
        )}
      </div>

      {/* Usage Examples */}
      <Card className="border border-neutral-200">
        <CardHeader>
          <h2 className="text-xl font-semibold text-neutral-900">Usage Examples</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Standalone Usage</h3>
              <pre className="bg-neutral-100 p-4 rounded-lg text-sm overflow-x-auto">
                {`<AnimatedInput
  
  label="Business Title"
  placeholder="Enter title"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  required
  name="title"
  startContent={<Icon />}
  endContent={<Suffix />}
/>`}
              </pre>
            </div>

            <Divider />

            <div>
              <h3 className="text-lg font-medium mb-3">React Final Form Usage</h3>
              <pre className="bg-neutral-100 p-4 rounded-lg text-sm overflow-x-auto">
                {`<Field
  name="title"
  render={(props) => (
    <AnimatedInput
      
      {...props}
      label="Business Title"
      placeholder="Enter title"
      required
    />
  )}
/>`}
              </pre>
            </div>

            <Divider />

            <div>
              <h3 className="text-lg font-medium mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>
                  • <strong>Animated Labels:</strong> Labels smoothly animate up/down and scale when
                  focused or filled
                </li>
                <li>
                  • <strong>Consistent Styling:</strong> Matches the sign-up modal design across all
                  forms
                </li>
                <li>
                  • <strong>Flexible Usage:</strong> Works with or without react-final-form
                </li>
                <li>
                  • <strong>Built-in Password Toggle:</strong> Automatic eye icon for password
                  fields
                </li>
                <li>
                  • <strong>Error Handling:</strong> Displays validation errors with appropriate
                  styling
                </li>
                <li>
                  • <strong>Start/End Content:</strong> Support for icons, currency symbols, etc.
                </li>
                <li>
                  • <strong>Accessibility:</strong> Proper ARIA labels and keyboard navigation
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FormExamples;
