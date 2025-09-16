// 📝 Heading 2 Component - Consistent secondary headings
// Location: src/shared/components/ui/Heading2.tsx
// Purpose: Standard H2 typography component

import * as React from 'react';

interface Heading2Props {
  children: React.ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({ children, className = '' }) => {
  return (
    <h2
      className={`text-xl md:text-2xl font-semibold text-slate-900 mb-4 leading-tight ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading2;
