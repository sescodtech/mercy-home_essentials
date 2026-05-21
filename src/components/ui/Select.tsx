import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = ({
  className,
  options,
  placeholder,
  ...props
}: SelectProps) => {
  return (
    <div className="relative">
      <select
        className={cn(
          'appearance-none w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-white',
          'focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent',
          'transition-all text-sm font-medium cursor-pointer',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};
