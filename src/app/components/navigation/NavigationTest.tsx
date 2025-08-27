import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import { Home, Search, Building2, Settings, LogOut } from 'lucide-react';

const NavigationTest: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-2xl mx-auto">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Navigation Test</h1>
          <p className="text-gray-600 mb-6">
            This page tests that all navigation links work properly from the seller dashboard.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/">
                <Button
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={<Home className="w-4 h-4" />}
                >
                  Go to Home
                </Button>
              </Link>

              <Link to="/search">
                <Button
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={<Search className="w-4 h-4" />}
                >
                  Search Businesses
                </Button>
              </Link>

              <Link to="/seller/dashboard">
                <Button
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={<Building2 className="w-4 h-4" />}
                >
                  Seller Dashboard
                </Button>
              </Link>

              <Link to="/account/settings">
                <Button
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={<Settings className="w-4 h-4" />}
                >
                  Account Settings
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h2>
              <div className="flex flex-wrap gap-2">
                <Link to="/for-sellers">
                  <Button size="sm" variant="light">
                    For Sellers
                  </Button>
                </Link>
                <Link to="/search">
                  <Button size="sm" variant="light">
                    For Buyers
                  </Button>
                </Link>

                <Link to="/about">
                  <Button size="sm" variant="light">
                    About
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="sm" variant="light">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NavigationTest;
