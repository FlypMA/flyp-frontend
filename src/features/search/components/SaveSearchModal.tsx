// 💾 SaveSearchModal - Save search functionality
// Location: src/features/search/components/SaveSearchModal.tsx
// Purpose: Modal for saving search criteria matching legacy functionality

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
} from '@heroui/react';
import { Save, Bell } from 'lucide-react';

interface SearchCriteria {
  searchQuery?: string;
  sector?: string;
  country?: string;
  priceRange?: [number, number];
  revenueRange?: [number, number];
  anonymous?: boolean;
  requiresNda?: boolean;
}

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (searchData: any) => Promise<void>;
  initialCriteria: SearchCriteria;
  mode?: 'create' | 'edit';
  existingSearchName?: string;
}

const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCriteria,
  mode = 'create',
  existingSearchName = '',
}) => {
  const [searchName, setSearchName] = useState(existingSearchName);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return '0';
    if (price >= 1000000) {
      return `${currency}${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${currency}${(price / 1000).toFixed(0)}K`;
    }
    return `${currency}${price.toLocaleString()}`;
  };

  const handleSave = async () => {
    if (!searchName.trim()) return;

    setIsLoading(true);
    try {
      await onSave({
        name: searchName.trim(),
        criteria: initialCriteria,
        emailAlerts,
        createdAt: new Date().toISOString(),
      });

      // Reset form
      setSearchName('');
      setEmailAlerts(true);
      onClose();
    } catch (error) {
      console.error('Error saving search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setSearchName(existingSearchName);
      setEmailAlerts(true);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      classNames={{
        base: 'rounded-2xl',
        backdrop: 'bg-black/50',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <Save className="w-5 h-5 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Save Search Alert' : 'Edit Search Alert'}
          </span>
        </ModalHeader>

        <ModalBody className="space-y-6">
          {/* Search Name Input */}
          <div>
            <Input
              label="Search Name"
              placeholder="e.g., Tech Companies in Belgium"
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              description="Give your search a memorable name for easy access later"
              variant="bordered"
              classNames={{
                input: 'text-gray-900',
                label: 'text-gray-700 font-medium',
              }}
            />
          </div>

          {/* Email Alerts Toggle */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Email Alerts</h4>
                <p className="text-sm text-blue-700">
                  Get notified when new businesses match your criteria
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Search Summary */}
          <Card className="border border-gray-200 rounded-xl">
            <CardBody className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Search Criteria Summary</h4>
              <div className="space-y-2 text-sm">
                {initialCriteria.searchQuery && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Search Query:</span>
                    <span className="font-medium text-gray-900">
                      "{initialCriteria.searchQuery}"
                    </span>
                  </div>
                )}
                {initialCriteria.sector && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sector:</span>
                    <span className="font-medium text-gray-900">{initialCriteria.sector}</span>
                  </div>
                )}
                {initialCriteria.country && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">
                      {initialCriteria.country === 'BE' ? 'Belgium' : initialCriteria.country}
                    </span>
                  </div>
                )}
                {initialCriteria.priceRange &&
                  (initialCriteria.priceRange[0] > 0 ||
                    initialCriteria.priceRange[1] < 5000000) && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price Range:</span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(initialCriteria.priceRange[0])} -{' '}
                        {formatPrice(initialCriteria.priceRange[1])}
                      </span>
                    </div>
                  )}
                {initialCriteria.anonymous && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">Anonymous listings only</span>
                  </div>
                )}
                {initialCriteria.requiresNda && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Requirements:</span>
                    <span className="font-medium text-gray-900">NDA required</span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Benefits */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-semibold text-green-900 mb-2">Benefits of Saved Searches</h4>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Get instant email notifications for new matches</li>
              <li>• Quick access from your dashboard</li>
              <li>• Never miss relevant business opportunities</li>
              <li>• Track market trends over time</li>
            </ul>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="light"
            onPress={handleClose}
            isDisabled={isLoading}
            className="text-gray-600"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSave}
            isDisabled={!searchName.trim() || isLoading}
            isLoading={isLoading}
            startContent={!isLoading ? <Save className="w-4 h-4" /> : null}
            className="bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            {isLoading
              ? 'Saving...'
              : mode === 'create'
                ? 'Save Search Alert'
                : 'Update Search Alert'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveSearchModal;
