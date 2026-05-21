import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export const Checkbox = ({
  className,
  label,
  helperText,
  id,
  ...props
}: CheckboxProps) => {
  const inputId = id || `checkbox-${Math.random()}`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="flex items-center gap-2 cursor-pointer">
        <div className="relative">
          <input
            id={inputId}
            type="checkbox"
            className={cn(
              'appearance-none w-5 h-5 rounded-lg border-2 border-gray-300',
              'cursor-pointer transition-all',
              'focus:outline-none focus:ring-2 focus:ring-accent/20',
              'checked:bg-accent checked:border-accent',
              className
            )}
            {...props}
          />
          <Check className="absolute inset-0 w-5 h-5 text-white opacity-0 checked:opacity-100 pointer-events-none transition-opacity" />
        </div>
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      </label>
      {helperText && <span className="text-xs text-gray-500 ml-7">{helperText}</span>}
    </div>
  );
};
