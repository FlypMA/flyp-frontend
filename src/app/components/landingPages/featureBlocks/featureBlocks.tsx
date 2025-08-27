import React from 'react';
import { FaPlay } from 'react-icons/fa';

interface FeatureBlockProps {
  title: string;
  description: string;
  videoSrc: string;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, description, videoSrc }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg w-full h-96">
      <video
        className="absolute w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white text-center mt-2">{description}</p>
        <FaPlay className="mt-4 text-white" size="2em" />
      </div>
    </div>
  );
};

export default FeatureBlock;
