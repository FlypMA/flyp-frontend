// 🏢 Documents Step - Listing Wizard
// Location: src/features/phase1/business/wizard/steps/DocumentsStep.tsx
// Purpose: Step 6 - Document upload and management

import { FileText, Upload, X } from 'lucide-react';
import React from 'react';
import { Documents, StepComponentProps } from '../types';

const DocumentsStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const documents = data.documents || ({} as Documents);

  const handleFileChange = (category: keyof Documents, file: File | null) => {
    onDataChange({
      documents: {
        ...documents,
        [category]: file,
      },
    });
  };

  const handleFileUpload = (
    category: keyof Documents,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    handleFileChange(category, file);
  };

  const removeFile = (category: keyof Documents) => {
    handleFileChange(category, null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const documentCategories = [
    {
      key: 'financial' as keyof Documents,
      title: 'Financial Documents',
      description: 'Financial statements, tax returns, profit & loss statements',
      icon: '📊',
    },
    {
      key: 'legal' as keyof Documents,
      title: 'Legal Documents',
      description: 'Contracts, licenses, permits, legal agreements',
      icon: '⚖️',
    },
    {
      key: 'operations' as keyof Documents,
      title: 'Operational Documents',
      description: 'Procedures, manuals, operational guides',
      icon: '⚙️',
    },
    {
      key: 'marketing' as keyof Documents,
      title: 'Marketing Materials',
      description: 'Brand assets, marketing materials, website files',
      icon: '🎨',
    },
    {
      key: 'other' as keyof Documents,
      title: 'Other Documents',
      description: 'Any other relevant business documents',
      icon: '📄',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Business Documents</h2>
        <p className="text-neutral-600">Upload supporting documents for your listing</p>
      </div>

      <div className="space-y-6">
        {documentCategories.map(category => {
          const file = documents[category.key];

          return (
            <div key={category.key} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>

              {file ? (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">{file.name}</p>
                      <p className="text-sm text-green-700">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(category.key)}
                    className="p-1 hover:bg-green-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mb-4">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={e => handleFileUpload(category.key, e)}
                    className="hidden"
                    id={`upload-${category.key}`}
                  />
                  <label
                    htmlFor={`upload-${category.key}`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                </div>
              )}
            </div>
          );
        })}

        {/* Document Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Document Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>Financial documents</strong> should be recent (last 2-3 years)
            </li>
            <li>
              • <strong>Legal documents</strong> help establish business legitimacy
            </li>
            <li>
              • <strong>Operational documents</strong> show how the business runs
            </li>
            <li>
              • <strong>Marketing materials</strong> demonstrate brand value
            </li>
            <li>• All documents are securely stored and only shared with qualified buyers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentsStep;
