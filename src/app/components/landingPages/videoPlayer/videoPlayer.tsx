import React, { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';

interface VideoPlayerProps {
  src: string;
  thumbnail: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[640px] rounded-3xl aspect-w-16 aspect-h-9">
      {!isPlaying && (
        <div
          className="thumbnail absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-3xl hover:opacity-75 transition-opacity"
          style={{ backgroundImage: `url(${thumbnail})` }}
          onClick={togglePlay}
        >
          <div className="play-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <AiFillPlayCircle className="text-white text-8xl" />
          </div>
        </div>
      )}
      {isPlaying && (
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-3xl"
          src={`${src}?autoplay=1`}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
