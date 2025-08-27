import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Card,
  CardBody,
  Divider,
} from '@heroui/react';
import { Input, Textarea } from '../ui';
import { Shield, FileText, User, Building2, AlertTriangle } from 'lucide-react';

interface NDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (signatureData: SignatureData) => void;
  listingTitle: string;
  sellerName: string;
  isLoading?: boolean;
}

interface SignatureData {
  fullName: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  digitalSignature: string;
  acceptedTerms: boolean;
  acceptedDate: string;
  ipAddress?: string;
}

const NDAModal: React.FC<NDAModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  listingTitle,
  sellerName,
  isLoading = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    digitalSignature: '',
    acceptedTerms: false,
    acceptedDate: new Date().toISOString(),
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAccept(signatureData);
    }
  };

  const validateForm = () => {
    const { fullName, company, email, digitalSignature, acceptedTerms } = signatureData;
    return fullName && company && email && digitalSignature && acceptedTerms;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card className="border-yellow-200 bg-yellow-50">
        <CardBody>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Confidential Information</h4>
              <p className="text-sm text-yellow-700">
                This listing contains confidential business information that requires a signed
                Non-Disclosure Agreement (NDA) before access can be granted.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">NDA Requirements</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium">Confidentiality Protection</p>
              <p className="text-sm text-gray-600">
                All shared information must remain confidential
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <FileText className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium">Limited Use</p>
              <p className="text-sm text-gray-600">Information only for evaluation purposes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <User className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium">Identity Verification</p>
              <p className="text-sm text-gray-600">Your identity will be verified by the seller</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Listing Details</h4>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Business:</strong> {listingTitle}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Seller:</strong> {sellerName}
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Your Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="Enter your full legal name"
          value={signatureData.fullName}
          onChange={value => setSignatureData(prev => ({ ...prev, fullName: value }))}
          startContent={<User className="w-4 h-4 text-gray-400" />}
          required
          name="fullName"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@company.com"
          value={signatureData.email}
          onChange={value => setSignatureData(prev => ({ ...prev, email: value }))}
          required
          name="email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company/Organization"
          placeholder="Your company name"
          value={signatureData.company}
          onChange={value => setSignatureData(prev => ({ ...prev, company: value }))}
          startContent={<Building2 className="w-4 h-4 text-gray-400" />}
          required
          name="company"
        />

        <Input
          label="Position/Title"
          placeholder="Your job title"
          value={signatureData.position}
          onChange={value => setSignatureData(prev => ({ ...prev, position: value }))}
          name="position"
        />
      </div>

      <Input
        label="Phone Number"
        placeholder="+32 123 456 789"
        value={signatureData.phone}
        onChange={value => setSignatureData(prev => ({ ...prev, phone: value }))}
        name="phone"
        type="tel"
      />

      <Card className="border-blue-200 bg-blue-50">
        <CardBody>
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> This information will be shared with the seller to verify your
            identity and investment capacity. All information is handled in accordance with GDPR.
          </p>
        </CardBody>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Digital Signature & Agreement</h3>

      <div className="border rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-50">
        <h4 className="font-semibold mb-3">Non-Disclosure Agreement Terms</h4>
        <div className="text-sm text-gray-700 space-y-3">
          <p>
            <strong>1. Definition of Confidential Information:</strong> All business information,
            financial data, customer lists, trade secrets, and any other proprietary information
            disclosed in relation to this business opportunity.
          </p>
          <p>
            <strong>2. Obligations:</strong> You agree to keep all confidential information strictly
            confidential and not disclose it to any third parties without written consent.
          </p>
          <p>
            <strong>3. Purpose:</strong> Information is provided solely for evaluation of the
            business opportunity and potential acquisition discussions.
          </p>
          <p>
            <strong>4. Duration:</strong> This agreement remains in effect for 5 years from the date
            of signing or until the information becomes public knowledge.
          </p>
          <p>
            <strong>5. Return of Information:</strong> All materials must be returned or destroyed
            upon request or termination of discussions.
          </p>
          <p>
            <strong>6. Legal Jurisdiction:</strong> This agreement is governed by Belgian law and
            subject to the jurisdiction of Belgian courts.
          </p>
        </div>
      </div>

      <Textarea
        label="Digital Signature"
        placeholder="Type your full name as digital signature"
        value={signatureData.digitalSignature}
        onChange={value => setSignatureData(prev => ({ ...prev, digitalSignature: value }))}
        description="By typing your name, you confirm this serves as your digital signature"
        required
        name="digitalSignature"
        minRows={2}
        maxRows={3}
      />

      <div className="space-y-3">
        <Checkbox
          isSelected={signatureData.acceptedTerms}
          onValueChange={checked => setSignatureData(prev => ({ ...prev, acceptedTerms: checked }))}
        >
          I agree to the terms and conditions of this Non-Disclosure Agreement
        </Checkbox>

        <p className="text-xs text-gray-600">
          Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()} | IP
          will be recorded for verification
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="2xl"
      scrollBehavior="inside"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Non-Disclosure Agreement</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Step {currentStep} of 3</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map(step => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${
                        step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </ModalHeader>

            <ModalBody>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} isDisabled={isLoading}>
                Cancel
              </Button>

              {currentStep > 1 && (
                <Button color="default" variant="flat" onPress={handleBack} isDisabled={isLoading}>
                  Back
                </Button>
              )}

              {currentStep < 3 ? (
                <Button color="primary" onPress={handleNext} isDisabled={isLoading}>
                  Next
                </Button>
              ) : (
                <Button
                  color="success"
                  onPress={handleSubmit}
                  isDisabled={!validateForm() || isLoading}
                  isLoading={isLoading}
                >
                  Sign NDA & Continue
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NDAModal;
