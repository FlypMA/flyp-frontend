/**
 * 🎥 VideoBackground Component
 *
 * Reusable video background component inspired by Airbnb, Epidemic Sound, and Fiverr
 * - Supports video with fallback to gradient/image
 * - Performance optimized with lazy loading
 * - Accessible with proper overlays
 * - Mobile-friendly with fallback backgrounds
 *
 * Usage:
 * ```tsx
 * <VideoBackground
 *   videoSrc="/videos/hero-background.mp4"
 *   fallbackImage="/images/hero-fallback.jpg"
 *   overlay="dark"
 * >
 *   <YourHeroContent />
 * </VideoBackground>
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';

export interface VideoBackgroundProps {
  /** Video source URL - mp4 format recommended */
  videoSrc?: string;
  /** Fallback image if video fails or on mobile */
  fallbackImage?: string;
  /** Fallback gradient if no image provided */
  fallbackGradient?: string;
  /** Overlay intensity: 'none' | 'light' | 'medium' | 'dark' | 'gradient' */
  overlay?: 'none' | 'light' | 'medium' | 'dark' | 'gradient';
  /** Children to render on top of video */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Disable video on mobile (better performance) */
  disableVideoOnMobile?: boolean;
  /** Video poster image (shown before load) */
  posterImage?: string;
  /** Video playback speed (default: 1) */
  playbackSpeed?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  fallbackImage,
  fallbackGradient = 'from-neutral-100 via-white to-calm-50',
  overlay = 'medium',
  children,
  className = '',
  disableVideoOnMobile = true,
  posterImage,
  playbackSpeed = 1,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current && playbackSpeed !== 1) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    console.warn('VideoBackground: Failed to load video, using fallback');
  };

  // Determine overlay class
  const overlayClasses = {
    none: '',
    light: 'bg-black/10',
    medium: 'bg-black/30',
    dark: 'bg-black/50',
    gradient: 'bg-gradient-to-b from-black/40 via-black/20 to-black/40',
  };

  const showVideo = videoSrc && !videoError && (!isMobile || !disableVideoOnMobile);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video/Background Layer */}
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <>
            {/* Video Element */}
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              loop
              muted
              playsInline
              poster={posterImage}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Fallback while video loads */}
            {!videoLoaded && (
              <div
                className={`absolute inset-0 ${
                  fallbackImage ? 'bg-cover bg-center' : `bg-gradient-to-br ${fallbackGradient}`
                }`}
                style={fallbackImage ? { backgroundImage: `url(${fallbackImage})` } : {}}
              />
            )}
          </>
        ) : (
          // Fallback background (no video)
          <div
            className={`absolute inset-0 ${
              fallbackImage ? 'bg-cover bg-center' : `bg-gradient-to-br ${fallbackGradient}`
            }`}
            style={fallbackImage ? { backgroundImage: `url(${fallbackImage})` } : {}}
          />
        )}

        {/* Overlay */}
        {overlay !== 'none' && <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default VideoBackground;

