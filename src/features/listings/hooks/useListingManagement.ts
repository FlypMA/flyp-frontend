// 📋 Listing Management Hook
// Location: src/features/listings/hooks/useListingManagement.ts
// Purpose: Handle listing CRUD operations, status management, and analytics

import { useState, useEffect, useCallback, useMemo } from 'react';

// Types
interface ListingData {
  // Basic info
  title: string;
  description: string;
  price: number;
  currency: 'EUR' | 'USD' | 'GBP';

  // Business details
  businessType: string;
  industry: string;
  location: {
    country: string;
    city: string;
    region: string;
  };

  // Financial
  revenue: number;
  ebitda: number;
  netIncome: number;
  employees: number;
  established: number;

  // Assets
  realEstate: boolean;
  equipment: boolean;
  inventory: boolean;
  intellectualProperty: string[];

  // Sales info
  reasonForSale: string;
  timeframe: string;
  financing: boolean;
  ownerInvolvement: 'full' | 'partial' | 'none';

  // Media
  images: File[];
  documents: File[];

  // Visibility
  featured: boolean;
  visibility: 'public' | 'private' | 'draft';
}

interface Listing {
  id: string;
  data: ListingData;
  status: 'draft' | 'pending' | 'active' | 'paused' | 'sold';
  createdAt: Date;
  updatedAt: Date;
  views: number;
  inquiries: number;
  favorites: number;
}

interface ListingAnalytics {
  views: Array<{ date: string; count: number }>;
  inquiries: Array<{ date: string; count: number }>;
  competitors: Array<{ id: string; title: string; price: number; views: number }>;
  priceRecommendation: {
    suggested: number;
    reason: string;
    confidence: 'high' | 'medium' | 'low';
  };
}

interface UseListingManagementReturn {
  // Data
  listings: Listing[];
  currentListing: Listing | null;
  isLoading: boolean;
  error: string | null;

  // CRUD operations
  createListing: (data: Partial<ListingData>) => Promise<string>;
  updateListing: (id: string, data: Partial<ListingData>) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  duplicateListing: (id: string) => Promise<string>;

  // Status management
  publishListing: (id: string) => Promise<void>;
  pauseListing: (id: string) => Promise<void>;
  markAsSold: (id: string) => Promise<void>;

  // Analytics
  getListingAnalytics: (id: string) => Promise<ListingAnalytics>;

  // Media management
  uploadImages: (listingId: string, files: File[]) => Promise<string[]>;
  removeImage: (listingId: string, imageId: string) => Promise<void>;
  reorderImages: (listingId: string, imageIds: string[]) => Promise<void>;

  // Validation
  validateListing: (data: Partial<ListingData>) => { isValid: boolean; errors: string[] };

  // Filters and sorting
  filterListings: (status?: string, dateRange?: { start: Date; end: Date }) => Listing[];
  sortListings: (by: 'date' | 'views' | 'inquiries' | 'price') => Listing[];

  // Computed values
  totalListings: number;
  activeListings: number;
  draftListings: number;
  totalViews: number;
  totalInquiries: number;

  // Bulk operations
  bulkUpdateStatus: (listingIds: string[], status: Listing['status']) => Promise<void>;
  bulkDelete: (listingIds: string[]) => Promise<void>;
}

const INITIAL_LISTING_DATA: ListingData = {
  title: '',
  description: '',
  price: 0,
  currency: 'EUR',
  businessType: '',
  industry: '',
  location: { country: '', city: '', region: '' },
  revenue: 0,
  ebitda: 0,
  netIncome: 0,
  employees: 0,
  established: new Date().getFullYear() - 5,
  realEstate: false,
  equipment: false,
  inventory: false,
  intellectualProperty: [],
  reasonForSale: '',
  timeframe: '',
  financing: false,
  ownerInvolvement: 'partial',
  images: [],
  documents: [],
  featured: false,
  visibility: 'draft',
};

export const useListingManagement = (): UseListingManagementReturn => {
  // State
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create listing
  const createListing = useCallback(async (data: Partial<ListingData>): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newListing: Listing = {
        id: `listing-${Date.now()}`,
        data: { ...INITIAL_LISTING_DATA, ...data },
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0,
        inquiries: 0,
        favorites: 0,
      };

      setListings(prev => [...prev, newListing]);
      setCurrentListing(newListing);

      return newListing.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create listing';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update listing
  const updateListing = useCallback(
    async (id: string, data: Partial<ListingData>) => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 800));

        setListings(prev =>
          prev.map(listing =>
            listing.id === id
              ? {
                  ...listing,
                  data: { ...listing.data, ...data },
                  updatedAt: new Date(),
                }
              : listing
          )
        );

        if (currentListing?.id === id) {
          setCurrentListing(prev =>
            prev
              ? {
                  ...prev,
                  data: { ...prev.data, ...data },
                  updatedAt: new Date(),
                }
              : null
          );
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update listing';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [currentListing]
  );

  // Delete listing
  const deleteListing = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 600));

        setListings(prev => prev.filter(listing => listing.id !== id));

        if (currentListing?.id === id) {
          setCurrentListing(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete listing';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [currentListing]
  );

  // Duplicate listing
  const duplicateListing = useCallback(
    async (id: string): Promise<string> => {
      const originalListing = listings.find(l => l.id === id);
      if (!originalListing) {
        throw new Error('Listing not found');
      }

      const duplicatedData = {
        ...originalListing.data,
        title: `${originalListing.data.title} (Copy)`,
        visibility: 'draft' as const,
      };

      return await createListing(duplicatedData);
    },
    [listings, createListing]
  );

  // Publish listing
  const publishListing = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // Validate before publishing
        const listing = listings.find(l => l.id === id);
        if (!listing) throw new Error('Listing not found');

        const validation = validateListing(listing.data);
        if (!validation.isValid) {
          throw new Error(`Cannot publish: ${validation.errors.join(', ')}`);
        }

        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        setListings(prev =>
          prev.map(l =>
            l.id === id ? { ...l, status: 'active' as const, updatedAt: new Date() } : l
          )
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to publish listing';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [listings]
  );

  // Pause listing
  const pauseListing = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setListings(prev =>
        prev.map(l =>
          l.id === id ? { ...l, status: 'paused' as const, updatedAt: new Date() } : l
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to pause listing';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mark as sold
  const markAsSold = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setListings(prev =>
        prev.map(l => (l.id === id ? { ...l, status: 'sold' as const, updatedAt: new Date() } : l))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark as sold';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get listing analytics
  const getListingAnalytics = useCallback(async (id: string): Promise<ListingAnalytics> => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock analytics data
      const mockAnalytics: ListingAnalytics = {
        views: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 50) + 10,
        })),
        inquiries: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 5),
        })),
        competitors: [
          { id: 'comp-1', title: 'Similar Tech Company', price: 1200000, views: 245 },
          { id: 'comp-2', title: 'Another Startup', price: 950000, views: 189 },
          { id: 'comp-3', title: 'Competitor Business', price: 1500000, views: 156 },
        ],
        priceRecommendation: {
          suggested: 1100000,
          reason: 'Based on similar businesses and current market trends',
          confidence: 'medium',
        },
      };

      return mockAnalytics;
    } catch (err) {
      throw new Error('Failed to fetch analytics');
    }
  }, []);

  // Validate listing
  const validateListing = useCallback((data: Partial<ListingData>) => {
    const errors: string[] = [];

    if (!data.title?.trim()) errors.push('Title is required');
    if (!data.description?.trim()) errors.push('Description is required');
    if (!data.price || data.price <= 0) errors.push('Valid price is required');
    if (!data.businessType?.trim()) errors.push('Business type is required');
    if (!data.industry?.trim()) errors.push('Industry is required');
    if (!data.location?.country?.trim()) errors.push('Country is required');
    if (!data.revenue || data.revenue < 0) errors.push('Valid revenue is required');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  // Upload images
  const uploadImages = useCallback(async (listingId: string, files: File[]): Promise<string[]> => {
    try {
      // TODO: Implement actual file upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock uploaded image URLs
      const imageUrls = files.map((_, i) => `/api/placeholder/400/300?upload=${Date.now()}-${i}`);

      return imageUrls;
    } catch (err) {
      throw new Error('Failed to upload images');
    }
  }, []);

  // Remove image
  const removeImage = useCallback(async (listingId: string, imageId: string) => {
    try {
      // TODO: Implement actual image removal
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      throw new Error('Failed to remove image');
    }
  }, []);

  // Reorder images
  const reorderImages = useCallback(async (listingId: string, imageIds: string[]) => {
    try {
      // TODO: Implement actual image reordering
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      throw new Error('Failed to reorder images');
    }
  }, []);

  // Filter listings
  const filterListings = useCallback(
    (status?: string, dateRange?: { start: Date; end: Date }) => {
      return listings.filter(listing => {
        if (status && listing.status !== status) return false;
        if (dateRange) {
          const listingDate = listing.createdAt;
          if (listingDate < dateRange.start || listingDate > dateRange.end) return false;
        }
        return true;
      });
    },
    [listings]
  );

  // Sort listings
  const sortListings = useCallback(
    (by: 'date' | 'views' | 'inquiries' | 'price') => {
      return [...listings].sort((a, b) => {
        switch (by) {
          case 'date':
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          case 'views':
            return b.views - a.views;
          case 'inquiries':
            return b.inquiries - a.inquiries;
          case 'price':
            return b.data.price - a.data.price;
          default:
            return 0;
        }
      });
    },
    [listings]
  );

  // Bulk operations
  const bulkUpdateStatus = useCallback(async (listingIds: string[], status: Listing['status']) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual bulk API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setListings(prev =>
        prev.map(listing =>
          listingIds.includes(listing.id) ? { ...listing, status, updatedAt: new Date() } : listing
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bulk update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const bulkDelete = useCallback(
    async (listingIds: string[]) => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Replace with actual bulk delete API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        setListings(prev => prev.filter(listing => !listingIds.includes(listing.id)));

        if (currentListing && listingIds.includes(currentListing.id)) {
          setCurrentListing(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Bulk delete failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [currentListing]
  );

  // Computed values
  const totalListings = listings.length;
  const activeListings = listings.filter(l => l.status === 'active').length;
  const draftListings = listings.filter(l => l.status === 'draft').length;
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
  const totalInquiries = listings.reduce((sum, l) => sum + l.inquiries, 0);

  // Load listings on mount
  useEffect(() => {
    // TODO: Implement initial data loading
    const loadListings = async () => {
      setIsLoading(true);
      try {
        // Mock initial listings
        const mockListings: Listing[] = [
          {
            id: 'listing-1',
            data: {
              ...INITIAL_LISTING_DATA,
              title: 'Tech Startup',
              price: 1200000,
              businessType: 'SaaS',
              industry: 'Technology',
            },
            status: 'active',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
            views: 245,
            inquiries: 12,
            favorites: 8,
          },
          {
            id: 'listing-2',
            data: {
              ...INITIAL_LISTING_DATA,
              title: 'Restaurant Chain',
              price: 850000,
              businessType: 'Restaurant',
              industry: 'Food & Beverage',
            },
            status: 'draft',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
            views: 0,
            inquiries: 0,
            favorites: 0,
          },
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setListings(mockListings);
      } catch (err) {
        setError('Failed to load listings');
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, []);

  return {
    // Data
    listings,
    currentListing,
    isLoading,
    error,

    // CRUD operations
    createListing,
    updateListing,
    deleteListing,
    duplicateListing,

    // Status management
    publishListing,
    pauseListing,
    markAsSold,

    // Analytics
    getListingAnalytics,

    // Media management
    uploadImages,
    removeImage,
    reorderImages,

    // Validation
    validateListing,

    // Filters and sorting
    filterListings,
    sortListings,

    // Computed values
    totalListings,
    activeListings,
    draftListings,
    totalViews,
    totalInquiries,

    // Bulk operations
    bulkUpdateStatus,
    bulkDelete,
  };
};
