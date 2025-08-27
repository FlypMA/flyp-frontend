import React from 'react';
import { Input, Select, SelectItem, Textarea } from '@heroui/react';
import { cn } from '@heroui/react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface EnhancedInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  required?: boolean;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

interface EnhancedSelectProps {
  label: string;
  placeholder?: string;
  value: string;
  onSelectionChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

interface EnhancedTextareaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  required?: boolean;
  error?: string;
  rows?: number;
  description?: string;
  className?: string;
}

export const EnhancedInput: React.FC<EnhancedInputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  name,
  required = false,
  error,
  success,
  icon,
  description,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative">
        <Input
          type={type}
          label={label}
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          name={name}
          required={required}
          variant="bordered"
          size="lg"
          startContent={icon}
          endContent={
            error ? (
              <AlertCircle className="w-4 h-4 text-danger" />
            ) : success ? (
              <CheckCircle2 className="w-4 h-4 text-success" />
            ) : null
          }
          classNames={{
            base: 'group',
            input: [
              'text-base font-medium',
              'placeholder:text-default-400',
              'group-data-[has-value=true]:text-default-foreground',
            ],
            inputWrapper: [
              'shadow-none',
              'border-2',
              'transition-all duration-200',
              'group-data-[focus=true]:border-primary',
              'group-data-[hover=true]:border-default-300',
              error && 'border-danger data-[hover=true]:border-danger',
              success && 'border-success data-[hover=true]:border-success',
              'bg-white',
            ],
            label: [
              'text-sm font-medium text-default-700',
              'group-data-[filled=true]:text-primary',
              required && "after:content-['*'] after:text-danger after:ml-0.5",
            ],
          }}
        />
      </div>

      {(description || error || success) && (
        <div className="space-y-1">
          {description && !error && !success && (
            <p className="text-xs text-default-500">{description}</p>
          )}
          {error && (
            <p className="text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
          {success && (
            <p className="text-xs text-success flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {success}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export const EnhancedSelect: React.FC<EnhancedSelectProps> = ({
  label,
  placeholder,
  value,
  onSelectionChange,
  options,
  required = false,
  error,
  description,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative">
        <Select
          label={label}
          placeholder={placeholder}
          selectedKeys={value ? [value] : []}
          onSelectionChange={keys => {
            const selected = Array.from(keys)[0] as string;
            onSelectionChange(selected);
          }}
          required={required}
          variant="bordered"
          size="lg"
          classNames={{
            base: 'group',
            trigger: [
              'shadow-none',
              'border-2',
              'transition-all duration-200',
              'data-[focus=true]:border-primary',
              'data-[hover=true]:border-default-300',
              error && 'border-danger data-[hover=true]:border-danger',
              'bg-white',
            ],
            label: [
              'text-sm font-medium text-default-700',
              'group-data-[filled=true]:text-primary',
              required && "after:content-['*'] after:text-danger after:ml-0.5",
            ],
            value: 'text-base font-medium',
            popoverContent: 'bg-white border border-default-200 shadow-lg',
          }}
        >
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      </div>

      {(description || error) && (
        <div className="space-y-1">
          {description && !error && <p className="text-xs text-default-500">{description}</p>}
          {error && (
            <p className="text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export const EnhancedTextarea: React.FC<EnhancedTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error,
  rows = 4,
  description,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative">
        <Textarea
          label={label}
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          name={name}
          required={required}
          variant="bordered"
          minRows={rows}
          classNames={{
            base: 'group',
            input: ['text-base font-medium', 'placeholder:text-default-400'],
            inputWrapper: [
              'shadow-none',
              'border-2',
              'transition-all duration-200',
              'group-data-[focus=true]:border-primary',
              'group-data-[hover=true]:border-default-300',
              error && 'border-danger data-[hover=true]:border-danger',
              'bg-white',
            ],
            label: [
              'text-sm font-medium text-default-700',
              'group-data-[filled=true]:text-primary',
              required && "after:content-['*'] after:text-danger after:ml-0.5",
            ],
          }}
        />
      </div>

      {(description || error) && (
        <div className="space-y-1">
          {description && !error && <p className="text-xs text-default-500">{description}</p>}
          {error && (
            <p className="text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

interface FormSectionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg">{icon}</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

interface FormTipProps {
  title: string;
  content: string;
  type?: 'info' | 'warning' | 'success';
  className?: string;
}

export const FormTip: React.FC<FormTipProps> = ({ title, content, type = 'info', className }) => {
  const styles = {
    info: {
      container: 'bg-blue-50 border border-blue-200',
      title: 'text-blue-900',
      content: 'text-blue-800',
      icon: '💡',
    },
    warning: {
      container: 'bg-amber-50 border border-amber-200',
      title: 'text-amber-900',
      content: 'text-amber-800',
      icon: '⚠️',
    },
    success: {
      container: 'bg-green-50 border border-green-200',
      title: 'text-green-900',
      content: 'text-green-800',
      icon: '✅',
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={cn('p-4 rounded-xl', currentStyle.container, className)}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{currentStyle.icon}</span>
        <div className="flex-1">
          <h4 className={cn('font-semibold text-sm mb-1', currentStyle.title)}>{title}</h4>
          <p className={cn('text-sm leading-relaxed', currentStyle.content)}>{content}</p>
        </div>
      </div>
    </div>
  );
};
