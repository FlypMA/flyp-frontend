// 🏗️ Layout Components - Barrel Exports
// Location: src/shared/components/layouts/index.ts
// Purpose: Export all layout components

export { default as LayoutApp } from '../layout/LayoutApp';
export { default as LayoutAuth } from '../layout/LayoutAuth';
export { default as LayoutMain } from '../layout/LayoutMain';
export { default as LayoutMinimal } from '../layout/LayoutMinimal';
export { default as LayoutSplit } from '../layout/LayoutSplit';

// Create aliases for common naming patterns
export { default as AppLayout } from '../layout/LayoutApp';
export { default as MainLayout } from '../layout/LayoutMain';
export { default as SplitScreenLayout } from '../layout/LayoutSplit';
export { default as LogoOnlyLayout } from '../layout/LayoutMinimal';
export { default as AuthenticatedLayout } from '../layout/LayoutMain';
