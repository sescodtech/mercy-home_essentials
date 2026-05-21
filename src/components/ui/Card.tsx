import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
}

export const Card = ({
  className,
  variant = 'default',
  ...props
}: CardProps) => {
  const variants = {
    default: 'bg-white border border-gray-200 rounded-2xl',
    elevated: 'bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow',
    outlined: 'bg-transparent border-2 border-gray-300 rounded-2xl',
    filled: 'bg-gray-50 rounded-2xl',
  };

  return (
    <div
      className={cn(variants[variant], className)}
      {...props}
    />
  );
};
