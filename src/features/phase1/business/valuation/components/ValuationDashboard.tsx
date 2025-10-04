/**
 * 🏢 Valuation Dashboard - Comprehensive Business Valuation Management
 * Location: src/features/business/components/ValuationDashboard.tsx
 * Purpose: Complete valuation dashboard matching legacy app functionality
 *
 * Features:
 * - Current valuation display with quick stats
 * - Historical valuations timeline
 * - Valuation resources and tools
 * - Modern tabbed interface
 * - Action buttons for creating/updating valuations
 */

import { Button } from '@/shared/components/buttons';
import { ModernTabContent, ModernTabs } from '@/shared/components/tabs/Tabs';
import { Card, CardBody, CardHeader } from '@heroui/react';
import {
  BarChart3,
  BookOpen,
  Calculator,
  FileText,
  History,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import ValuationReportCard from './ValuationReportCard';

interface BusinessValuation {
  id: string;
  estimated_value: number;
  currency: string;
  valuation_date: string;
  confidence_level: 'high' | 'medium' | 'low';
  methodology: string;
  status: 'completed' | 'in_progress' | 'draft' | 'expired';
  last_updated?: string;
  revenue_multiple?: number;
  ebitda_multiple?: number;
  industry_average?: number;
  market_conditions?: string;
  key_drivers?: string[];
  risk_factors?: string[];
  next_review_date?: string;
}

interface ValuationDashboardProps {
  currentValuation?: BusinessValuation | null;
  historicalValuations?: BusinessValuation[];
  onCreateValuation?: () => void;
  onUpdateValuation?: () => void;
  onCreateListing?: () => void;
}

const ValuationDashboard: React.FC<ValuationDashboardProps> = ({
  currentValuation,
  historicalValuations = [],
  onCreateValuation,
  onUpdateValuation,
  onCreateListing,
}) => {
  const [selectedTab, setSelectedTab] = useState('current');

  // Define tabs for the ModernTabs component
  const valuationTabs = [
    {
      id: 'current',
      label: 'Current Valuation',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'history',
      label: 'Valuation History',
      icon: <History className="w-4 h-4" />,
      badge: historicalValuations.length > 0 ? historicalValuations.length.toString() : undefined,
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  const getValuationTrend = () => {
    if (!historicalValuations.length || historicalValuations.length < 2) return null;

    const sortedValuations = [...historicalValuations].sort(
      (a, b) => new Date(a.valuation_date).getTime() - new Date(b.valuation_date).getTime()
    );

    const latest = sortedValuations[sortedValuations.length - 1];
    const previous = sortedValuations[sortedValuations.length - 2];

    const change =
      ((latest.estimated_value - previous.estimated_value) / previous.estimated_value) * 100;
    return {
      change,
      isPositive: change > 0,
      previousValue: previous.estimated_value,
      latestValue: latest.estimated_value,
    };
  };

  const trend = getValuationTrend();

  const handleCreateValuation = () => {
    if (onCreateValuation) {
      onCreateValuation();
    }
  };

  const handleUpdateValuation = () => {
    if (onUpdateValuation) {
      onUpdateValuation();
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Valuation</h2>
          <p className="text-gray-600">Manage and track your business valuation over time</p>
        </div>

        <div className="flex items-center space-x-3">
          {currentValuation && (
            <Button
              variant="tertiary"
              startContent={<TrendingUp className="w-4 h-4" />}
              onPress={handleUpdateValuation}
            >
              Update Valuation
            </Button>
          )}
          <Button
            variant="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={handleCreateValuation}
          >
            {currentValuation ? 'New Valuation' : 'Start Valuation'}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {currentValuation && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200">
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-gray-900">
                €{(currentValuation.estimated_value / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Current Value</div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-gray-900">
                {currentValuation.confidence_level.toUpperCase()}
              </div>
              <div className="text-sm text-gray-600">Confidence</div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="text-center p-4">
              <div
                className={`text-2xl font-bold ${trend?.isPositive ? 'text-green-600' : trend?.change ? 'text-red-600' : 'text-gray-900'}`}
              >
                {trend ? `${trend.isPositive ? '+' : ''}${trend.change.toFixed(1)}%` : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">vs. Previous</div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-gray-900">
                {historicalValuations.length + (currentValuation ? 1 : 0)}
              </div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <ModernTabs
        tabs={valuationTabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
        variant="pills"
        size="md"
        className="w-full"
      >
        <div className="mt-6">
          <ModernTabContent tabId="current">
            <div className="space-y-6">
              {/* Financial Disclaimer */}
              <Card className="border border-amber-200 bg-amber-50">
                <CardBody className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 text-sm font-bold">!</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-amber-800 mb-1">
                        Financial Disclaimer
                      </h4>
                      <p className="text-sm text-amber-700">
                        This valuation is for informational purposes only and should not be
                        considered as financial advice. Consult with a qualified professional for
                        investment decisions.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Current Valuation Report */}
              {currentValuation && (
                <ValuationReportCard
                  report={currentValuation}
                  onView={() => {}}
                  onDownload={() => {}}
                  onShare={() => {}}
                  onEdit={() => {}}
                  onCreateListing={onCreateListing}
                />
              )}
            </div>
          </ModernTabContent>

          <ModernTabContent tabId="history">
            <div className="space-y-6">
              {historicalValuations.length === 0 ? (
                <Card className="border border-gray-200">
                  <CardBody className="text-center py-12">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Historical Valuations
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your valuation history will appear here as you create new reports over time.
                    </p>
                    <Button
                      variant="primary"
                      onPress={handleCreateValuation}
                      startContent={<Plus className="w-4 h-4" />}
                    >
                      Create First Valuation
                    </Button>
                  </CardBody>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Valuation Timeline Chart */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-primary-600" />
                        <h3 className="font-semibold text-gray-900">Valuation Trend</h3>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Chart visualization would go here</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Historical Reports List */}
                  <div className="space-y-3">
                    {historicalValuations.map((valuation) => (
                      <Card key={valuation.id} className="border border-gray-200">
                        <CardBody className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <FileText className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  €{valuation.estimated_value.toLocaleString()}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(valuation.valuation_date).toLocaleDateString()} •{' '}
                                  {valuation.methodology}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  valuation.confidence_level === 'high'
                                    ? 'bg-gray-100 text-green-700'
                                    : valuation.confidence_level === 'medium'
                                      ? 'bg-gray-100 text-gray-700'
                                      : 'bg-gray-100 text-red-700'
                                }`}
                              >
                                {valuation.confidence_level.toUpperCase()}
                              </div>
                              <Button size="sm" variant="tertiary">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ModernTabContent>

          <ModernTabContent tabId="resources">
            <div className="space-y-6">
              {/* Valuation Resources */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-gray-200 shadow-sm">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Calculator className="w-8 h-8 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Valuation Calculator</h3>
                        <p className="text-gray-600 text-sm">Quick estimate using multiples</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full"
                      endContent={<Sparkles className="w-4 h-4" />}
                    >
                      Try Calculator
                    </Button>
                  </CardBody>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <BookOpen className="w-8 h-8 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Valuation Guide</h3>
                        <p className="text-gray-600 text-sm">Learn valuation methods</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full"
                      endContent={<BookOpen className="w-4 h-4" />}
                    >
                      Read Guide
                    </Button>
                  </CardBody>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="w-8 h-8 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Industry Benchmarks</h3>
                        <p className="text-gray-600 text-sm">Compare with similar businesses</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full"
                      endContent={<Target className="w-4 h-4" />}
                    >
                      View Benchmarks
                    </Button>
                  </CardBody>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <TrendingUp className="w-8 h-8 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Market Trends</h3>
                        <p className="text-gray-600 text-sm">Current M&A market insights</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full"
                      endContent={<TrendingUp className="w-4 h-4" />}
                    >
                      View Trends
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </ModernTabContent>
        </div>
      </ModernTabs>
    </div>
  );
};

export default ValuationDashboard;
