// 🏢 Listing Management Page - Business Owner Dashboard
// Location: src/app/pages/business/management/ListingManagement.tsx
// Purpose: Manage business listings for sellers

import { ListingWizardModal } from '@/features/phase1/business/wizard';
import { Button } from '@/shared/components/buttons';
import { EmptyStateCard } from '@/shared/components/cards';
import { authService, UrlGenerator } from '@/shared/services';
import { User } from '@/shared/types';
import { Card, CardBody, Chip } from '@heroui/react';
import { Building2, Edit, MoreHorizontal, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'paused' | 'sold' | 'under_review' | 'approved';
  views: number;
  inquiries: number;
  publishedAt: string;
  askingPrice?: number;
  currency: string;
  imageUrl?: string;
  location?: string;
  industry?: string;
}

const ListingManagement: React.FC = () => {
  const navigate = useNavigate();
  const [listings] = useState<Listing[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [isListingWizardModalOpen, setIsListingWizardModalOpen] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);
          // TODO: Load business info from API
          // For now, use mock data
          setBusinessInfo({
            name: '',
            industry: '',
            description: '',
            foundedYear: new Date().getFullYear(),
            teamSize: '',
            location: '',
            isRemote: false,
          });
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    };

    initializePage();
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'approved':
        return 'success';
      case 'under_review':
        return 'warning';
      case 'draft':
        return 'default';
      case 'paused':
        return 'default';
      case 'sold':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'under_review':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleCreateListing = () => {
    setIsListingWizardModalOpen(true);
  };

  const handleListingComplete = (data: any) => {
    // Here you would typically:
    // 1. Send the data to your API to create the listing
    // 2. Show success notification
    // 3. Refresh the listings

    setIsListingWizardModalOpen(false);
    // TODO: Refresh listings or show success message
  };

  const handleEditListing = (listingId: string) => {
    navigate(`/my-business/listings/${listingId}/edit`);
  };

  const handleViewListing = (listingId: string) => {
    navigate(UrlGenerator.listingById(listingId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Listings</h1>
              <p className="text-lg text-gray-600">
                Manage your business listings and track their performance
              </p>
            </div>
            <Button
              variant="primary"
              onPress={handleCreateListing}
              startContent={<Plus className="w-4 h-4" />}
            >
              Create New Listing
            </Button>
          </div>
        </div>

        {/* Business Listings Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Business Listings</h2>
          </div>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(listing => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardBody className="p-0">
                    {/* Listing Image */}
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      {listing.imageUrl ? (
                        <img
                          src={listing.imageUrl}
                          alt={listing.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <Building2 className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <Chip color={getStatusColor(listing.status)} variant="flat" size="sm">
                          {getStatusText(listing.status)}
                        </Chip>
                      </div>
                      {/* Actions Menu */}
                      <div className="absolute top-3 right-3">
                        <Button
                          variant="tertiary"
                          size="sm"
                          isIconOnly
                          className="bg-white/80 backdrop-blur-sm"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Listing Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                          {listing.title}
                        </h3>
                        {listing.location && (
                          <p className="text-sm text-gray-600 mb-2">{listing.location}</p>
                        )}
                        {listing.askingPrice && (
                          <p className="text-lg font-bold text-gray-900">
                            {listing.askingPrice.toLocaleString()} {listing.currency}
                          </p>
                        )}
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{listing.views}</div>
                          <div className="text-xs text-gray-600">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{listing.inquiries}</div>
                          <div className="text-xs text-gray-600">Inquiries</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          onPress={() => handleViewListing(listing.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="tertiary"
                          size="sm"
                          isIconOnly
                          onPress={() => handleEditListing(listing.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyStateCard
              icon={Building2}
              title="Create Your Business Listing"
              description="Ready to explore selling opportunities? Create a confidential listing to see what interest your business generates."
              buttonText="Create Listing"
              onButtonClick={handleCreateListing}
            />
          )}
        </div>
      </div>

      {/* Listing Wizard Modal */}
      <ListingWizardModal
        isOpen={isListingWizardModalOpen}
        onClose={() => setIsListingWizardModalOpen(false)}
        onComplete={handleListingComplete}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default ListingManagement;
