import { Button } from '@/shared/components/buttons';
import {
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
} from '@heroui/react';
import {
  AlertCircle,
  Bell,
  Bookmark,
  Building2,
  Calendar,
  CheckCircle,
  Euro,
  Filter,
  Mail,
  MapPin,
  Search,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SearchCriteria {
  searchQuery?: string;
  sector?: string;
  country?: string;
  region?: string;
  priceRange?: [number, number];
  revenueRange?: [number, number];
  employeeRange?: [number, number];
  businessAge?: [number, number];
  requiresNda?: boolean;
  anonymous?: boolean;
  featured?: boolean;
}

interface SavedSearch {
  id?: string;
  name: string;
  criteria: SearchCriteria;
  alert_frequency: 'immediate' | 'daily' | 'weekly' | 'off';
  email_enabled: boolean;
  is_active: boolean;
}

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (searchData: SavedSearch) => Promise<void>;
  initialCriteria?: SearchCriteria;
  existingSearch?: SavedSearch;
  mode: 'create' | 'edit';
}

const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCriteria,
  existingSearch,
  mode,
}) => {
  const [searchData, setSearchData] = useState<SavedSearch>({
    name: '',
    criteria: initialCriteria || {},
    alert_frequency: 'daily',
    email_enabled: true,
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'criteria' | 'settings'>('criteria');

  useEffect(() => {
    if (existingSearch) {
      setSearchData(existingSearch);
    } else if (initialCriteria) {
      setSearchData(prev => ({
        ...prev,
        criteria: initialCriteria,
        name: generateSearchName(initialCriteria),
      }));
    }
  }, [existingSearch, initialCriteria]);

  const generateSearchName = (criteria: SearchCriteria): string => {
    const parts = [];

    if (criteria.sector) parts.push(criteria.sector);
    if (criteria.country) parts.push(criteria.country);
    if (criteria.region) parts.push(criteria.region);

    if (criteria.priceRange) {
      const [min, max] = criteria.priceRange;
      if (min > 0 || max < 50000000) {
        parts.push(`€${(min / 1000000).toFixed(1)}M-${(max / 1000000).toFixed(1)}M`);
      }
    }

    return parts.length > 0 ? parts.join(' ') : 'New Search Alert';
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    }
    return `€${(value / 1000).toFixed(0)}K`;
  };

  const formatCriteriaText = (criteria: SearchCriteria): string => {
    const parts = [];

    if (criteria.searchQuery) parts.push(`"${criteria.searchQuery}"`);
    if (criteria.sector) parts.push(criteria.sector);
    if (criteria.country) parts.push(criteria.country);
    if (criteria.region) parts.push(criteria.region);

    if (criteria.priceRange) {
      const [min, max] = criteria.priceRange;
      parts.push(`${formatPrice(min)} - ${formatPrice(max)}`);
    }

    if (criteria.employeeRange) {
      const [min, max] = criteria.employeeRange;
      parts.push(`${min}-${max} employees`);
    }

    if (criteria.businessAge) {
      const [min, max] = criteria.businessAge;
      parts.push(`${min}-${max} years old`);
    }

    const filters = [];
    if (criteria.requiresNda) filters.push('NDA Required');
    if (criteria.anonymous) filters.push('Anonymous');
    if (criteria.featured) filters.push('Featured');

    return parts.concat(filters).join(' • ') || 'All businesses';
  };

  const validateForm = (): boolean => {
    return searchData.name.trim().length > 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(searchData);
      onClose();
    } catch (error) {
      // console.error('Error saving search:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('criteria');
    setSearchData({
      name: '',
      criteria: initialCriteria || {},
      alert_frequency: 'daily',
      email_enabled: true,
      is_active: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100">
              <Bookmark className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {mode === 'create' ? 'Save Search Alert' : 'Edit Search Alert'}
              </h2>
              <p className="text-sm text-gray-600">
                Get notified when new businesses match your criteria
              </p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="pb-6">
          {step === 'criteria' && (
            <div className="space-y-6">
              {/* Search Name */}
              <div>
                <Input
                  label="Search Name"
                  placeholder="e.g., Tech Companies Belgium €1-5M"
                  value={searchData.name}
                  onChange={e => setSearchData(prev => ({ ...prev, name: e.target.value }))}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  variant="flat"
                  isRequired
                />
              </div>

              {/* Criteria Summary */}
              <Card className="border border-gray-200">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Filter className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Search Criteria</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {formatCriteriaText(searchData.criteria)}
                      </p>

                      {/* Criteria Details */}
                      <div className="flex flex-wrap gap-2">
                        {searchData.criteria.searchQuery && (
                          <Chip size="sm" variant="flat" color="primary">
                            <Search className="w-3 h-3 mr-1" />"{searchData.criteria.searchQuery}"
                          </Chip>
                        )}
                        {searchData.criteria.sector && (
                          <Chip size="sm" variant="flat">
                            <Building2 className="w-3 h-3 mr-1" />
                            {searchData.criteria.sector}
                          </Chip>
                        )}
                        {searchData.criteria.country && (
                          <Chip size="sm" variant="flat">
                            <MapPin className="w-3 h-3 mr-1" />
                            {searchData.criteria.country}
                          </Chip>
                        )}
                        {searchData.criteria.priceRange && (
                          <Chip size="sm" variant="flat">
                            <Euro className="w-3 h-3 mr-1" />
                            {formatPrice(searchData.criteria.priceRange[0])} -{' '}
                            {formatPrice(searchData.criteria.priceRange[1])}
                          </Chip>
                        )}
                        {searchData.criteria.employeeRange && (
                          <Chip size="sm" variant="flat">
                            <Users className="w-3 h-3 mr-1" />
                            {searchData.criteria.employeeRange[0]}-
                            {searchData.criteria.employeeRange[1]} employees
                          </Chip>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  You can modify these criteria by going back to the search page
                </p>
                <Button
                  variant="primary"
                  onPress={() => setStep('settings')}
                  endContent={<Bell className="w-4 h-4" />}
                >
                  Configure Alerts
                </Button>
              </div>
            </div>
          )}

          {step === 'settings' && (
            <div className="space-y-6">
              {/* Alert Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Frequency
                </label>
                <Select
                  placeholder="Choose frequency"
                  selectedKeys={[searchData.alert_frequency]}
                  onSelectionChange={keys => {
                    const frequency = Array.from(keys)[0] as SavedSearch['alert_frequency'];
                    setSearchData(prev => ({ ...prev, alert_frequency: frequency }));
                  }}
                  variant="flat"
                >
                  <SelectItem key="immediate" startContent={<Bell className="w-4 h-4" />}>
                    <div>
                      <div className="font-medium">Immediate</div>
                      <div className="text-xs text-gray-500">
                        Get notified as soon as new matches are found
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem key="daily" startContent={<Calendar className="w-4 h-4" />}>
                    <div>
                      <div className="font-medium">Daily</div>
                      <div className="text-xs text-gray-500">
                        Receive a daily summary of new matches
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem key="weekly" startContent={<Calendar className="w-4 h-4" />}>
                    <div>
                      <div className="font-medium">Weekly</div>
                      <div className="text-xs text-gray-500">Get a weekly digest every Monday</div>
                    </div>
                  </SelectItem>
                  <SelectItem key="off" startContent={<Bell className="w-4 h-4 opacity-50" />}>
                    <div>
                      <div className="font-medium">No Alerts</div>
                      <div className="text-xs text-gray-500">
                        Save search but don't send notifications
                      </div>
                    </div>
                  </SelectItem>
                </Select>
              </div>

              <Divider />

              {/* Email Notifications */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Email Notifications</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Send email notifications when new businesses match your criteria
                  </p>
                </div>
                <Switch
                  isSelected={searchData.email_enabled}
                  onValueChange={value =>
                    setSearchData(prev => ({ ...prev, email_enabled: value }))
                  }
                  isDisabled={searchData.alert_frequency === 'off'}
                />
              </div>

              {/* Search Status */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Active Search</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Enable this search to start receiving notifications
                  </p>
                </div>
                <Switch
                  isSelected={searchData.is_active}
                  onValueChange={value => setSearchData(prev => ({ ...prev, is_active: value }))}
                />
              </div>

              {/* Alert Preview */}
              {searchData.is_active && searchData.alert_frequency !== 'off' && (
                <Card className="border border-blue-200 bg-blue-50">
                  <CardBody className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Alert Preview</h4>
                        <p className="text-sm text-blue-700">
                          You'll receive {searchData.alert_frequency} notifications
                          {searchData.email_enabled ? ' via email' : ' in the app'} when businesses
                          matching "{searchData.name}" criteria are found.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="flex items-center justify-between w-full">
            {step === 'settings' && (
              <Button variant="secondary" onPress={() => setStep('criteria')}>
                Back to Details
              </Button>
            )}

            <div className="flex gap-2 ml-auto">
              <Button variant="secondary" onPress={handleClose}>
                Cancel
              </Button>

              {step === 'criteria' ? (
                <Button
                  variant="primary"
                  onPress={() => setStep('settings')}
                  isDisabled={!validateForm()}
                >
                  Next: Configure Alerts
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onPress={handleSave}
                  isLoading={isSubmitting}
                  startContent={<Bookmark className="w-4 h-4" />}
                >
                  {mode === 'create' ? 'Save Search Alert' : 'Update Search Alert'}
                </Button>
              )}
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveSearchModal;
