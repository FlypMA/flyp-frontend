import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Gift,
  Calendar,
  Users,
  TrendingUp,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingSuccessProps {
  userType: 'seller' | 'buyer';
  userName?: string;
  onContinue: () => void;
  onScheduleCall?: () => void;
}

const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({
  userType,
  userName = 'there',
  onContinue,
  onScheduleCall,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#8B5CF6', '#06D6A0', '#FFD23F'],
      });
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const sellerContent = {
    title: `Welcome to BetweenDeals, ${userName}! 🎉`,
    subtitle: 'Your seller profile is now live and ready to attract qualified buyers',
    benefits: [
      'Your business is now visible to 5,000+ verified buyers',
      'Receive personalized match alerts within 24 hours',
      'Access to premium seller tools and analytics',
      'Direct messaging with interested buyers',
    ],
    nextSteps: [
      {
        icon: TrendingUp,
        title: 'Create Your First Listing',
        description: 'Showcase your business to attract qualified buyers',
        action: 'Create Listing',
        primary: true,
      },
      {
        icon: Calendar,
        title: 'Schedule Success Call',
        description: '30-min strategy session with our M&A experts',
        action: 'Book Call',
        primary: false,
      },
      {
        icon: Users,
        title: 'Join Seller Community',
        description: 'Connect with other business owners and share insights',
        action: 'Join Community',
        primary: false,
      },
    ],
  };

  const buyerContent = {
    title: `Welcome to BetweenDeals, ${userName}! 🚀`,
    subtitle: 'Your investor profile is set up and deal alerts are now active',
    benefits: [
      'Access to 500+ verified business opportunities',
      'Personalized deal alerts matching your criteria',
      'Direct connect with pre-screened sellers',
      'Market intelligence and valuation tools',
    ],
    nextSteps: [
      {
        icon: TrendingUp,
        title: 'Browse Opportunities',
        description: 'Explore businesses that match your investment criteria',
        action: 'View Deals',
        primary: true,
      },
      {
        icon: Calendar,
        title: 'Strategy Session',
        description: 'Free consultation with our acquisition experts',
        action: 'Book Session',
        primary: false,
      },
      {
        icon: Mail,
        title: 'Set Up Alerts',
        description: 'Customize your notification preferences',
        action: 'Manage Alerts',
        primary: false,
      },
    ],
  };

  const content = userType === 'seller' ? sellerContent : buyerContent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Success Card */}
        <Card className="border border-gray-200 shadow-xl">
          <CardBody className="p-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary-500 via-blue-500 to-indigo-600 text-white p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative">
                <div className="inline-flex p-4 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
                <p className="text-xl text-blue-100 mb-6">{content.subtitle}</p>

                {/* Sparkle Animation */}
                <div className="flex justify-center space-x-8 mb-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative">
                      <Sparkles
                        className={`w-6 h-6 text-yellow-300 ${showConfetti ? 'animate-pulse' : ''}`}
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Benefits List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span className="text-blue-100">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What's Next?</h2>
                <p className="text-gray-600">
                  Here are some recommended next steps to maximize your success on our platform
                </p>
              </div>

              {/* Next Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {content.nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Card
                      key={index}
                      className={`border-2 transition-all hover:shadow-lg ${
                        step.primary
                          ? 'border-primary-200 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                    >
                      <CardBody className="p-6 text-center">
                        <div
                          className={`inline-flex p-3 rounded-xl mb-4 ${
                            step.primary ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                        <Button
                          color={step.primary ? 'primary' : 'default'}
                          variant={step.primary ? 'solid' : 'bordered'}
                          size="sm"
                          className="w-full"
                        >
                          {step.action}
                        </Button>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>

              {/* Special Offer */}
              <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 mb-8">
                <CardBody className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 p-3 bg-green-500 rounded-xl">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-green-900 mb-1">
                        Welcome Bonus - Free Premium Features!
                      </h3>
                      <p className="text-green-700 text-sm mb-3">
                        {userType === 'seller'
                          ? 'Get 30 days of premium seller tools including advanced analytics, priority support, and featured listing placement.'
                          : 'Unlock 30 days of premium buyer features including advanced search filters, deal alerts, and priority access to new listings.'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">
                          €49 VALUE - FREE
                        </span>
                        <span className="text-xs text-green-600">
                          Automatically applied to your account
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  color="primary"
                  size="lg"
                  onPress={onContinue}
                  className="bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 px-8"
                  endContent={<ArrowRight className="w-5 h-5" />}
                >
                  {userType === 'seller' ? 'Go to Dashboard' : 'Start Browsing Deals'}
                </Button>

                {onScheduleCall && (
                  <Button
                    variant="bordered"
                    size="lg"
                    onPress={onScheduleCall}
                    className="px-8"
                    startContent={<Calendar className="w-5 h-5" />}
                  >
                    Schedule Expert Call
                  </Button>
                )}
              </div>

              {/* Contact Support */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Need help getting started?</p>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Contact our success team →
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
