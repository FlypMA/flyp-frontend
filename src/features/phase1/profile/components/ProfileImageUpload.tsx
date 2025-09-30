/**
 * 📸 Profile Image Upload Component
 *
 * Component for uploading and managing profile images
 */

import { Button } from '@/shared/components/buttons';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { AlertCircle, Camera, Check, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfileImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onUpload: (_file: File) => void;
  onDelete?: () => void;
  currentImage?: string;
  className?: string;
}

// =============================================================================
// PROFILE IMAGE UPLOAD COMPONENT
// =============================================================================

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  isOpen,
  onClose,
  onUpload,
  onDelete,
  currentImage,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      await onUpload(selectedFile);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    setUploading(true);
    setError(null);

    try {
      await onDelete();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setUploading(false);
    onClose();
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderUploadArea = () => (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload a new profile photo</h3>
          <p className="text-gray-600 mb-4">
            Drag and drop an image here, or click to select a file
          </p>
          <Button
            variant="secondary"
            color="primary"
            onPress={handleCameraClick}
            startContent={<Camera className="w-4 h-4" />}
          >
            Choose File
          </Button>
        </div>
        <p className="text-xs text-gray-500">JPG, PNG, or GIF. Max size 5MB.</p>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mx-auto w-32 h-32 bg-gray-100 rounded-full overflow-hidden mb-4">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {selectedFile ? 'Preview your new photo' : 'Current profile photo'}
        </h3>
        {selectedFile && (
          <p className="text-sm text-gray-600">
            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        </div>
      )}
    </div>
  );

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" className={className}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Profile Photo</h2>
          <p className="text-sm text-gray-600">
            Upload a professional photo to build trust and credibility
          </p>
        </ModalHeader>
        <ModalBody>{selectedFile || currentImage ? renderPreview() : renderUploadArea()}</ModalBody>
        <ModalFooter>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {currentImage && (
                <Button
                  variant="secondary"
                  color="danger"
                  onPress={handleDelete}
                  isLoading={uploading}
                  startContent={!uploading && <X className="w-4 h-4" />}
                >
                  Delete Photo
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                color="default"
                onPress={handleClose}
                isDisabled={uploading}
              >
                Cancel
              </Button>
              {selectedFile && (
                <Button
                  variant="primary"
                  color="primary"
                  onPress={handleUpload}
                  isLoading={uploading}
                  startContent={!uploading && <Check className="w-4 h-4" />}
                >
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
              )}
            </div>
          </div>
        </ModalFooter>
      </ModalContent>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </Modal>
  );
};

export default ProfileImageUpload;
