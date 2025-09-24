// 💬 Transaction Message Component
// Location: src/features/phase1/conversations/components/messages/TransactionMessage.tsx
// Purpose: Renders different types of transaction messages with appropriate UI

import { Button, Chip } from '@heroui/react';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Euro,
  Eye,
  FileText,
  Shield,
  TrendingUp,
} from 'lucide-react';
import React from 'react';
import { ConversationMessage } from '../../types';

interface TransactionMessageProps {
  message: ConversationMessage;
  isCurrentUser: boolean;
  onAction?: (action: string, data: unknown) => void;
  className?: string;
}

const TransactionMessage: React.FC<TransactionMessageProps> = ({
  message,
  isCurrentUser,
  onAction,
  className = '',
}) => {
  const _getMessageTypeIcon = (type: ConversationMessage['type']) => {
    switch (type) {
      case 'offer':
        return <Euro className="w-4 h-4" />;
      case 'due_diligence':
        return <CheckCircle className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'nda':
        return <Shield className="w-4 h-4" />;
      case 'transaction':
        return <TrendingUp className="w-4 h-4" />;
      case 'system':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getMessageTypeColor = (type: ConversationMessage['type']) => {
    switch (type) {
      case 'offer':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'due_diligence':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'document':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'nda':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'transaction':
        return 'bg-indigo-50 border-indigo-200 text-indigo-800';
      case 'system':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'countered':
        return 'warning';
      case 'pending':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getDueDiligenceStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'reviewed':
        return 'warning';
      case 'provided':
        return 'primary';
      case 'requested':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'primary';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const renderOfferMessage = () => {
    const { offerDetails } = message;
    if (!offerDetails) return null;

    return (
      <div className="offer-message">
        <div className="flex items-center space-x-2 mb-2">
          <Euro className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-800">
            Offer: €{(offerDetails.amount / 1000000).toFixed(1)}M
          </span>
          <Chip size="sm" color={getOfferStatusColor(offerDetails.status)}>
            {offerDetails.status}
          </Chip>
        </div>

        <p className="text-sm text-gray-700 mb-2">{message.content}</p>

        {offerDetails.terms && (
          <p className="text-xs text-gray-600 italic mb-3">{offerDetails.terms}</p>
        )}

        {offerDetails.conditions && offerDetails.conditions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Conditions:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {offerDetails.conditions.map((condition, index) => (
                <li key={index} className="flex items-start space-x-1">
                  <span>•</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {offerDetails.expirationDate && (
          <div className="flex items-center space-x-1 text-xs text-gray-600 mb-3">
            <Clock className="w-3 h-3" />
            <span>Expires: {new Date(offerDetails.expirationDate).toLocaleDateString()}</span>
          </div>
        )}

        {/* Action buttons for non-current user */}
        {!isCurrentUser && offerDetails.status === 'pending' && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              color="success"
              onPress={() => onAction?.('accept_offer', { messageId: message.id, offerDetails })}
            >
              Accept
            </Button>
            <Button
              size="sm"
              color="warning"
              onPress={() => onAction?.('counter_offer', { messageId: message.id, offerDetails })}
            >
              Counter
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="bordered"
              onPress={() => onAction?.('reject_offer', { messageId: message.id, offerDetails })}
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderDueDiligenceMessage = () => {
    const { dueDiligenceDetails } = message;
    if (!dueDiligenceDetails) return null;

    return (
      <div className="due-diligence-message">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-800">
            Due Diligence: {dueDiligenceDetails.category}
          </span>
          <Chip size="sm" color={getDueDiligenceStatusColor(dueDiligenceDetails.status)}>
            {dueDiligenceDetails.status}
          </Chip>
          <Chip size="sm" color={getPriorityColor(dueDiligenceDetails.priority)}>
            {dueDiligenceDetails.priority}
          </Chip>
        </div>

        <p className="text-sm text-gray-700 mb-2">{message.content}</p>

        {dueDiligenceDetails.deadline && (
          <div className="flex items-center space-x-1 text-xs text-gray-600 mb-3">
            <Clock className="w-3 h-3" />
            <span>Deadline: {new Date(dueDiligenceDetails.deadline).toLocaleDateString()}</span>
          </div>
        )}

        {dueDiligenceDetails.notes && (
          <p className="text-xs text-gray-600 italic mb-3">{dueDiligenceDetails.notes}</p>
        )}

        {dueDiligenceDetails.relatedDocuments &&
          dueDiligenceDetails.relatedDocuments.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-700 mb-1">Related Documents:</p>
              <div className="space-y-1">
                {dueDiligenceDetails.relatedDocuments.map((docId, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                    <FileText className="w-3 h-3" />
                    <span>Document {docId}</span>
                    <Button size="sm" variant="light" className="h-6 px-2">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Action buttons */}
        {!isCurrentUser && dueDiligenceDetails.status === 'requested' && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              color="success"
              onPress={() =>
                onAction?.('provide_document', { messageId: message.id, dueDiligenceDetails })
              }
            >
              Provide Document
            </Button>
            <Button
              size="sm"
              color="warning"
              variant="bordered"
              onPress={() =>
                onAction?.('request_clarification', { messageId: message.id, dueDiligenceDetails })
              }
            >
              Request Clarification
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderDocumentMessage = () => {
    const { documentDetails } = message;
    if (!documentDetails) return null;

    return (
      <div className="document-message">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="w-4 h-4 text-purple-600" />
          <span className="font-semibold text-purple-800">Document: {documentDetails.name}</span>
          <Chip size="sm" color="secondary">
            {documentDetails.accessLevel}
          </Chip>
        </div>

        <p className="text-sm text-gray-700 mb-2">{message.content}</p>

        <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
          <span>Type: {documentDetails.type}</span>
          <span>Size: {(documentDetails.size / 1024 / 1024).toFixed(1)} MB</span>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          {documentDetails.previewUrl && (
            <Button
              size="sm"
              color="primary"
              variant="bordered"
              onPress={() =>
                onAction?.('preview_document', { messageId: message.id, documentDetails })
              }
              startContent={<Eye className="w-3 h-3" />}
            >
              Preview
            </Button>
          )}
          {documentDetails.downloadUrl && (
            <Button
              size="sm"
              color="primary"
              onPress={() =>
                onAction?.('download_document', { messageId: message.id, documentDetails })
              }
              startContent={<Download className="w-3 h-3" />}
            >
              Download
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderNDAMessage = () => {
    const { ndaDetails } = message;
    if (!ndaDetails) return null;

    return (
      <div className="nda-message">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-orange-600" />
          <span className="font-semibold text-orange-800">NDA: {ndaDetails.status}</span>
          <Chip size="sm" color={getOfferStatusColor(ndaDetails.status)}>
            {ndaDetails.status}
          </Chip>
        </div>

        <p className="text-sm text-gray-700 mb-2">{message.content}</p>

        <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
          <span>Version: {ndaDetails.version}</span>
          {ndaDetails.signedAt && (
            <span>Signed: {new Date(ndaDetails.signedAt).toLocaleDateString()}</span>
          )}
          {ndaDetails.expiresAt && (
            <span>Expires: {new Date(ndaDetails.expiresAt).toLocaleDateString()}</span>
          )}
        </div>

        {/* Action buttons */}
        {!isCurrentUser && ndaDetails.status === 'pending' && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              color="success"
              onPress={() => onAction?.('sign_nda', { messageId: message.id, ndaDetails })}
            >
              Sign NDA
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="bordered"
              onPress={() => onAction?.('reject_nda', { messageId: message.id, ndaDetails })}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderTransactionMessage = () => {
    const { transactionDetails } = message;
    if (!transactionDetails) return null;

    return (
      <div className="transaction-message">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span className="font-semibold text-indigo-800">
            Transaction: {transactionDetails.stage}
          </span>
          <Chip size="sm" color="primary">
            {transactionDetails.stage}
          </Chip>
        </div>

        <p className="text-sm text-gray-700 mb-2">{message.content}</p>

        {transactionDetails.actionRequired && (
          <div className="flex items-center space-x-1 text-xs text-gray-600 mb-3">
            <AlertCircle className="w-3 h-3" />
            <span>Action Required: {transactionDetails.actionRequired}</span>
          </div>
        )}

        {transactionDetails.deadline && (
          <div className="flex items-center space-x-1 text-xs text-gray-600 mb-3">
            <Clock className="w-3 h-3" />
            <span>Deadline: {new Date(transactionDetails.deadline).toLocaleDateString()}</span>
          </div>
        )}

        {transactionDetails.progress !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{transactionDetails.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${transactionDetails.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSystemMessage = () => {
    return (
      <div className="system-message">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="w-4 h-4 text-gray-600" />
          <span className="font-semibold text-gray-800">System Message</span>
        </div>
        <p className="text-sm text-gray-700">{message.content}</p>
      </div>
    );
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'offer':
        return renderOfferMessage();
      case 'due_diligence':
        return renderDueDiligenceMessage();
      case 'document':
        return renderDocumentMessage();
      case 'nda':
        return renderNDAMessage();
      case 'transaction':
        return renderTransactionMessage();
      case 'system':
        return renderSystemMessage();
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div
      className={`max-w-xs lg:max-w-md ${
        isCurrentUser ? 'bg-primary-300 text-white' : `${getMessageTypeColor(message.type)}`
      } rounded-lg px-4 py-2 ${className}`}
    >
      {renderMessageContent()}

      {/* Message timestamp and read status */}
      <div
        className={`flex items-center justify-end space-x-1 mt-1 ${
          isCurrentUser ? 'text-white/70' : 'text-gray-500'
        }`}
      >
        <span className="text-xs">
          {new Date(message.sentAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </span>
        {isCurrentUser && (
          <CheckCircle
            className={`w-3 h-3 ${message.readAt ? 'text-blue-300' : 'text-white/50'}`}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionMessage;
