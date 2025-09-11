// 🎨 UI Component Types
// Location: src/shared/components/ui/types.ts
// Purpose: Type definitions for UI components

export interface FAQBadgeProps {
  type: 'new' | 'popular';
}

export interface FAQCategoryProps {
  category: {
    name: string;
    color: string;
  };
}

export interface FAQItemProps {
  faq: {
    id: string;
    question: string;
    answer: string;
    tags: string[];
    category: string;
  };
}
