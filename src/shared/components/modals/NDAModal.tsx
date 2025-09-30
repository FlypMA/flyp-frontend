import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { AlertTriangle, FileText, Shield, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../buttons/Button';
import { AnimatedTextarea, Input } from '../forms';

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
    const { fullName, company, email, digitalSignature } = signatureData;
    return fullName && company && email && digitalSignature;
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
            <Shield className="w-5 h-5 text-primary-600" />
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
          onChange={e => setSignatureData(prev => ({ ...prev, fullName: e.target.value }))}
          required
          name="fullName"
          type="text"
          onBlur={() => {}}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@company.com"
          value={signatureData.email}
          onChange={e => setSignatureData(prev => ({ ...prev, email: e.target.value }))}
          required
          name="email"
          onBlur={() => {}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company/Organization"
          placeholder="Your company name"
          value={signatureData.company}
          onChange={e => setSignatureData(prev => ({ ...prev, company: e.target.value }))}
          required
          name="company"
          type="text"
          onBlur={() => {}}
        />

        <Input
          label="Position/Title"
          placeholder="Your job title"
          value={signatureData.position}
          onChange={e => setSignatureData(prev => ({ ...prev, position: e.target.value }))}
          name="position"
          type="text"
          onBlur={() => {}}
        />
      </div>

      <Input
        label="Phone Number"
        placeholder="+32 123 456 789"
        value={signatureData.phone}
        onChange={e => setSignatureData(prev => ({ ...prev, phone: e.target.value }))}
        name="phone"
        type="tel"
        onBlur={() => {}}
      />

      <Card className="border-primary-200 bg-primary-50">
        <CardBody>
          <p className="text-sm text-primary-700">
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

      <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50">
        <h4 className="font-semibold mb-4">NON-DISCLOSURE AGREEMENT</h4>

        <div className="text-sm text-gray-700 space-y-4">
          {/* Parties Section */}
          <div>
            <h5 className="font-semibold mb-2">THE UNDERSIGNED:</h5>
            <p className="mb-2">
              <strong>Discloser:</strong> {sellerName} (the "Discloser")
            </p>
            <p className="mb-2">
              <strong>Recipient:</strong> {signatureData.fullName || '[Your Name]'} of{' '}
              {signatureData.company || '[Your Company]'} (the "Recipient")
            </p>
            <p className="text-xs text-gray-600 italic">
              Hereinafter jointly referred to as "Parties" and individually as a "Party"
            </p>
          </div>

          {/* Article 1: Confidentiality Obligation */}
          <div>
            <h5 className="font-semibold mb-2">Article 1. Confidentiality Obligation</h5>
            <p className="mb-2">
              <strong>1.1 Definition of Confidential Information:</strong> All information relating
              to this Agreement and the Discloser, including but not limited to activities, plans,
              technology, technical information, inventions, methods, processes, specifications,
              features, raw data, registers, databases, equipment, know-how, experience and trade
              secrets, marketing, sales, customers, suppliers, consultants, relationships and
              development information, operational, performance and cost information, computer
              programming techniques in both material and immaterial form, codes (including source
              codes) and all media or disclosures of the above information and techniques, including
              written business plans, patents and patent applications, subsidy applications, notes
              and memoranda as well as 'trade secrets' within the meaning of the Trade Secrets
              Protection Act, whether written or oral, stored or maintained electronically.
            </p>
            <p className="mb-2">
              <strong>1.2 Confidentiality:</strong> The Recipient will treat all Confidential
              Information received from the Discloser as strictly confidential and will not disclose
              or make available to third parties.
            </p>
            <p className="mb-2">
              <strong>1.3 Ownership:</strong> All Confidential Information remains the exclusive
              property of the Discloser. The Recipient is only entitled to disclose Confidential
              Information to its personnel insofar as this is necessary for the realization of the
              business opportunity evaluation.
            </p>
          </div>

          {/* Article 2: Exceptions */}
          <div>
            <h5 className="font-semibold mb-2">Article 2. Exceptions to Confidentiality</h5>
            <p className="mb-2">
              The Recipient is not obliged to maintain confidentiality of Confidential Information
              if and to the extent that the information:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>is publicly known, unless this is the result of a breach by the Recipient</li>
              <li>has been made public by the Discloser</li>
              <li>
                has been independently developed by the Recipient without breach of this Agreement
              </li>
              <li>has been released by the Discloser with written consent</li>
              <li>must be disclosed by law or court order</li>
            </ul>
          </div>

          {/* Article 3: Use and Return */}
          <div>
            <h5 className="font-semibold mb-2">Article 3. Use and Return of Information</h5>
            <p className="mb-2">
              <strong>3.1 Purpose:</strong> The Recipient will only use Confidential Information for
              evaluation of the business opportunity and potential acquisition discussions.
            </p>
            <p className="mb-2">
              <strong>3.2 Return:</strong> Upon termination of this Agreement, the Recipient will
              destroy all Confidential Information (to the extent technically feasible), except
              where required to be retained by law.
            </p>
          </div>

          {/* Article 4: Non-Solicitation */}
          <div>
            <h5 className="font-semibold mb-2">Article 4. Non-Solicitation</h5>
            <p className="mb-2">
              During the term of this Agreement and for one (1) year after termination, neither
              Party will:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>directly or indirectly solicit customers and/or relations of the other Party</li>
              <li>approach or request customers/relations to withdraw from the other Party</li>
              <li>
                induce employees, service providers or suppliers to modify or terminate their
                agreements with the other Party
              </li>
            </ul>
          </div>

          {/* Article 5: Liability and Penalties */}
          <div>
            <h5 className="font-semibold mb-2">Article 5. Liability and Penalty Clause</h5>
            <p className="mb-2">
              <strong>5.1 Liability:</strong> In case the Recipient acts in violation of this
              Agreement, the Recipient is liable to the Discloser for all damage suffered as a
              result of this breach.
            </p>
            <p className="mb-2">
              <strong>5.2 Penalty:</strong> In case of violation, the Recipient is immediately
              liable for a penalty of EUR 50,000 (fifty thousand euros) per violation, without
              prejudice to the right to claim damages.
            </p>
          </div>

          {/* Article 6: Duration and Termination */}
          <div>
            <h5 className="font-semibold mb-2">Article 6. Duration and Termination</h5>
            <p className="mb-2">
              <strong>6.1 Duration:</strong> This Agreement enters into force upon signing and is
              concluded for a period of three (3) years.
            </p>
            <p className="mb-2">
              <strong>6.2 Retroactive Effect:</strong> The confidentiality obligations apply
              retroactively from the moment of first contact and continue after completion of the
              evaluation, regardless of whether discussions lead to a transaction.
            </p>
          </div>

          {/* Article 7: Applicable Law */}
          <div>
            <h5 className="font-semibold mb-2">Article 7. Applicable Law and Jurisdiction</h5>
            <p className="mb-2">
              <strong>7.1 Governing Law:</strong> This Agreement is governed by Belgian law.
            </p>
            <p className="mb-2">
              <strong>7.2 Jurisdiction:</strong> All disputes will be submitted to the exclusively
              competent court in Belgium.
            </p>
          </div>
        </div>
      </div>

      <AnimatedTextarea
        label="Digital Signature"
        placeholder="Type your full name as digital signature"
        value={signatureData.digitalSignature}
        onChange={e => setSignatureData(prev => ({ ...prev, digitalSignature: e.target.value }))}
        onBlur={() => {}}
        name="digitalSignature"
        required
        minRows={2}
        maxRows={3}
      />

      <div className="space-y-4">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
          <p className="text-sm text-primary-800 font-medium mb-2">
            By typing your name below, you confirm this serves as your digital signature and that
            you agree to all terms and conditions of this Non-Disclosure Agreement.
          </p>
          <p className="text-xs text-primary-600">
            This includes all articles, clauses, penalties, and legal obligations outlined above.
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Agreement Details:</strong>
            <br />
            Date: {new Date().toLocaleDateString()}
            <br />
            Time: {new Date().toLocaleTimeString()}
            <br />
            IP Address: Will be recorded for verification
            <br />
            Duration: 3 years from signing date
            <br />
            Jurisdiction: Belgian courts
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="5xl"
      scrollBehavior="inside"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <span>Non-Disclosure Agreement</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Step {currentStep} of 3</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map(step => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${
                        step <= currentStep ? 'bg-primary-600' : 'bg-gray-300'
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
              <Button variant="danger" onPress={onClose} isDisabled={isLoading}>
                Cancel
              </Button>

              {currentStep > 1 && (
                <Button
                  color="default"
                  variant="tertiary"
                  onPress={handleBack}
                  isDisabled={isLoading}
                >
                  Back
                </Button>
              )}

              {currentStep < 3 ? (
                <Button variant="primary" onPress={handleNext} isDisabled={isLoading}>
                  Next
                </Button>
              ) : (
                <Button
                  variant="success"
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
