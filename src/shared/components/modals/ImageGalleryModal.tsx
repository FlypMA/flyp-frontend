import React, { useState, useEffect } from 'react';
import { Modal, ModalContent } from '@heroui/react';
import { Button } from '../buttons/Button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryImage {
  id: string;
  storage_url: string;
  thumbnail_url: string;
  is_primary: boolean;
  alt_text?: string;
}

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageGalleryImage[];
  initialImageIndex?: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ 
  isOpen, 
  onClose, 
  images, 
  initialImageIndex = 0 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

  useEffect(() => {
    setCurrentImageIndex(initialImageIndex);
  }, [initialImageIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (images.length === 0) return null;

  const currentImage = images[currentImageIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      classNames={{
        base: 'h-full max-h-full m-0 bg-black',
        wrapper: 'h-full items-center justify-center',
        body: 'h-full p-0 overflow-hidden',
        backdrop: 'bg-black/90 backdrop-blur-sm',
      }}
      hideCloseButton={true}
      isDismissable={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
    >
      <ModalContent className="h-full max-h-full m-0 bg-black border-0 shadow-none">
        <div className="relative h-full flex flex-col">
          {/* Header with close button and image counter */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
            <div className="flex justify-between items-center">
              <div className="text-white text-sm font-medium">
                {currentImageIndex + 1} of {images.length}
              </div>
              <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                className="text-white hover:bg-white/20 backdrop-blur-sm"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Main image container */}
          <div className="flex-1 flex items-center justify-center p-6 pt-20 pb-32">
            <div className="relative max-w-full max-h-full">
              <img
                src={currentImage.storage_url}
                alt={currentImage.alt_text || `Gallery image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
              />

              {/* Navigation arrows - only show if more than 1 image */}
              {images.length > 1 && (
                <>
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border-0"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border-0"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Thumbnail strip - only show if more than 1 image */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex justify-center">
                <div className="flex gap-2 max-w-full overflow-x-auto scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-white ring-2 ring-blue-500'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={image.thumbnail_url || image.storage_url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-blue-500/20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ImageGalleryModal;
