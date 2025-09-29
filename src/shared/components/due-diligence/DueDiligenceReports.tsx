/**
 * Due Diligence Reports
 * Location: src/shared/components/due-diligence/DueDiligenceReports.tsx
 * Purpose: Report generation and management for due diligence process
 */

import { Button } from '@/shared/components/buttons';
import { DueDiligenceReport } from '@/shared/types/due-diligence';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import {
  AlertTriangle,
  CheckCircle,
  Download,
  FileText,
  Plus,
  TrendingDown,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DueDiligenceReportsProps {
  processId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
}

const DueDiligenceReports: React.FC<DueDiligenceReportsProps> = ({ processId, userRole }) => {
  const [reports, setReports] = useState<DueDiligenceReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadReports();
  }, [processId]);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dueDiligenceService.getReports(processId);
      // setReports(response.data);

      // Mock data for now
      const mockReports: DueDiligenceReport[] = [
        {
          id: 'report-1',
          processId,
          type: 'interim',
          title: 'Financial Due Diligence - Interim Report',
          content: 'This interim report covers the financial analysis completed to date...',
          generatedBy: 'advisor-1',
          generatedAt: '2024-01-20T15:30:00Z',
          status: 'approved',
          findings: [
            {
              id: 'finding-1',
              category: 'financial',
              title: 'Strong Revenue Growth',
              description: 'Revenue has grown consistently over the past 3 years with 15% CAGR.',
              severity: 'low',
              impact: 'positive',
              evidence: ['doc-1', 'doc-2'],
              recommendations: ['Continue current growth strategy'],
            },
            {
              id: 'finding-2',
              category: 'financial',
              title: 'High Customer Concentration',
              description:
                'Top 3 customers represent 45% of total revenue, creating concentration risk.',
              severity: 'medium',
              impact: 'negative',
              evidence: ['doc-3'],
              recommendations: ['Diversify customer base', 'Implement customer retention programs'],
            },
          ],
          recommendations: [
            {
              id: 'rec-1',
              title: 'Customer Diversification Strategy',
              description: 'Develop a plan to reduce customer concentration risk',
              priority: 'high',
              category: 'financial',
              estimatedCost: 50000,
              estimatedTimeframe: '6 months',
              responsibleParty: 'buyer',
            },
          ],
          riskAssessment: {
            overallRisk: 'medium',
            financialRisk: 'medium',
            operationalRisk: 'low',
            legalRisk: 'low',
            marketRisk: 'medium',
            risks: [
              {
                id: 'risk-1',
                title: 'Customer Concentration Risk',
                description: 'High dependence on top customers',
                category: 'financial',
                probability: 'medium',
                impact: 'high',
                severity: 'medium',
              },
            ],
            mitigations: [
              {
                id: 'mit-1',
                riskId: 'risk-1',
                title: 'Customer Diversification',
                description: 'Expand customer base to reduce concentration',
                effectiveness: 'high',
                cost: 'medium',
                timeframe: '6-12 months',
              },
            ],
          },
          attachments: ['doc-1', 'doc-2', 'doc-3'],
        },
        {
          id: 'report-2',
          processId,
          type: 'summary',
          title: 'Legal Due Diligence - Summary Report',
          content: 'Legal review completed with no major issues identified...',
          generatedBy: 'advisor-1',
          generatedAt: '2024-01-18T12:00:00Z',
          status: 'review',
          findings: [],
          recommendations: [],
          riskAssessment: {
            overallRisk: 'low',
            financialRisk: 'low',
            operationalRisk: 'low',
            legalRisk: 'low',
            marketRisk: 'low',
            risks: [],
            mitigations: [],
          },
          attachments: ['doc-4', 'doc-5'],
        },
      ];

      setReports(mockReports);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async (type: 'interim' | 'final' | 'summary') => {
    setIsGenerating(true);
    try {
      // TODO: Replace with actual API call
      // await dueDiligenceService.generateReport(processId, type);

      // Mock report generation
      const newReport: DueDiligenceReport = {
        id: `report-${Date.now()}`,
        processId,
        type,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Due Diligence Report`,
        content: `This ${type} report has been generated based on the current due diligence progress...`,
        generatedBy:
          userRole === 'buyer' ? 'buyer-1' : userRole === 'seller' ? 'seller-1' : 'advisor-1',
        generatedAt: new Date().toISOString(),
        status: 'draft',
        findings: [],
        recommendations: [],
        riskAssessment: {
          overallRisk: 'low',
          financialRisk: 'low',
          operationalRisk: 'low',
          legalRisk: 'low',
          marketRisk: 'low',
          risks: [],
          mitigations: [],
        },
        attachments: [],
      };

      setReports(prev => [newReport, ...prev]);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = async (report: DueDiligenceReport) => {
    try {
      // TODO: Replace with actual API call
      // await dueDiligenceService.downloadReport(report.id);

      // Mock download
      const link = document.createElement('a');
      link.href = `/api/reports/${report.id}/download`;
      link.download = `${report.title}.pdf`;
      link.click();
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'review':
        return 'warning';
      case 'draft':
        return 'default';
      case 'published':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'review':
        return <AlertTriangle className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      case 'critical':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'high':
      case 'critical':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Reports ({reports.length})</h3>
          <p className="text-sm text-gray-600">Generate and manage due diligence reports</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onPress={() => generateReport('summary')}
            isLoading={isGenerating}
            startContent={<Plus className="w-4 h-4" />}
          >
            Summary Report
          </Button>
          <Button
            variant="primary"
            onPress={() => generateReport('interim')}
            isLoading={isGenerating}
            startContent={<Plus className="w-4 h-4" />}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports yet</h3>
                <p className="text-gray-600 mb-4">
                  Generate your first due diligence report to get started.
                </p>
                <Button
                  variant="primary"
                  onPress={() => generateReport('summary')}
                  startContent={<Plus className="w-4 h-4" />}
                >
                  Generate Summary Report
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          reports.map(report => (
            <Card key={report.id} className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
                      <p className="text-sm text-gray-600">
                        Generated by {report.generatedBy} on{' '}
                        {new Date(report.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip
                      color={getStatusColor(report.status)}
                      variant="flat"
                      startContent={getStatusIcon(report.status)}
                    >
                      {report.status}
                    </Chip>
                    <Button
                      size="sm"
                      variant="secondary"
                      onPress={() => downloadReport(report)}
                      startContent={<Download className="w-4 h-4" />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <p className="text-gray-700">{report.content}</p>

                  {/* Risk Assessment Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Risk Assessment</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="flex justify-center mb-1">
                          {getRiskIcon(report.riskAssessment.overallRisk)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Overall</div>
                        <Chip
                          size="sm"
                          color={getRiskColor(report.riskAssessment.overallRisk)}
                          variant="flat"
                        >
                          {report.riskAssessment.overallRisk}
                        </Chip>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-1">
                          {getRiskIcon(report.riskAssessment.financialRisk)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Financial</div>
                        <Chip
                          size="sm"
                          color={getRiskColor(report.riskAssessment.financialRisk)}
                          variant="flat"
                        >
                          {report.riskAssessment.financialRisk}
                        </Chip>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-1">
                          {getRiskIcon(report.riskAssessment.operationalRisk)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Operational</div>
                        <Chip
                          size="sm"
                          color={getRiskColor(report.riskAssessment.operationalRisk)}
                          variant="flat"
                        >
                          {report.riskAssessment.operationalRisk}
                        </Chip>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-1">
                          {getRiskIcon(report.riskAssessment.legalRisk)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Legal</div>
                        <Chip
                          size="sm"
                          color={getRiskColor(report.riskAssessment.legalRisk)}
                          variant="flat"
                        >
                          {report.riskAssessment.legalRisk}
                        </Chip>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-1">
                          {getRiskIcon(report.riskAssessment.marketRisk)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Market</div>
                        <Chip
                          size="sm"
                          color={getRiskColor(report.riskAssessment.marketRisk)}
                          variant="flat"
                        >
                          {report.riskAssessment.marketRisk}
                        </Chip>
                      </div>
                    </div>
                  </div>

                  {/* Key Findings */}
                  {report.findings.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Key Findings</h5>
                      <div className="space-y-2">
                        {report.findings.slice(0, 3).map(finding => (
                          <div
                            key={finding.id}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-shrink-0 mt-1">
                              {finding.impact === 'positive' ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : finding.impact === 'negative' ? (
                                <XCircle className="w-4 h-4 text-red-600" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{finding.title}</h6>
                              <p className="text-sm text-gray-600">{finding.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Chip
                                  size="sm"
                                  color={getRiskColor(finding.severity)}
                                  variant="flat"
                                >
                                  {finding.severity} severity
                                </Chip>
                                <Chip
                                  size="sm"
                                  color={
                                    finding.impact === 'positive'
                                      ? 'success'
                                      : finding.impact === 'negative'
                                        ? 'danger'
                                        : 'warning'
                                  }
                                  variant="flat"
                                >
                                  {finding.impact} impact
                                </Chip>
                              </div>
                            </div>
                          </div>
                        ))}
                        {report.findings.length > 3 && (
                          <p className="text-sm text-gray-500 text-center">
                            +{report.findings.length - 3} more findings
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {report.recommendations.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Recommendations</h5>
                      <div className="space-y-2">
                        {report.recommendations.slice(0, 2).map(rec => (
                          <div
                            key={rec.id}
                            className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                          >
                            <div className="flex-shrink-0 mt-1">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{rec.title}</h6>
                              <p className="text-sm text-gray-600">{rec.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Chip size="sm" color={getRiskColor(rec.priority)} variant="flat">
                                  {rec.priority} priority
                                </Chip>
                                {rec.estimatedCost && (
                                  <span className="text-xs text-gray-500">
                                    Est. cost: €{rec.estimatedCost.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {report.recommendations.length > 2 && (
                          <p className="text-sm text-gray-500 text-center">
                            +{report.recommendations.length - 2} more recommendations
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  {report.attachments.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Attachments</h5>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{report.attachments.length} document(s) attached</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DueDiligenceReports;
