// 🎯 Transaction Context Panel
// Location: src/features/phase1/conversations/components/TransactionContextPanel.tsx
// Purpose: Shows transaction progress and quick actions in conversation view

import { Button, Chip, Progress } from '@heroui/react';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Handshake,
  Shield,
  TrendingUp,
} from 'lucide-react';
import React from 'react';
import { ConversationContext, TransactionStage } from '../types';

interface TransactionContextPanelProps {
  context: ConversationContext;
  onQuickAction: (actionId: string) => void;
  className?: string;
}

const TransactionContextPanel: React.FC<TransactionContextPanelProps> = ({
  context,
  onQuickAction,
  className = '',
}) => {
  const { currentStage, transactionState, quickActions, progress, businessContext } = context;

  const getStageIcon = (stage: TransactionStage) => {
    switch (stage) {
      case 'inquiry':
        return <FileText className="w-4 h-4" />;
      case 'nda':
        return <Shield className="w-4 h-4" />;
      case 'offer':
        return <Handshake className="w-4 h-4" />;
      case 'due_diligence':
        return <CheckCircle className="w-4 h-4" />;
      case 'transaction':
        return <TrendingUp className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStageColor = (stage: TransactionStage) => {
    switch (stage) {
      case 'inquiry':
        return 'default';
      case 'nda':
        return 'warning';
      case 'offer':
        return 'primary';
      case 'due_diligence':
        return 'secondary';
      case 'transaction':
        return 'success';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getUrgencyColor = (urgency: 'low' | 'medium' | 'high') => {
    switch (urgency) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getUrgencyIcon = (urgency: 'low' | 'medium' | 'high') => {
    switch (urgency) {
      case 'high':
        return <AlertCircle className="w-3 h-3" />;
      case 'medium':
        return <Clock className="w-3 h-3" />;
      case 'low':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div
      className={`transaction-context-panel bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getStageIcon(currentStage)}
          <h3 className="font-semibold text-blue-900">Transaction Progress</h3>
        </div>
        <Chip
          size="sm"
          color={getStageColor(currentStage)}
          variant="flat"
          startContent={getStageIcon(currentStage)}
        >
          {currentStage.replace('_', ' ').toUpperCase()}
        </Chip>
      </div>

      {/* Business Context */}
      {businessContext && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {businessContext.title}
              </h4>
              <p className="text-xs text-gray-600">
                {businessContext.sector} • {businessContext.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">
                €{(businessContext.price / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-800">Progress</span>
          <span className="text-sm text-blue-600">{progress.percentage}%</span>
        </div>
        <Progress value={progress.percentage} color="primary" className="mb-2" size="sm" />
        <div className="flex items-center justify-between text-xs text-blue-700">
          <span>{progress.currentStep}</span>
          {progress.nextStep && (
            <span className="flex items-center space-x-1">
              <span>Next: {progress.nextStep}</span>
              {progress.estimatedCompletion && (
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{progress.estimatedCompletion}</span>
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Transaction State Indicators */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-2">
          <div
            className={`flex items-center space-x-2 p-2 rounded ${transactionState.hasNDA ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <Shield
              className={`w-4 h-4 ${transactionState.hasNDA ? 'text-green-600' : 'text-gray-400'}`}
            />
            <span
              className={`text-xs ${transactionState.hasNDA ? 'text-green-800' : 'text-gray-600'}`}
            >
              NDA {transactionState.hasNDA ? 'Signed' : 'Pending'}
            </span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded ${transactionState.hasOffer ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <Handshake
              className={`w-4 h-4 ${transactionState.hasOffer ? 'text-green-600' : 'text-gray-400'}`}
            />
            <span
              className={`text-xs ${transactionState.hasOffer ? 'text-green-800' : 'text-gray-600'}`}
            >
              Offer {transactionState.hasOffer ? 'Active' : 'None'}
            </span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded ${transactionState.hasDueDiligence ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <CheckCircle
              className={`w-4 h-4 ${transactionState.hasDueDiligence ? 'text-green-600' : 'text-gray-400'}`}
            />
            <span
              className={`text-xs ${transactionState.hasDueDiligence ? 'text-green-800' : 'text-gray-600'}`}
            >
              DD {transactionState.hasDueDiligence ? 'Active' : 'None'}
            </span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded ${transactionState.hasTransaction ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <TrendingUp
              className={`w-4 h-4 ${transactionState.hasTransaction ? 'text-green-600' : 'text-gray-400'}`}
            />
            <span
              className={`text-xs ${transactionState.hasTransaction ? 'text-green-800' : 'text-gray-600'}`}
            >
              Transaction {transactionState.hasTransaction ? 'Active' : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Quick Actions</h4>
          {quickActions.map(action => (
            <Button
              key={action.id}
              size="sm"
              variant={action.urgency === 'high' ? 'solid' : 'bordered'}
              color={getUrgencyColor(action.urgency)}
              onPress={() => onQuickAction(action.id)}
              isDisabled={!action.available}
              className="w-full justify-start"
              startContent={getUrgencyIcon(action.urgency)}
            >
              <div className="flex flex-col items-start">
                <span className="text-sm">{action.label}</span>
                {action.description && (
                  <span className="text-xs opacity-70">{action.description}</span>
                )}
              </div>
            </Button>
          ))}
        </div>
      )}

      {/* Last Activity */}
      <div className="mt-4 pt-3 border-t border-blue-200">
        <div className="flex items-center space-x-2 text-xs text-blue-600">
          <Clock className="w-3 h-3" />
          <span>Last activity: {new Date(context.lastActivity).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionContextPanel;
