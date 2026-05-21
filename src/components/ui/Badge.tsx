import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = ({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: BadgeProps) => {
  const variants = {
    primary: 'bg-accent text-white',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs font-bold',
    md: 'px-3 py-1.5 text-sm font-bold',
    lg: 'px-4 py-2 text-base font-bold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
