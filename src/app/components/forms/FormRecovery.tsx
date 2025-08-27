import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import {
  RotateCcw,
  Save,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
} from 'lucide-react';

interface SavedFormData {
  formKey: string;
  title: string;
  description: string;
  lastSaved: string;
  progress: number;
  stepCount: number;
  currentStep: string;
  dataSize: number;
}

interface FormRecoveryProps {
  savedData?: SavedFormData;
  onRestore: () => void;
  onDiscard: () => void;
  onStartFresh: () => void;
  isVisible?: boolean;
  className?: string;
}

const FormRecovery: React.FC<FormRecoveryProps> = ({
  savedData,
  onRestore,
  onDiscard,
  onStartFresh,
  isVisible = true,
  className = '',
}) => {
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  if (!savedData || !isVisible) {
    return null;
  }

  const formatLastSaved = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const formatDataSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDiscardConfirm = () => {
    setShowDiscardModal(false);
    onDiscard();
  };

  return (
    <>
      <Card className={`border-2 border-warning-200 bg-warning-50 ${className}`}>
        <CardBody className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-warning-100 rounded-lg">
              <RotateCcw className="w-6 h-6 text-warning-600" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-warning-900 mb-2">Previous Work Found</h3>
              <p className="text-warning-800 mb-4">
                We found a saved draft of your {savedData.title.toLowerCase()}. Would you like to
                continue where you left off?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-warning-700">
                    <Clock className="w-4 h-4" />
                    <span>Last saved: {formatLastSaved(savedData.lastSaved)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-warning-700">
                    <FileText className="w-4 h-4" />
                    <span>Current step: {savedData.currentStep}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-warning-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Progress: {savedData.progress}% complete</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-warning-700">
                    <Save className="w-4 h-4" />
                    <span>Data size: {formatDataSize(savedData.dataSize)}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-warning-700">Form Progress</span>
                  <span className="text-xs text-warning-600">{savedData.progress}%</span>
                </div>
                <div className="w-full bg-warning-200 rounded-full h-2">
                  <div
                    className="bg-warning-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${savedData.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  color="warning"
                  variant="solid"
                  onPress={onRestore}
                  startContent={<RotateCcw className="w-4 h-4" />}
                  className="flex-1"
                >
                  Continue Previous Work
                </Button>

                <Button variant="bordered" onPress={onStartFresh} className="flex-1">
                  Start Fresh
                </Button>

                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setShowDiscardModal(true)}
                  startContent={<Trash2 className="w-4 h-4" />}
                  size="sm"
                >
                  Discard
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Discard Confirmation Modal */}
      <Modal isOpen={showDiscardModal} onClose={() => setShowDiscardModal(false)} size="md">
        <ModalContent>
          <ModalHeader className="flex gap-2 items-center">
            <AlertTriangle className="w-5 h-5 text-danger-500" />
            Discard Saved Work?
          </ModalHeader>
          <ModalBody>
            <p className="text-neutral-700">
              Are you sure you want to permanently delete your saved {savedData.title.toLowerCase()}
              ? This action cannot be undone.
            </p>

            <div className="p-3 bg-danger-50 rounded-lg border border-danger-200">
              <div className="text-sm text-danger-800">
                <strong>You will lose:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>{savedData.progress}% of completed progress</li>
                  <li>All form data from {savedData.stepCount} steps</li>
                  <li>Work saved {formatLastSaved(savedData.lastSaved)}</li>
                </ul>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setShowDiscardModal(false)}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleDiscardConfirm}
              startContent={<Trash2 className="w-4 h-4" />}
            >
              Delete Permanently
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Auto-save indicator component
interface AutoSaveIndicatorProps {
  isSaving?: boolean;
  lastSaved?: string;
  hasChanges?: boolean;
  className?: string;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isSaving = false,
  lastSaved,
  hasChanges = false,
  className = '',
}) => {
  const getStatus = () => {
    if (isSaving) {
      return {
        text: 'Saving...',
        icon: <Save className="w-3 h-3 animate-pulse" />,
        color: 'text-primary-600',
      };
    }

    if (hasChanges) {
      return {
        text: 'Unsaved changes',
        icon: <Clock className="w-3 h-3" />,
        color: 'text-warning-600',
      };
    }

    if (lastSaved) {
      return {
        text: `Saved ${formatTimeAgo(lastSaved)}`,
        icon: <CheckCircle className="w-3 h-3" />,
        color: 'text-success-600',
      };
    }

    return {
      text: 'Not saved',
      icon: <AlertTriangle className="w-3 h-3" />,
      color: 'text-neutral-500',
    };
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    }
  };

  const status = getStatus();

  return (
    <div className={`flex items-center gap-2 text-xs ${status.color} ${className}`}>
      {status.icon}
      <span>{status.text}</span>
    </div>
  );
};

export default FormRecovery;
