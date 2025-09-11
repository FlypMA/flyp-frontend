// 🔍 Marketplace Search Hook
// Location: src/features/marketplace/hooks/useMarketplaceSearch.ts
// Purpose: Handle marketplace search functionality, filters, and results

import { useState, useEffect, useCallback, useMemo } from 'react';

// Types
interface SearchFilters {
  // Basic filters
  query: string;
  location: string[];
  priceRange: {
    min: number;
    max: number;
  };

  // Business filters
  industries: string[];
  businessTypes: string[];
  revenueRange: string[];
  employeeRange: string[];

  // Advanced filters
  establishedYear: {
    min: number;
    max: number;
  };
  ownershipType: string[];
  reasonForSale: string[];

  // Sorting
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'date' | 'popularity';
  showFeatured: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  price: number;
  location: string;
  industry: string;
  revenue: number;
  employees: number;
  established: number;
  featured: boolean;
  images: string[];
  description: string;
  seller: {
    name: string;
    verified: boolean;
  };
}

interface SearchState {
  results: SearchResult[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

interface UseMarketplaceSearchReturn {
  // Search state
  searchState: SearchState;

  // Filters
  filters: SearchFilters;

  // Actions
  updateFilters: (filters: Partial<SearchFilters>) => void;
  search: (query?: string) => Promise<void>;
  clearFilters: () => void;
  loadMore: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;

  // Saved searches
  savedSearches: Array<{ id: string; name: string; filters: SearchFilters }>;
  saveCurrentSearch: (name: string) => Promise<void>;
  loadSavedSearch: (id: string) => void;

  // Quick actions
  toggleFavorite: (listingId: string) => Promise<void>;
  sendInquiry: (listingId: string, message: string) => Promise<void>;

  // Computed values
  hasActiveFilters: boolean;
  popularFilters: Partial<SearchFilters>;

  // Analytics
  searchAnalytics: {
    searchCount: number;
    avgResultsPerSearch: number;
    popularIndustries: string[];
  };
}

const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  location: [],
  priceRange: { min: 0, max: 10000000 },
  industries: [],
  businessTypes: [],
  revenueRange: [],
  employeeRange: [],
  establishedYear: { min: 1900, max: new Date().getFullYear() },
  ownershipType: [],
  reasonForSale: [],
  sortBy: 'relevance',
  showFeatured: true,
};

export const useMarketplaceSearch = (): UseMarketplaceSearchReturn => {
  // State
  const [searchState, setSearchState] = useState<SearchState>({
    results: [],
    totalResults: 0,
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  });

  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [savedSearches, setSavedSearches] = useState<
    Array<{ id: string; name: string; filters: SearchFilters }>
  >([]);
  const [searchAnalytics, setSearchAnalytics] = useState({
    searchCount: 0,
    avgResultsPerSearch: 0,
    popularIndustries: ['Technology', 'Healthcare', 'Retail'],
  });

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Main search function
  const search = useCallback(
    async (query?: string) => {
      setSearchState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // Update query if provided
        const currentFilters = query ? { ...filters, query } : filters;
        if (query) setFilters(currentFilters);

        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Mock search results
        const mockResults: SearchResult[] = Array.from({ length: 20 }, (_, i) => ({
          id: `listing-${i + 1}`,
          title: `${['Tech Startup', 'Restaurant Chain', 'E-commerce Store', 'Manufacturing Company'][i % 4]} ${i + 1}`,
          price: Math.floor(Math.random() * 5000000) + 500000,
          location: ['Amsterdam', 'Brussels', 'Paris', 'Berlin'][i % 4],
          industry: ['Technology', 'Food & Beverage', 'Retail', 'Manufacturing'][i % 4],
          revenue: Math.floor(Math.random() * 2000000) + 200000,
          employees: Math.floor(Math.random() * 50) + 5,
          established: Math.floor(Math.random() * 30) + 1990,
          featured: Math.random() > 0.7,
          images: [`/api/placeholder/400/300?business=${i}`],
          description: `Established business in ${['Technology', 'F&B', 'Retail', 'Manufacturing'][i % 4]} sector with strong growth potential.`,
          seller: {
            name: `Business Owner ${i + 1}`,
            verified: Math.random() > 0.3,
          },
        }));

        // Apply basic filtering (in real implementation, this would be server-side)
        let filteredResults = mockResults;

        if (currentFilters.query) {
          filteredResults = filteredResults.filter(
            result =>
              result.title.toLowerCase().includes(currentFilters.query.toLowerCase()) ||
              result.description.toLowerCase().includes(currentFilters.query.toLowerCase())
          );
        }

        if (currentFilters.industries.length > 0) {
          filteredResults = filteredResults.filter(result =>
            currentFilters.industries.includes(result.industry)
          );
        }

        // Sort results
        switch (currentFilters.sortBy) {
          case 'price_asc':
            filteredResults.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredResults.sort((a, b) => b.price - a.price);
            break;
          case 'date':
            filteredResults.sort((a, b) => b.established - a.established);
            break;
          default: // relevance, popularity
            filteredResults.sort((a, b) => Number(b.featured) - Number(a.featured));
        }

        setSearchState({
          results: filteredResults,
          totalResults: filteredResults.length,
          currentPage: 1,
          totalPages: Math.ceil(filteredResults.length / 10),
          isLoading: false,
          error: null,
        });

        // Update analytics
        setSearchAnalytics(prev => ({
          ...prev,
          searchCount: prev.searchCount + 1,
          avgResultsPerSearch: Math.round(
            (prev.avgResultsPerSearch * prev.searchCount + filteredResults.length) /
              (prev.searchCount + 1)
          ),
        }));
      } catch (err) {
        setSearchState(prev => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Search failed',
        }));
      }
    },
    [filters]
  );

  // Load more results
  const loadMore = useCallback(async () => {
    if (searchState.currentPage >= searchState.totalPages || searchState.isLoading) return;

    setSearchState(prev => ({ ...prev, isLoading: true }));

    try {
      // TODO: Load next page from API
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock additional results
      const additionalResults: SearchResult[] = Array.from({ length: 10 }, (_, i) => ({
        id: `listing-${searchState.results.length + i + 1}`,
        title: `Additional Business ${i + 1}`,
        price: Math.floor(Math.random() * 3000000) + 300000,
        location: 'Amsterdam',
        industry: 'Services',
        revenue: Math.floor(Math.random() * 1500000) + 150000,
        employees: Math.floor(Math.random() * 30) + 3,
        established: 2010,
        featured: false,
        images: [`/api/placeholder/400/300?additional=${i}`],
        description: 'Additional business opportunity with growth potential.',
        seller: {
          name: `Seller ${i + 1}`,
          verified: true,
        },
      }));

      setSearchState(prev => ({
        ...prev,
        results: [...prev.results, ...additionalResults],
        currentPage: prev.currentPage + 1,
        isLoading: false,
      }));
    } catch (err) {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load more results',
      }));
    }
  }, [
    searchState.currentPage,
    searchState.totalPages,
    searchState.isLoading,
    searchState.results.length,
  ]);

  // Go to specific page
  const goToPage = useCallback(
    async (page: number) => {
      if (page < 1 || page > searchState.totalPages || page === searchState.currentPage) return;

      setSearchState(prev => ({ ...prev, isLoading: true, currentPage: page }));

      try {
        // TODO: Load specific page from API
        await new Promise(resolve => setTimeout(resolve, 600));

        // For now, just clear loading state
        setSearchState(prev => ({ ...prev, isLoading: false }));
      } catch (err) {
        setSearchState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load page',
        }));
      }
    },
    [searchState.totalPages, searchState.currentPage]
  );

  // Save current search
  const saveCurrentSearch = useCallback(
    async (name: string) => {
      try {
        const newSavedSearch = {
          id: `search-${Date.now()}`,
          name,
          filters: { ...filters },
        };

        setSavedSearches(prev => [...prev, newSavedSearch]);

        // TODO: Save to backend
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        console.error('Failed to save search:', err);
      }
    },
    [filters]
  );

  // Load saved search
  const loadSavedSearch = useCallback(
    (id: string) => {
      const savedSearch = savedSearches.find(s => s.id === id);
      if (savedSearch) {
        setFilters(savedSearch.filters);
        search();
      }
    },
    [savedSearches, search]
  );

  // Toggle favorite
  const toggleFavorite = useCallback(async (listingId: string) => {
    try {
      // TODO: Implement favorite toggle API call
      console.log('Toggling favorite for listing:', listingId);
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  }, []);

  // Send inquiry
  const sendInquiry = useCallback(async (listingId: string, message: string) => {
    try {
      // TODO: Implement inquiry API call
      console.log('Sending inquiry:', { listingId, message });
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error('Failed to send inquiry:', err);
      throw err;
    }
  }, []);

  // Computed values
  const hasActiveFilters = useMemo(() => {
    return (
      filters.query !== DEFAULT_FILTERS.query ||
      filters.industries.length > 0 ||
      filters.location.length > 0 ||
      filters.priceRange.min !== DEFAULT_FILTERS.priceRange.min ||
      filters.priceRange.max !== DEFAULT_FILTERS.priceRange.max ||
      filters.sortBy !== DEFAULT_FILTERS.sortBy
    );
  }, [filters]);

  const popularFilters = useMemo(
    (): Partial<SearchFilters> => ({
      industries: ['Technology', 'Healthcare'],
      location: ['Amsterdam', 'Brussels'],
      priceRange: { min: 100000, max: 2000000 },
    }),
    []
  );

  // Auto-search when filters change (debounced)
  useEffect(() => {
    if (!hasActiveFilters) return;

    const timeoutId = setTimeout(() => {
      search();
    }, 800); // 800ms debounce

    return () => clearTimeout(timeoutId);
  }, [filters]); // Don't include search to avoid infinite loops

  // Initial search on mount
  useEffect(() => {
    search();
  }, []); // Empty dependency array for initial load only

  return {
    // Search state
    searchState,

    // Filters
    filters,

    // Actions
    updateFilters,
    search,
    clearFilters,
    loadMore,
    goToPage,

    // Saved searches
    savedSearches,
    saveCurrentSearch,
    loadSavedSearch,

    // Quick actions
    toggleFavorite,
    sendInquiry,

    // Computed values
    hasActiveFilters,
    popularFilters,

    // Analytics
    searchAnalytics,
  };
};
