import React from 'react';
import {
  Target,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  stat?: string;
}

interface ValuePropositionProps {
  userType: 'seller' | 'buyer';
  variant?: 'sidebar' | 'inline' | 'hero';
  showCTA?: boolean;
  onCTAClick?: () => void;
}

const ValueProposition: React.FC<ValuePropositionProps> = ({
  userType,
  variant = 'sidebar',
  showCTA = false,
  onCTAClick,
}) => {
  const sellerBenefits: Benefit[] = [
    {
      icon: Target,
      title: 'Reach Qualified Buyers',
      description: 'Connect with pre-verified buyers who match your business profile',
      stat: '3x more qualified inquiries',
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: "NDA protection and anonymous browsing until you're ready",
      stat: '100% confidential',
    },
    {
      icon: TrendingUp,
      title: 'Maximize Your Valuation',
      description: 'Professional presentation tools and market insights to optimize price',
      stat: '15% higher valuations',
    },
    {
      icon: Zap,
      title: 'Streamlined Process',
      description: 'Automated workflows and expert guidance from listing to closing',
      stat: '50% faster deals',
    },
  ];

  const buyerBenefits: Benefit[] = [
    {
      icon: Target,
      title: 'Find Hidden Opportunities',
      description: 'Access exclusive off-market deals and pre-screened businesses',
      stat: '60% off-market deals',
    },
    {
      icon: Users,
      title: 'Verified Sellers Only',
      description: 'All businesses are verified with financial documents and legal status',
      stat: '100% verified listings',
    },
    {
      icon: Clock,
      title: 'Save Time & Effort',
      description: 'AI-powered matching and automated alerts for your criteria',
      stat: '10x faster search',
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Real-time valuations, industry trends, and comparable sales data',
      stat: 'Real-time insights',
    },
  ];

  const benefits = userType === 'seller' ? sellerBenefits : buyerBenefits;
  const title =
    userType === 'seller' ? 'Why Choose BetweenDeals to Sell?' : 'Why Choose BetweenDeals to Buy?';

  const heroContent =
    userType === 'seller'
      ? {
          title: 'Sell Your Business with Confidence',
          subtitle: 'Join the platform where serious entrepreneurs connect with qualified buyers',
          highlight: 'Get 3x more qualified inquiries and 15% higher valuations',
        }
      : {
          title: 'Find Your Perfect Business Opportunity',
          subtitle:
            "Access exclusive deals and connect with verified sellers in Europe's premier M&A marketplace",
          highlight: '60% of our deals are off-market and not available elsewhere',
        };

  if (variant === 'hero') {
    return (
      <div className="relative bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{heroContent.title}</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">{heroContent.subtitle}</p>
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-8">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {heroContent.highlight}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="inline-flex p-3 bg-white/20 rounded-xl mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{benefit.title}</h3>
                  <p className="text-xs text-blue-100 mb-2">{benefit.description}</p>
                  {benefit.stat && (
                    <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {benefit.stat}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 bg-blue-500 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {userType === 'seller' ? 'Maximize Your Success' : 'Find Better Opportunities'}
            </h3>
            <p className="text-gray-600 mb-4">
              {userType === 'seller'
                ? 'Complete your profile to attract the right buyers and get the best price for your business.'
                : 'Set up your investment criteria to receive personalized deal alerts and exclusive opportunities.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefits.slice(0, 2).map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar variant
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-primary-100 rounded-2xl mb-4">
          <Target className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">
          {userType === 'seller'
            ? 'Complete your profile to unlock all benefits'
            : 'Set up your criteria to start finding opportunities'}
        </p>
      </div>

      <div className="space-y-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                <Icon className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{benefit.description}</p>
                {benefit.stat && (
                  <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    {benefit.stat}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showCTA && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onCTAClick}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-blue-700 transition-all"
          >
            <span>{userType === 'seller' ? 'Start Selling' : 'Start Searching'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ValueProposition;
