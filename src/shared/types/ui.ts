import { ReactNode } from 'react';

export interface TooltipProps {
  text: string;
  children: ReactNode;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

export interface LogoProps {
  src: string;
  alt: string;
  className?: string;
}

export interface BrandLogosProps {
  logos: LogoProps[];
  className?: string;
}

export interface FeatureBlockProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavItem[];
}

export interface SidebarProps {
  items: NavItem[];
  className?: string;
}

export interface MobileSidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export interface UserAvatarDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export interface AccountDropDownMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export interface PlatformCardProps {
  platform: {
    name: string;
    icon: string;
    color: string;
    domain: string;
  };
  metrics?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  className?: string;
}

export interface EventCardProps {
  event: {
    id: string;
    activity: string;
    description: string;
    timestamp: string;
    platform: {
      name: string;
      icon: string;
    };
  };
  className?: string;
}
