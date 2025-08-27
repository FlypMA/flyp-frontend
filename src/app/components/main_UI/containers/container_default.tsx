import React from 'react';

interface ContainerDefaultProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerDefault: React.FC<ContainerDefaultProps> = ({ children, className = '' }) => {
  return <div className={`container mx-auto px-4 ${className}`}>{children}</div>;
};

export default ContainerDefault;
