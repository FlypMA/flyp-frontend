import React from 'react';

export interface LogoProps {
  src: string;
  alt: string;
}

interface BrandLogosProps {
  logos: LogoProps[];
}

const BrandLogos: React.FC<BrandLogosProps> = ({ logos }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 justify-center items-center gap-4">
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="w-auto h-12 mx-2 opacity-75"
          style={{ filter: 'grayscale(100%)' }}
        />
      ))}
    </div>
  );
};

export default BrandLogos;
