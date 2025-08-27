import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Building2, ArrowRight } from 'lucide-react';
import SellerOnboardingModal from '../../../components/modals/SellerOnboardingModal';
import { SEOHead } from '../../../components/SEO';

interface SellerFormData {
  businessType: string;
  businessName: string;
  industry: string;
  country: string;
  city: string;
  foundedYear: string;
  description: string;
  employeeCount: string;
  revenueRange: number[];
  sellingReason: string;
  timeline: string;
  priceExpectations: string;
  contactEmail: string;
  contactPhone: string;
  wantsVerification: boolean;
}

const SellerOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-open modal when page loads
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Navigate back to business overview when modal closes
    navigate('/business/overview');
  };

  const handleOnboardingComplete = (data: SellerFormData) => {
    console.log('Onboarding completed with data:', data);
    // Handle the form submission here - send to API, etc.
    
    // Close modal and navigate to business overview
    setIsModalOpen(false);
    navigate('/business/overview');
  };

  return (
    <>
      <SEOHead
        title="List Your Business for Sale | BetweenDeals"
        description="Sell your business on BetweenDeals. Create a professional listing in minutes and connect with qualified buyers. Get started with our step-by-step onboarding process."
        keywords="sell business, business for sale, business listing, sell company, business broker, business valuation"
      />

      {/* Fallback content shown if modal fails to load */}
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Building2 className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to sell your business?
          </h1>
          <p className="text-gray-600 mb-8">
            Our step-by-step process will help you create a professional listing 
            that attracts serious buyers.
          </p>
          <Button
            size="lg"
            color="primary"
            onPress={() => setIsModalOpen(true)}
            endContent={<ArrowRight className="w-5 h-5" />}
            className="px-8"
          >
            Start Listing Process
          </Button>
        </div>
      </div>

      {/* Seller Onboarding Modal */}
      <SellerOnboardingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
};

export default SellerOnboardingPage;
