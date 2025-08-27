import React from 'react';
import { Shield, Users, TrendingUp, Award, CheckCircle, Star } from 'lucide-react';

interface TrustSignalProps {
  variant?: 'compact' | 'full';
  showStats?: boolean;
}

const TrustSignals: React.FC<TrustSignalProps> = ({ variant = 'full', showStats = true }) => {
  const trustPoints = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data is protected with enterprise-grade encryption',
      stat: '256-bit SSL',
    },
    {
      icon: Users,
      title: 'Trusted by Professionals',
      description: 'Join thousands of verified business owners and investors',
      stat: '5,000+ users',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: '€50M+ in successful business transactions facilitated',
      stat: '€50M+ deals',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Winner of European FinTech Awards for M&A Innovation',
      stat: 'Award winning',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">5,000+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">€50M+ Deals</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Join a Trusted Platform</h3>
        <p className="text-gray-600">
          BetweenDeals is the secure, professional platform for business transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trustPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{point.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{point.description}</p>
                {showStats && (
                  <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    {point.stat}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Proof */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">4.8/5</span> from 200+ reviews
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-700 font-medium">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
