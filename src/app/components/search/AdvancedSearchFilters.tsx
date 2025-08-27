import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Slider,
  Checkbox,
  CheckboxGroup,
  Divider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
} from '@heroui/react';
import {
  Filter,
  Search,
  MapPin,
  Building2,
  Euro,
  TrendingUp,
  Clock,
  Shield,
  Save,
  X,
  ChevronDown,
} from 'lucide-react';

interface SearchFilters {
  searchQuery: string;
  sector: string[];
  country: string[];
  region: string[];
  priceRange: [number, number];
  revenueRange: [number, number];
  ebitdaRange: [number, number];
  employeeRange: [number, number];
  businessAge: [number, number];
  anonymous: boolean;
  requiresNda: boolean;
  featured: boolean;
  currency: string;
  listingStatus: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  onSaveSearch?: (searchName: string) => void;
  isLoading?: boolean;
  resultCount?: number;
}

const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  onSaveSearch,
  isLoading = false,
  resultCount = 0,
}) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const sectors = [
    'Technology',
    'Food & Beverage',
    'Manufacturing',
    'Retail',
    'Healthcare',
    'Professional Services',
    'Construction',
    'Transportation',
    'Real Estate',
    'Education',
    'Financial Services',
    'Media & Entertainment',
    'Agriculture',
    'Energy',
    'Telecommunications',
  ];

  const countries = [
    { key: 'BE', label: 'Belgium' },
    { key: 'NL', label: 'Netherlands' },
    { key: 'FR', label: 'France' },
    { key: 'DE', label: 'Germany' },
    { key: 'LU', label: 'Luxembourg' },
    { key: 'CH', label: 'Switzerland' },
    { key: 'AT', label: 'Austria' },
    { key: 'IT', label: 'Italy' },
    { key: 'ES', label: 'Spain' },
  ];

  const currencies = [
    { key: 'EUR', label: 'Euro (€)' },
    { key: 'USD', label: 'US Dollar ($)' },
    { key: 'GBP', label: 'British Pound (£)' },
    { key: 'CHF', label: 'Swiss Franc (CHF)' },
  ];

  const formatCurrency = (value: number, currency: string = 'EUR') => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M ${currency}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K ${currency}`;
    }
    return `${value} ${currency}`;
  };

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchQuery: '',
      sector: [],
      country: [],
      region: [],
      priceRange: [0, 50000000],
      revenueRange: [0, 100000000],
      ebitdaRange: [0, 20000000],
      employeeRange: [0, 1000],
      businessAge: [0, 100],
      anonymous: false,
      requiresNda: false,
      featured: false,
      currency: 'EUR',
      listingStatus: ['published'],
      sortBy: 'created_at',
      sortOrder: 'desc',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.sector.length > 0) count++;
    if (filters.country.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000000) count++;
    if (filters.revenueRange[0] > 0 || filters.revenueRange[1] < 100000000) count++;
    if (filters.anonymous) count++;
    if (filters.requiresNda) count++;
    if (filters.featured) count++;
    return count;
  };

  const handleSaveSearch = async () => {
    if (onSaveSearch && searchName.trim()) {
      await onSaveSearch(searchName.trim());
      setShowSaveModal(false);
      setSearchName('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Search Filters</h3>
          {getActiveFilterCount() > 0 && (
            <Chip size="sm" color="primary" variant="flat">
              {getActiveFilterCount()} active
            </Chip>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onSaveSearch && (
            <Button
              size="sm"
              variant="flat"
              startContent={<Save className="w-4 h-4" />}
              onPress={() => setShowSaveModal(true)}
            >
              Save Search
            </Button>
          )}
          <Button
            size="sm"
            variant="light"
            startContent={<X className="w-4 h-4" />}
            onPress={clearAllFilters}
          >
            Clear All
          </Button>
          <Button size="sm" variant="light" isIconOnly onPress={() => setIsExpanded(!isExpanded)}>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </Button>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Basic Search */}
        <div className="flex gap-3">
          <Input
            placeholder="Search by business name, description, or keywords..."
            value={filters.searchQuery}
            onChange={e => updateFilters({ searchQuery: e.target.value })}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            onKeyPress={e => e.key === 'Enter' && onSearch()}
            className="flex-1"
          />
          <Button
            color="primary"
            onPress={onSearch}
            isLoading={isLoading}
            startContent={!isLoading ? <Search className="w-4 h-4" /> : null}
          >
            Search
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Checkbox
            isSelected={filters.featured}
            onValueChange={checked => updateFilters({ featured: checked })}
            size="sm"
          >
            Featured Only
          </Checkbox>
          <Checkbox
            isSelected={filters.anonymous}
            onValueChange={checked => updateFilters({ anonymous: checked })}
            size="sm"
          >
            Anonymous Listings
          </Checkbox>
          <Checkbox
            isSelected={filters.requiresNda}
            onValueChange={checked => updateFilters({ requiresNda: checked })}
            size="sm"
          >
            NDA Required
          </Checkbox>
        </div>

        {isExpanded && (
          <Accordion variant="bordered" className="px-0">
            {/* Location & Industry */}
            <AccordionItem key="location" title="Location & Industry">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sectors</label>
                    <CheckboxGroup
                      value={filters.sector}
                      onValueChange={value => updateFilters({ sector: value })}
                      orientation="vertical"
                      className="max-h-48 overflow-y-auto"
                    >
                      {sectors.map(sector => (
                        <Checkbox key={sector} value={sector} size="sm">
                          {sector}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Countries
                    </label>
                    <CheckboxGroup
                      value={filters.country}
                      onValueChange={value => updateFilters({ country: value })}
                      orientation="vertical"
                      className="max-h-48 overflow-y-auto"
                    >
                      {countries.map(country => (
                        <Checkbox key={country.key} value={country.key} size="sm">
                          {country.label}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>
                </div>
              </div>
            </AccordionItem>

            {/* Financial Metrics */}
            <AccordionItem key="financial" title="Financial Metrics">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <Select
                    placeholder="Select currency"
                    selectedKeys={filters.currency ? [filters.currency] : []}
                    onSelectionChange={keys => {
                      const currency = Array.from(keys)[0] as string;
                      updateFilters({ currency });
                    }}
                    className="max-w-xs"
                  >
                    {currencies.map(currency => (
                      <SelectItem key={currency.key}>{currency.label}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asking Price Range: {formatCurrency(filters.priceRange[0], filters.currency)} -{' '}
                    {formatCurrency(filters.priceRange[1], filters.currency)}
                  </label>
                  <Slider
                    step={100000}
                    minValue={0}
                    maxValue={50000000}
                    value={filters.priceRange}
                    onChange={value => updateFilters({ priceRange: value as [number, number] })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Revenue Range:{' '}
                    {formatCurrency(filters.revenueRange[0], filters.currency)} -{' '}
                    {formatCurrency(filters.revenueRange[1], filters.currency)}
                  </label>
                  <Slider
                    step={500000}
                    minValue={0}
                    maxValue={100000000}
                    value={filters.revenueRange}
                    onChange={value => updateFilters({ revenueRange: value as [number, number] })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EBITDA Range: {formatCurrency(filters.ebitdaRange[0], filters.currency)} -{' '}
                    {formatCurrency(filters.ebitdaRange[1], filters.currency)}
                  </label>
                  <Slider
                    step={100000}
                    minValue={0}
                    maxValue={20000000}
                    value={filters.ebitdaRange}
                    onChange={value => updateFilters({ ebitdaRange: value as [number, number] })}
                    className="mt-2"
                  />
                </div>
              </div>
            </AccordionItem>

            {/* Business Characteristics */}
            <AccordionItem key="business" title="Business Characteristics">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees: {filters.employeeRange[0]} - {filters.employeeRange[1]}
                  </label>
                  <Slider
                    step={10}
                    minValue={0}
                    maxValue={1000}
                    value={filters.employeeRange}
                    onChange={value => updateFilters({ employeeRange: value as [number, number] })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Age (Years): {filters.businessAge[0]} - {filters.businessAge[1]}
                  </label>
                  <Slider
                    step={1}
                    minValue={0}
                    maxValue={100}
                    value={filters.businessAge}
                    onChange={value => updateFilters({ businessAge: value as [number, number] })}
                    className="mt-2"
                  />
                </div>
              </div>
            </AccordionItem>

            {/* Sorting */}
            <AccordionItem key="sorting" title="Sorting & Display">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select
                    selectedKeys={filters.sortBy ? [filters.sortBy] : []}
                    onSelectionChange={keys => {
                      const sortBy = Array.from(keys)[0] as string;
                      updateFilters({ sortBy });
                    }}
                  >
                    <SelectItem key="created_at">Date Listed</SelectItem>
                    <SelectItem key="asking_price">Asking Price</SelectItem>
                    <SelectItem key="revenue">Revenue</SelectItem>
                    <SelectItem key="views">Popularity</SelectItem>
                    <SelectItem key="title">Alphabetical</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                  <Select
                    selectedKeys={filters.sortOrder ? [filters.sortOrder] : []}
                    onSelectionChange={keys => {
                      const sortOrder = Array.from(keys)[0] as 'asc' | 'desc';
                      updateFilters({ sortOrder });
                    }}
                  >
                    <SelectItem key="desc">Descending</SelectItem>
                    <SelectItem key="asc">Ascending</SelectItem>
                  </Select>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-gray-600">{resultCount} businesses found</p>
          <Button
            color="primary"
            onPress={onSearch}
            isLoading={isLoading}
            startContent={!isLoading ? <Search className="w-4 h-4" /> : null}
          >
            Update Results
          </Button>
        </div>
      </CardBody>

      {/* Save Search Modal */}
      <Modal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)} size="md">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-xl font-bold">Save Search</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Search Name"
                placeholder="e.g., Tech Companies in Belgium"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                description="Give your search a memorable name for easy access later"
              />

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Search Summary</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  {filters.searchQuery && <p>• Query: "{filters.searchQuery}"</p>}
                  {filters.sector.length > 0 && <p>• Sectors: {filters.sector.join(', ')}</p>}
                  {filters.country.length > 0 && <p>• Countries: {filters.country.join(', ')}</p>}
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 50000000) && (
                    <p>
                      • Price: {formatCurrency(filters.priceRange[0], filters.currency)} -{' '}
                      {formatCurrency(filters.priceRange[1], filters.currency)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setShowSaveModal(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSaveSearch}
              isDisabled={!searchName.trim()}
              startContent={<Save className="w-4 h-4" />}
            >
              Save Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default AdvancedSearchFilters;
