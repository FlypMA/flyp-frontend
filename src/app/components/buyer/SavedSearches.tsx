import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, Chip, Switch, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge } from '@heroui/react';
import {
  Bookmark,
  Plus,
  Bell,
  BellOff,
  Edit3,
  Trash2,
  Search,
  Building2,
  MapPin,
  Euro,
  Calendar,
  MoreVertical,
  Mail,
  Clock,
  Filter,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SavedSearch {
  id: string;
  name: string;
  criteria: {
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
  };
  alert_frequency: 'immediate' | 'daily' | 'weekly' | 'off';
  email_enabled: boolean;
  is_active: boolean;
  created_date: string;
  last_run: string;
  results_count: number;
  new_results: number;
  last_notification?: string;
}

interface SavedSearchesProps {}

const SavedSearches: React.FC<SavedSearchesProps> = () => {
  const navigate = useNavigate();
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    loadSavedSearches();
  }, []);

  const loadSavedSearches = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await searchService.getSavedSearches();
      
      // Mock data for now
      const mockSearches: SavedSearch[] = [
        {
          id: 'search_1',
          name: 'Tech Companies Belgium €1-5M',
          criteria: {
            searchQuery: 'SaaS technology',
            sector: 'Technology',
            country: 'Belgium',
            priceRange: [1000000, 5000000],
            revenueRange: [500000, 10000000],
            employeeRange: [10, 50],
          },
          alert_frequency: 'daily',
          email_enabled: true,
          is_active: true,
          created_date: '2024-01-15T10:30:00Z',
          last_run: '2024-01-22T09:00:00Z',
          results_count: 12,
          new_results: 3,
          last_notification: '2024-01-22T09:15:00Z',
        },
        {
          id: 'search_2',
          name: 'Restaurants & Cafes Brussels',
          criteria: {
            sector: 'Food & Beverage',
            country: 'Belgium',
            region: 'Brussels',
            priceRange: [500000, 3000000],
            businessAge: [3, 15],
          },
          alert_frequency: 'weekly',
          email_enabled: true,
          is_active: true,
          created_date: '2024-01-10T14:20:00Z',
          last_run: '2024-01-21T18:00:00Z',
          results_count: 8,
          new_results: 1,
          last_notification: '2024-01-21T18:05:00Z',
        },
        {
          id: 'search_3',
          name: 'Manufacturing Netherlands',
          criteria: {
            sector: 'Manufacturing',
            country: 'Netherlands',
            priceRange: [2000000, 15000000],
            employeeRange: [25, 200],
          },
          alert_frequency: 'immediate',
          email_enabled: false,
          is_active: false,
          created_date: '2024-01-05T16:45:00Z',
          last_run: '2024-01-18T12:00:00Z',
          results_count: 5,
          new_results: 0,
          last_notification: '2024-01-18T12:02:00Z',
        },
        {
          id: 'search_4',
          name: 'Professional Services Amsterdam',
          criteria: {
            searchQuery: 'consulting marketing',
            sector: 'Professional Services',
            country: 'Netherlands',
            region: 'Amsterdam',
            priceRange: [300000, 2000000],
          },
          alert_frequency: 'weekly',
          email_enabled: true,
          is_active: true,
          created_date: '2024-01-08T11:15:00Z',
          last_run: '2024-01-22T08:00:00Z',
          results_count: 15,
          new_results: 5,
          last_notification: '2024-01-22T08:05:00Z',
        },
      ];

      setSearches(mockSearches);
    } catch (error) {
      console.error('Error loading saved searches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSearchStatus = async (searchId: string) => {
    try {
      // TODO: API call to toggle search status
      setSearches(prev =>
        prev.map(search =>
          search.id === searchId ? { ...search, is_active: !search.is_active } : search
        )
      );
    } catch (error) {
      console.error('Error toggling search status:', error);
    }
  };

  const toggleEmailNotifications = async (searchId: string) => {
    try {
      // TODO: API call to toggle email notifications
      setSearches(prev =>
        prev.map(search =>
          search.id === searchId ? { ...search, email_enabled: !search.email_enabled } : search
        )
      );
    } catch (error) {
      console.error('Error toggling email notifications:', error);
    }
  };

  const updateAlertFrequency = async (searchId: string, frequency: SavedSearch['alert_frequency']) => {
    try {
      // TODO: API call to update frequency
      setSearches(prev =>
        prev.map(search =>
          search.id === searchId ? { ...search, alert_frequency: frequency } : search
        )
      );
    } catch (error) {
      console.error('Error updating alert frequency:', error);
    }
  };

  const deleteSearch = async (searchId: string) => {
    try {
      // TODO: API call to delete search
      setSearches(prev => prev.filter(search => search.id !== searchId));
    } catch (error) {
      console.error('Error deleting search:', error);
    }
  };

  const runSearchNow = (search: SavedSearch) => {
    // Build search query from criteria and navigate to search results
    const params = new URLSearchParams();
    
    if (search.criteria.searchQuery) params.set('q', search.criteria.searchQuery);
    if (search.criteria.sector) params.set('sector', search.criteria.sector);
    if (search.criteria.country) params.set('country', search.criteria.country);
    if (search.criteria.region) params.set('region', search.criteria.region);
    if (search.criteria.priceRange) {
      params.set('priceMin', search.criteria.priceRange[0].toString());
      params.set('priceMax', search.criteria.priceRange[1].toString());
    }
    if (search.criteria.revenueRange) {
      params.set('revenueMin', search.criteria.revenueRange[0].toString());
      params.set('revenueMax', search.criteria.revenueRange[1].toString());
    }
    if (search.criteria.requiresNda !== undefined) params.set('requiresNda', search.criteria.requiresNda.toString());
    if (search.criteria.anonymous !== undefined) params.set('anonymous', search.criteria.anonymous.toString());
    if (search.criteria.featured !== undefined) params.set('featured', search.criteria.featured.toString());

    navigate(`/search?${params.toString()}`);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'immediate':
        return 'danger';
      case 'daily':
        return 'warning';
      case 'weekly':
        return 'primary';
      case 'off':
        return 'default';
      default:
        return 'default';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'immediate':
        return Bell;
      case 'daily':
        return Clock;
      case 'weekly':
        return Calendar;
      case 'off':
        return BellOff;
      default:
        return Bell;
    }
  };

  const formatCriteria = (criteria: SavedSearch['criteria']) => {
    const parts = [];
    
    if (criteria.searchQuery) parts.push(`"${criteria.searchQuery}"`);
    if (criteria.sector) parts.push(criteria.sector);
    if (criteria.country) parts.push(criteria.country);
    if (criteria.region) parts.push(criteria.region);
    
    if (criteria.priceRange) {
      const [min, max] = criteria.priceRange;
      parts.push(`€${(min / 1000000).toFixed(1)}M - €${(max / 1000000).toFixed(1)}M`);
    }
    
    if (criteria.employeeRange) {
      const [min, max] = criteria.employeeRange;
      parts.push(`${min}-${max} employees`);
    }

    return parts.slice(0, 4).join(' • ');
  };

  const filteredSearches = searches.filter(search => {
    if (filter === 'active') return search.is_active;
    if (filter === 'inactive') return !search.is_active;
    return true;
  });

  const activeSearches = searches.filter(s => s.is_active).length;
  const totalNewResults = searches.reduce((sum, search) => sum + search.new_results, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Searches & Alerts</h1>
          <p className="text-gray-600">
            {searches.length} saved searches • {activeSearches} active • {totalNewResults} new results
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" startContent={<Filter className="w-4 h-4" />}>
                {filter === 'all' ? 'All Searches' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => setFilter(key as any)}>
              <DropdownItem key="all">All Searches</DropdownItem>
              <DropdownItem key="active">Active Only</DropdownItem>
              <DropdownItem key="inactive">Inactive Only</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button
            color="primary"
            onPress={() => navigate('/search')}
            startContent={<Plus className="w-4 h-4" />}
          >
            Create New Search
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-gray-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-100">
                <Bookmark className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{searches.length}</p>
                <p className="text-sm text-gray-600">Total Searches</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{activeSearches}</p>
                <p className="text-sm text-gray-600">Active Alerts</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-orange-100">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{totalNewResults}</p>
                <p className="text-sm text-gray-600">New Results</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-100">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {searches.filter(s => s.email_enabled).length}
                </p>
                <p className="text-sm text-gray-600">Email Alerts</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Searches List */}
      {filteredSearches.length > 0 ? (
        <div className="space-y-4">
          {filteredSearches.map(search => {
            const FrequencyIcon = getFrequencyIcon(search.alert_frequency);
            return (
              <Card key={search.id} className={`border transition-all duration-200 hover:shadow-lg ${
                search.is_active ? 'border-gray-200' : 'border-gray-100 bg-gray-50'
              }`}>
                <CardBody className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Search Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900">{search.name}</h3>
                          {search.new_results > 0 && (
                            <Badge content={search.new_results} color="danger" size="sm">
                              <div className="w-2 h-2"></div>
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch 
                            size="sm" 
                            isSelected={search.is_active}
                            onValueChange={() => toggleSearchStatus(search.id)}
                          />
                          
                          <Dropdown>
                            <DropdownTrigger>
                              <Button isIconOnly size="sm" variant="light">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownItem key="run" startContent={<Search className="w-4 h-4" />} onPress={() => runSearchNow(search)}>
                                Run Search Now
                              </DropdownItem>
                              <DropdownItem key="edit" startContent={<Edit3 className="w-4 h-4" />}>
                                Edit Search
                              </DropdownItem>
                              <DropdownItem key="duplicate" startContent={<Plus className="w-4 h-4" />}>
                                Duplicate Search
                              </DropdownItem>
                              <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 className="w-4 h-4" />} onPress={() => deleteSearch(search.id)}>
                                Delete Search
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>

                      {/* Search Criteria */}
                      <p className="text-gray-600 mb-4">{formatCriteria(search.criteria)}</p>

                      {/* Search Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span>{search.results_count} businesses</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Created {getTimeAgo(search.created_date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Last run {getTimeAgo(search.last_run)}</span>
                          </div>
                        </div>

                        {search.new_results > 0 && (
                          <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{search.new_results} new result{search.new_results > 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>

                      {/* Alert Settings */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Chip 
                              size="sm" 
                              color={getFrequencyColor(search.alert_frequency)} 
                              variant="flat"
                              startContent={<FrequencyIcon className="w-3 h-3" />}
                            >
                              {search.alert_frequency}
                            </Chip>
                            
                            <Dropdown>
                              <DropdownTrigger>
                                <Button size="sm" variant="light" className="text-xs text-gray-500">
                                  Change
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu onAction={(key) => updateAlertFrequency(search.id, key as any)}>
                                <DropdownItem key="immediate">Immediate</DropdownItem>
                                <DropdownItem key="daily">Daily</DropdownItem>
                                <DropdownItem key="weekly">Weekly</DropdownItem>
                                <DropdownItem key="off">Off</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>Email alerts</span>
                            </div>
                            <Switch 
                              size="sm" 
                              isSelected={search.email_enabled}
                              onValueChange={() => toggleEmailNotifications(search.id)}
                              isDisabled={!search.is_active}
                            />
                          </div>
                        </div>

                        <Button
                          color="primary"
                          variant="flat"
                          size="sm"
                          onPress={() => runSearchNow(search)}
                          startContent={<Search className="w-4 h-4" />}
                        >
                          Run Search
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border border-gray-200">
          <CardBody className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-purple-100 rounded-2xl w-fit mx-auto mb-4">
                <Bookmark className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {filter === 'all' ? 'No saved searches yet' : `No ${filter} searches`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? 'Create your first saved search to get notified when new businesses match your criteria.'
                  : `No searches with ${filter} status. Try a different filter.`}
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button color="primary" onPress={() => navigate('/search')}>
                  Create Your First Search
                </Button>
                {filteredSearches.length === 0 && searches.length > 0 && (
                  <Button variant="bordered" onPress={() => setFilter('all')}>
                    View All
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default SavedSearches;
