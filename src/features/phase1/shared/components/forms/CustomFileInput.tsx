// 📝 Custom File Input - Enhanced file input with consistent styling
// Location: src/shared/components/forms/CustomFileInput.tsx
// Purpose: Reusable file input component with consistent design system

import { File, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

export interface CustomFileInputProps {
  label: string;
  placeholder?: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
  error?: string;
  touched?: boolean;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  description?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  label,
  placeholder = 'Choose file or drag and drop',
  onChange,
  onBlur,
  name,
  className = '',
  error,
  touched,
  fileInputRef,
  required = false,
  disabled = false,
  accept,
  multiple = false,
  maxSize,
  description,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = fileInputRef || internalRef;
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const hasError = error && touched;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
    onChange(e);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFiles(files);
      // Create a synthetic event for consistency
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          files,
          name,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const removeFile = (index: number) => {
    if (!selectedFiles) return;

    const dt = new DataTransfer();
    for (let i = 0; i < selectedFiles.length; i++) {
      if (i !== index) {
        dt.items.add(selectedFiles[i]);
      }
    }

    setSelectedFiles(dt.files);

    // Create a synthetic event
    const syntheticEvent = {
      target: {
        files: dt.files,
        name,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label
        className={`
          block text-sm font-medium mb-2
          ${hasError ? 'text-red-600' : 'text-gray-900'}
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200
          ${isDragOver ? 'border-gray-900 bg-gray-50' : 'border-gray-300'}
          ${hasError ? 'border-red-400' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-500'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && ref.current?.click()}
      >
        <input
          ref={ref}
          type="file"
          name={name}
          onChange={handleFileChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          className="sr-only"
          aria-describedby={description ? `${name}-description` : undefined}
          aria-invalid={hasError}
        />

        <div className="flex flex-col items-center">
          <Upload className={`w-8 h-8 mb-2 ${hasError ? 'text-red-500' : 'text-gray-400'}`} />
          <p className={`text-sm ${hasError ? 'text-red-600' : 'text-gray-600'}`}>{placeholder}</p>
          {maxSize && <p className="text-xs text-gray-500 mt-1">Maximum file size: {maxSize}MB</p>}
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {Array.from(selectedFiles).map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <File className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              {!disabled && (
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {description && (
        <p id={`${name}-description`} className="text-xs text-gray-500 mt-2">
          {description}
        </p>
      )}

      {hasError && <span className="block text-sm text-red-600 mt-2 font-medium">{error}</span>}
    </div>
  );
};

export default CustomFileInput;
