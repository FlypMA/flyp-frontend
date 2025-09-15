// 📝 Heading 1 Component - Consistent primary headings
// Location: src/shared/components/ui/Heading1.tsx
// Purpose: Standard H1 typography component

import React from 'react';

interface Heading1Props {
  children: React.ReactNode;
  className?: string;
}

const Heading1: React.FC<Heading1Props> = ({ children, className = '' }) => {
  return (
    <h1 className={`text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight ${className}`}>
      {children}
    </h1>
  );
};

export default Heading1;
