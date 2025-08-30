import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import {
  Heart,
  ArrowUpRight,
  Building2,
  MapPin,
  Euro,
  Eye,
  Clock,
  MoreVertical,
  Edit3,
  Trash2,
  MessageSquare,
  Star,
  Filter,
  Calendar,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FavoriteBusiness {
  id: string;
  listing_id: string;
  title: string;
  sector: string;
  country: string;
  region?: string;
  asking_price?: number;
  currency: string;
  summary: string;
  views: number;
  published_at: string;
  featured: boolean;
  saved_date: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'watching' | 'contacted' | 'evaluating' | 'negotiating' | 'passed';
  employees?: string;
  founded_year?: string;
}

interface FavoriteBusinessesProps {}

const FavoriteBusinesses: React.FC<FavoriteBusinessesProps> = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteBusiness[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'watching' | 'contacted' | 'evaluating' | 'negotiating' | 'passed'>('all');
  const [sortBy, setSortBy] = useState<'saved_date' | 'price' | 'title'>('saved_date');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await favoritesService.getFavorites();
      
      // Mock data for now
      const mockFavorites: FavoriteBusiness[] = [
        {
          id: 'fav_1',
          listing_id: '1',
          title: 'Premium Restaurant Chain - Brussels',
          sector: 'Food & Beverage',
          country: 'Belgium',
          region: 'Brussels',
          asking_price: 2500000,
          currency: 'EUR',
          summary: 'Established restaurant chain with 3 prime Brussels locations. Strong customer base, proven systems, and excellent growth potential.',
          views: 245,
          published_at: '2024-01-15',
          featured: true,
          saved_date: '2024-01-18',
          notes: 'Great location, interested in the franchise model',
          priority: 'high',
          status: 'evaluating',
          employees: '25-30',
          founded_year: '2015',
        },
        {
          id: 'fav_2',
          listing_id: '2',
          title: 'Enterprise SaaS Platform - Ghent',
          sector: 'Technology',
          country: 'Belgium',
          region: 'Ghent',
          asking_price: 1800000,
          currency: 'EUR',
          summary: 'Growing B2B SaaS company specializing in enterprise workflow solutions. Strong recurring revenue model.',
          views: 189,
          published_at: '2024-01-18',
          featured: true,
          saved_date: '2024-01-20',
          notes: 'Solid tech stack, good customer retention',
          priority: 'high',
          status: 'contacted',
          employees: '15',
          founded_year: '2019',
        },
        {
          id: 'fav_3',
          listing_id: '4',
          title: 'Digital Marketing Agency - Amsterdam',
          sector: 'Professional Services',
          country: 'Netherlands',
          region: 'Amsterdam',
          asking_price: 950000,
          currency: 'EUR',
          summary: 'Full-service digital marketing agency with 50+ active clients and experienced team.',
          views: 123,
          published_at: '2024-01-21',
          featured: false,
          saved_date: '2024-01-22',
          priority: 'medium',
          status: 'watching',
          employees: '12',
          founded_year: '2017',
        },
        {
          id: 'fav_4',
          listing_id: '5',
          title: 'Boutique Coffee Roastery - Antwerp',
          sector: 'Food & Beverage',
          country: 'Belgium',
          region: 'Antwerp',
          asking_price: 450000,
          currency: 'EUR',
          summary: 'Specialty coffee roastery with loyal local customer base and growing online sales.',
          views: 78,
          published_at: '2024-01-19',
          featured: false,
          saved_date: '2024-01-21',
          priority: 'low',
          status: 'passed',
          employees: '8',
          founded_year: '2018',
        },
      ];

      setFavorites(mockFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: price >= 1000000 ? 'compact' : 'standard',
    }).format(price);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'watching':
        return 'default';
      case 'contacted':
        return 'primary';
      case 'evaluating':
        return 'warning';
      case 'negotiating':
        return 'success';
      case 'passed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      // TODO: API call to remove favorite
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const updateStatus = async (favoriteId: string, newStatus: FavoriteBusiness['status']) => {
    try {
      // TODO: API call to update status
      setFavorites(prev =>
        prev.map(fav => (fav.id === favoriteId ? { ...fav, status: newStatus } : fav))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const contactSeller = (listing: FavoriteBusiness) => {
    navigate(`/listings/${listing.listing_id}?action=contact`);
  };

  const filteredFavorites = favorites.filter(fav => filter === 'all' || fav.status === filter);

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'saved_date':
        return new Date(b.saved_date).getTime() - new Date(a.saved_date).getTime();
      case 'price':
        return (b.asking_price || 0) - (a.asking_price || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorite Businesses</h1>
          <p className="text-gray-600">
            {favorites.length} businesses saved • {filteredFavorites.length} showing
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" startContent={<Filter className="w-4 h-4" />}>
                {filter === 'all' ? 'All Status' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => setFilter(key as any)}>
              <DropdownItem key="all">All Status</DropdownItem>
              <DropdownItem key="watching">Watching</DropdownItem>
              <DropdownItem key="contacted">Contacted</DropdownItem>
              <DropdownItem key="evaluating">Evaluating</DropdownItem>
              <DropdownItem key="negotiating">Negotiating</DropdownItem>
              <DropdownItem key="passed">Passed</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button
            color="primary"
            onPress={() => navigate('/search')}
            endContent={<ArrowUpRight className="w-4 h-4" />}
          >
            Find More Businesses
          </Button>
        </div>
      </div>

      {/* Favorites List */}
      {sortedFavorites.length > 0 ? (
        <div className="space-y-4">
          {sortedFavorites.map(favorite => (
            <Card key={favorite.id} className="border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200">
              <CardBody className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 
                          className="text-xl font-bold text-gray-900 hover:text-primary-600 cursor-pointer transition-colors"
                          onClick={() => navigate(`/listings/${favorite.listing_id}`)}
                        >
                          {favorite.title}
                        </h3>
                        {favorite.featured && (
                          <Chip size="sm" color="warning" variant="flat">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Chip>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Chip size="sm" color={getPriorityColor(favorite.priority)} variant="flat">
                          {favorite.priority} priority
                        </Chip>
                        <Chip size="sm" color={getStatusColor(favorite.status)} variant="flat">
                          {favorite.status}
                        </Chip>
                        
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem key="contact" startContent={<MessageSquare className="w-4 h-4" />} onPress={() => contactSeller(favorite)}>
                              Contact Seller
                            </DropdownItem>
                            <DropdownItem key="edit" startContent={<Edit3 className="w-4 h-4" />}>
                              Edit Notes
                            </DropdownItem>
                            <DropdownItem key="remove" className="text-danger" color="danger" startContent={<Trash2 className="w-4 h-4" />} onPress={() => removeFavorite(favorite.id)}>
                              Remove from Favorites
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{favorite.sector}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{favorite.region}, {favorite.country}</span>
                      </div>
                      {favorite.employees && (
                        <div className="flex items-center gap-1">
                          <span>{favorite.employees} employees</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Saved {getTimeAgo(favorite.saved_date)}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{favorite.summary}</p>

                    {favorite.notes && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Your notes:</strong> {favorite.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {formatPrice(favorite.asking_price, favorite.currency)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{favorite.views} views</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{getTimeAgo(favorite.published_at)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="flat"
                          color="primary"
                          size="sm"
                          onPress={() => contactSeller(favorite)}
                          startContent={<MessageSquare className="w-4 h-4" />}
                        >
                          Contact
                        </Button>
                        <Button
                          variant="flat"
                          size="sm"
                          onPress={() => navigate(`/listings/${favorite.listing_id}`)}
                          endContent={<ArrowUpRight className="w-4 h-4" />}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border border-gray-200">
          <CardBody className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-pink-100 rounded-2xl w-fit mx-auto mb-4">
                <Heart className="w-12 h-12 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {filter === 'all' ? 'No favorites yet' : `No ${filter} businesses`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? 'Start browsing businesses and save the ones you\'re interested in.'
                  : `No businesses with ${filter} status. Try a different filter.`}
              </p>
              <Button color="primary" onPress={() => navigate('/search')}>
                Browse Businesses
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default FavoriteBusinesses;
