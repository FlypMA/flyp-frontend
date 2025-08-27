import React from 'react';

interface Heading3Props {
  children: React.ReactNode;
  className?: string;
}

const Heading3: React.FC<Heading3Props> = ({ children, className = '' }) => {
  return <h3 className={`text-2xl font-medium ${className}`}>{children}</h3>;
};

export default Heading3;
