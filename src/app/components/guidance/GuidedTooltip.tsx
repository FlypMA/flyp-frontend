import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Card, CardBody } from '@heroui/react';
import {
  HelpCircle,
  Info,
  Lightbulb,
  X,
  ChevronRight,
  ChevronLeft,
  Target,
  CheckCircle,
} from 'lucide-react';

export interface TooltipContent {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'tip' | 'warning' | 'success';
  position?: 'top' | 'bottom' | 'left' | 'right';
  showOnce?: boolean;
  delay?: number;
}

interface GuidedTooltipProps {
  content: TooltipContent;
  children: React.ReactNode;
  isVisible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const GuidedTooltip: React.FC<GuidedTooltipProps> = ({
  content,
  children,
  isVisible = true,
  onDismiss,
  className = '',
}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    if (content.showOnce) {
      const shownKey = `tooltip_shown_${content.id}`;
      const wasShown = localStorage.getItem(shownKey) === 'true';
      setHasBeenShown(wasShown);
    }

    if (isVisible && (!content.showOnce || !hasBeenShown)) {
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, content.delay || 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, content.showOnce, content.delay, content.id, hasBeenShown]);

  const handleDismiss = () => {
    setShouldShow(false);

    if (content.showOnce) {
      localStorage.setItem(`tooltip_shown_${content.id}`, 'true');
      setHasBeenShown(true);
    }

    if (onDismiss) {
      onDismiss();
    }
  };

  const getIcon = () => {
    switch (content.type) {
      case 'tip':
        return <Lightbulb className="w-4 h-4" />;
      case 'warning':
        return <Target className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getColorScheme = () => {
    switch (content.type) {
      case 'tip':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          icon: 'text-warning-600',
          title: 'text-warning-900',
          text: 'text-warning-800',
        };
      case 'warning':
        return {
          bg: 'bg-danger-50',
          border: 'border-danger-200',
          icon: 'text-danger-600',
          title: 'text-danger-900',
          text: 'text-danger-800',
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          icon: 'text-success-600',
          title: 'text-success-900',
          text: 'text-success-800',
        };
      default:
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-200',
          icon: 'text-primary-600',
          title: 'text-primary-900',
          text: 'text-primary-800',
        };
    }
  };

  if (!shouldShow || (content.showOnce && hasBeenShown)) {
    return <>{children}</>;
  }

  const colors = getColorScheme();

  return (
    <div className={`relative ${className}`}>
      {children}

      <div className="absolute z-50 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
        <Card className={`${colors.bg} ${colors.border} border max-w-sm shadow-lg`}>
          <CardBody className="p-4">
            <div className="flex items-start gap-3">
              <div className={`${colors.icon} mt-0.5`}>{getIcon()}</div>

              <div className="flex-1">
                <h4 className={`font-semibold text-sm ${colors.title} mb-1`}>{content.title}</h4>
                <p className={`text-sm ${colors.text} leading-relaxed`}>{content.description}</p>
              </div>

              <button
                onClick={handleDismiss}
                className={`${colors.icon} hover:opacity-70 transition-opacity`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Arrow pointing down */}
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent ${colors.border.replace('border-', 'border-t-')}`}
        ></div>
      </div>
    </div>
  );
};

export default GuidedTooltip;
