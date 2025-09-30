// 🏢 Photos & Documents Step - Implementation
// Location: src/features/phase1/business/listing/steps/PhotosDocumentsStep.tsx
// Purpose: Upload photos and documents for the listing (Step 3 of streamlined flow)

import React, { useState } from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const PhotosDocumentsStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [documentCategories] = useState([
    { id: 'financial', label: 'Financial Documents', icon: '💰', optional: true },
    { id: 'legal', label: 'Legal Documents', icon: '📋', optional: true },
    { id: 'operational', label: 'Operational Documents', icon: '⚙️', optional: true },
    { id: 'marketing', label: 'Marketing Materials', icon: '📊', optional: true },
  ]);

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setPhotoFiles(prev => [...prev, ...imageFiles]);

    // Update parent state
    onDataChange({
      photosDocuments: {
        businessPhotos: imageFiles,
        financialDocuments: [],
        legalDocuments: [],
        operationalDocuments: [],
        marketingMaterials: [],
      },
    });
  };

  const removePhoto = (index: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📸</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Photos & Documents</h2>
        <p className="text-gray-600">Add visual appeal and supporting documents to your listing</p>
      </div>

      {/* Business Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Photos (Optional)
        </label>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all
            ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }
          `}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">
                Drag and drop photos here, or click to browse
              </p>
              <p className="text-sm text-gray-500">Supports: JPG, PNG, WEBP (max 10MB each)</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Choose Photos
            </label>
          </div>
        </div>

        {/* Photo Preview Grid */}
        {photoFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {photoFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                  aria-label="Remove photo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2">
          💡 <span className="font-medium">Tip:</span> High-quality photos increase buyer interest
          by up to 300%
        </p>
      </div>

      {/* Documents Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Supporting Documents (All Optional)
        </label>

        <div className="space-y-4">
          {documentCategories.map(category => (
            <div
              key={category.id}
              className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{category.label}</h3>
                    <p className="text-sm text-gray-500">
                      {category.id === 'financial' && 'P&L statements, balance sheets, tax returns'}
                      {category.id === 'legal' && 'Business licenses, contracts, leases'}
                      {category.id === 'operational' && 'SOPs, supplier lists, inventory reports'}
                      {category.id === 'marketing' && 'Marketing plans, customer data, analytics'}
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id={`${category.id}-upload`}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
                <label
                  htmlFor={`${category.id}-upload`}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Upload
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Photo & Document Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Photos are optional but highly recommended (3-10 photos ideal)</li>
              <li>• Show your business in the best light - clean, professional photos</li>
              <li>• Documents help build trust but can be shared later during due diligence</li>
              <li>• All files are encrypted and only shared with qualified buyers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skip Option */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          You can add photos and documents later from your dashboard
        </p>
      </div>
    </div>
  );
};

export default PhotosDocumentsStep;
