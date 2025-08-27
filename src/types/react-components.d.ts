declare module 'lucide-react' {
  import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

  export interface LucideProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;

  // Specific icon exports
  export const AlertTriangle: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Building2: LucideIcon;
  export const Calculator: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckSquare: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Clock: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Download: LucideIcon;
  export const Eye: LucideIcon;
  export const FileText: LucideIcon;
  export const Headphones: LucideIcon;
  export const Home: LucideIcon;
  export const LogOut: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Phone: LucideIcon;
  export const Plus: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const Shield: LucideIcon;
  export const Target: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;

  // Export all icons as default
  const icons: Record<string, LucideIcon>;
  export default icons;
}

declare module '@heroui/react' {
  import React from 'react';

  // Fix for Select component
  export interface SelectProps<T = any> {
    children?: React.ReactNode;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    isRequired?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    label?: string;
    description?: string;
    errorMessage?: string;
    value?: string;
    defaultValue?: string;
    selectedKeys?: Set<string> | string[];
    defaultSelectedKeys?: Set<string> | string[];
    onSelectionChange?: (keys: Set<string>) => void;
    onChange?: (value: string) => void;
    className?: string;
    classNames?: Record<string, string>;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    [key: string]: any;
  }

  export const Select: <T = any>(props: SelectProps<T>) => React.ReactElement;

  // Fix for Tabs component
  export interface TabsProps<T = any> {
    children?: React.ReactNode;
    selectedKey?: string;
    defaultSelectedKey?: string;
    onSelectionChange?: (key: string) => void;
    variant?: 'solid' | 'underlined' | 'bordered' | 'light';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    isVertical?: boolean;
    isDisabled?: boolean;
    destroyInactiveTabPanel?: boolean;
    className?: string;
    classNames?: Record<string, string>;
    [key: string]: any;
  }

  export const Tabs: <T = any>(props: TabsProps<T>) => React.ReactElement;

  // Re-export other components that are working fine
  export * from '@heroui/react/dist/index';
}

// Global React types enhancement
declare global {
  namespace React {
    interface ReactNode {
      bigint?: never;
    }
  }
}

export {};
