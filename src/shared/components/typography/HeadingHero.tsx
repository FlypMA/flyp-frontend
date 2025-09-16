import * as React from 'react';

interface HeadingHeroProps {
  children: React.ReactNode;
  className?: string;
}

const HeadingHero: React.FC<HeadingHeroProps> = ({ children, className = '' }) => {
  return <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${className}`}>{children}</h1>;
};

export default HeadingHero;
