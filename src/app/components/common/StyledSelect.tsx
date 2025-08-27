import React from 'react';
import { Select, SelectItem, SelectProps } from '@heroui/react';

export interface StyledSelectProps extends Omit<SelectProps, 'classNames'> {
  options: Array<{ key: string; label: string }>;
  variant?: 'default' | 'outlined' | 'filled';
}

const StyledSelect: React.FC<StyledSelectProps> = ({
  options,
  variant = 'default',
  label,
  placeholder,
  ...props
}) => {
  const getClassNames = () => ({
    trigger:
      'border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all min-h-12',
    content: 'bg-white border border-slate-200 shadow-xl rounded-2xl',
    listbox: 'bg-white',
    popoverContent: 'bg-white border border-slate-200 shadow-xl rounded-2xl p-0',
    base: 'bg-white',
    label: 'text-slate-600 font-medium text-sm',
    value: 'text-slate-900',
  });

  return (
    <Select
      {...props}
      label={label}
      placeholder={placeholder}
      classNames={getClassNames()}
      aria-label={label || placeholder}
    >
      {options.map(option => (
        <SelectItem
          key={option.key}
          className="text-slate-900 hover:bg-slate-100 data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-700"
        >
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default StyledSelect;
