// 🚫 404 Not Found Page - Clean error handling
// Location: src/app/pages/error/404/noPage.tsx
// Purpose: Professional 404 page with helpful navigation

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import Container from '../../../../shared/components/ui/Container';
// TODO: Import SEO when available
// import { SEOHead } from '../../../components/SEO';
// import { getSEOData } from '../../../constants/seoData';

const NoPage = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: Home,
      title: 'Go Home',
      description: 'Return to our homepage',
      action: () => navigate('/'),
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Search,
      title: 'Browse Businesses',
      description: 'Find businesses for sale',
      action: () => navigate('/search'),
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: HelpCircle,
      title: 'Get Help',
      description: 'Visit our help center',
      action: () => navigate('/help'),
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <>
      {/* TODO: Add SEO when available */}
      {/* <SEOHead {...getSEOData('notFound')} /> */}

      <div className="min-h-screen bg-white flex items-center">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Hero */}
            <div className="mb-12">
              <div className="text-8xl md:text-9xl font-bold text-neutral-200 mb-8">404</div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Page Not Found
              </h1>
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                The page you're looking for doesn't exist or has been moved. Don't worry, let's get
                you back on track.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className="border border-neutral-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  isPressable
                  onPress={suggestion.action}
                >
                  <CardBody className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${suggestion.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors`}
                    >
                      <suggestion.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {suggestion.title}
                    </h3>
                    <p className="text-neutral-600">{suggestion.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Back Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="bordered"
                size="lg"
                startContent={<ArrowLeft className="w-5 h-5" />}
                onPress={() => window.history.back()}
                className="font-medium"
              >
                Go Back
              </Button>
              <Button
                color="primary"
                size="lg"
                onPress={() => navigate('/')}
                className="font-medium"
              >
                Take Me Home
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-12 p-6 bg-neutral-50 rounded-xl">
              <p className="text-neutral-600">
                Still can't find what you're looking for?
                <button
                  onClick={() => navigate('/contact')}
                  className="text-blue-600 hover:text-blue-700 font-semibold ml-1"
                >
                  Contact our support team
                </button>{' '}
                for assistance.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NoPage;
