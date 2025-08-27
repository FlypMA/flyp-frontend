import React from 'react';

interface Heading1Props {
  children: React.ReactNode;
  className?: string;
}

const Heading1: React.FC<Heading1Props> = ({ children, className = '' }) => {
  return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
};

export default Heading1;
