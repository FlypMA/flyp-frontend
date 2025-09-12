// 🖼️ ImageGalleryModal - Airbnb-style image gallery
// Location: src/features/listings/components/ImageGalleryModal.tsx
// Purpose: Professional image gallery matching legacy design exactly

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@heroui/react';
import { ChevronLeft, ChevronRight, X, Grid, Download, Share2 } from 'lucide-react';

interface ListingImage {
  id: string;
  storage_url: string;
  thumbnail_url: string;
  is_primary: boolean;
  alt_text?: string;
}

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ListingImage[];
  initialImageIndex?: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  initialImageIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [showThumbnails, setShowThumbnails] = useState(false);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') onClose();
  };

  const handleImageShare = async () => {
    if (navigator.share && currentImage) {
      try {
        await navigator.share({
          title: 'Business Listing Image',
          url: currentImage.storage_url,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(currentImage.storage_url);
      }
    }
  };

  const handleImageDownload = () => {
    if (currentImage) {
      const link = document.createElement('a');
      link.href = currentImage.storage_url;
      link.download = `business-image-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      hideCloseButton
      classNames={{
        base: 'bg-black/95',
        backdrop: 'bg-black/80',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center gap-4 text-white">
                <h3 className="text-lg font-semibold">
                  {currentIndex + 1} / {images.length}
                </h3>
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  startContent={<Grid className="w-4 h-4" />}
                  onPress={() => setShowThumbnails(!showThumbnails)}
                >
                  {showThumbnails ? 'Hide' : 'Show'} All Photos
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  startContent={<Share2 className="w-4 h-4" />}
                  onPress={handleImageShare}
                >
                  Share
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  startContent={<Download className="w-4 h-4" />}
                  onPress={handleImageDownload}
                >
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  isIconOnly
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  onPress={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </ModalHeader>

            <ModalBody
              className="p-0 flex flex-col h-screen"
              onKeyDown={handleKeyPress}
              tabIndex={0}
            >
              {/* Main Image Display */}
              <div className="flex-1 flex items-center justify-center relative">
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      size="lg"
                      variant="flat"
                      isIconOnly
                      className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 text-white border-white/20"
                      onPress={goToPrevious}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      size="lg"
                      variant="flat"
                      isIconOnly
                      className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 text-white border-white/20"
                      onPress={goToNext}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </>
                )}

                {/* Current Image */}
                <div className="max-w-full max-h-full flex items-center justify-center p-8">
                  <img
                    src={currentImage.storage_url}
                    alt={currentImage.alt_text || `Image ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{ maxHeight: 'calc(100vh - 200px)' }}
                  />
                </div>
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <div className="text-white text-center">
                  {currentImage.alt_text && (
                    <p className="text-sm opacity-80 mb-2">{currentImage.alt_text}</p>
                  )}

                  {/* Image Navigation Dots */}
                  {images.length > 1 && (
                    <div className="flex justify-center gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {showThumbnails && (
                <div className="absolute bottom-20 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex gap-2 justify-center overflow-x-auto max-w-full">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => {
                          setCurrentIndex(index);
                          setShowThumbnails(false);
                        }}
                        className={`flex-shrink-0 relative ${
                          index === currentIndex
                            ? 'ring-2 ring-white'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image.thumbnail_url || image.storage_url}
                          alt={image.alt_text || `Thumbnail ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        {index === currentIndex && (
                          <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImageGalleryModal;
