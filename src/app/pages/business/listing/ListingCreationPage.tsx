/**
 * 🏢 Listing Creation Page
 * Location: src/app/pages/business/listing/ListingCreationPage.tsx
 * Purpose: Dedicated page for creating business listings with prefilled data
 */

import StreamlinedListingModal from '@/features/phase1/business/listing/components/StreamlinedListingModal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListingCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen] = useState(true); // Always open when on this page
  const [businessCardData, setBusinessCardData] = useState<any>(null);
  const [profileCardData, setProfileCardData] = useState<any>(null);
  const [latestValuationReport, setLatestValuationReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load all required data from localStorage
  useEffect(() => {
    console.log('📊 Loading listing creation data from localStorage...');

    // Load business card
    const businessCard = localStorage.getItem('businessCard');
    if (businessCard) {
      try {
        const parsedCard = JSON.parse(businessCard);
        console.log('✅ Business card loaded:', parsedCard);
        setBusinessCardData(parsedCard);
      } catch (error) {
        console.error('❌ Error parsing business card:', error);
      }
    }

    // Load profile card
    const profileCard = localStorage.getItem('profileCard');
    if (profileCard) {
      try {
        const parsedCard = JSON.parse(profileCard);
        console.log('✅ Profile card loaded:', parsedCard);
        setProfileCardData(parsedCard);
      } catch (error) {
        console.error('❌ Error parsing profile card:', error);
      }
    }

    // Load latest valuation report
    const valuationReportsRaw = localStorage.getItem('valuationReports');
    if (valuationReportsRaw) {
      try {
        const reports = JSON.parse(valuationReportsRaw);
        if (reports && reports.length > 0) {
          // Get the most recent report
          const sortedReports = reports.sort(
            (a: any, b: any) =>
              new Date(b.generated_date).getTime() - new Date(a.generated_date).getTime()
          );
          const latestReport = sortedReports[0];
          console.log('✅ Latest valuation report loaded:', latestReport);
          setLatestValuationReport(latestReport);
        }
      } catch (error) {
        console.error('❌ Error parsing valuation reports:', error);
      }
    }

    setIsLoading(false);
  }, []);

  const handleClose = () => {
    navigate('/my-business'); // Return to dashboard
  };

  const handleComplete = (listingData: any) => {
    console.log('✅ Listing created:', listingData);

    // Save listing to localStorage
    const existingListings = localStorage.getItem('listings');
    let listings = [];
    if (existingListings) {
      try {
        listings = JSON.parse(existingListings);
      } catch (error) {
        console.error('Error parsing existing listings:', error);
      }
    }

    // Add new listing
    const newListing = {
      ...listingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'published',
    };

    listings.push(newListing);
    localStorage.setItem('listings', JSON.stringify(listings));
    localStorage.setItem('hasListings', 'true');

    console.log('💾 Listing saved to localStorage');

    // Navigate back to dashboard
    navigate('/my-business');
  };

  // Show loading state while data is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  // Check if user has required data
  if (!businessCardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Card Required</h2>
          <p className="text-gray-600 mb-6">
            You need to create a business card before you can create a listing.
          </p>
          <button
            onClick={() => navigate('/my-business/card/create')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Create Business Card
          </button>
        </div>
      </div>
    );
  }

  return (
    <StreamlinedListingModal
      isOpen={isOpen}
      onClose={handleClose}
      onComplete={handleComplete}
      businessCard={businessCardData}
      profileCard={profileCardData}
      valuationReport={latestValuationReport}
    />
  );
};

export default ListingCreationPage;
