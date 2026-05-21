import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent placeholder:text-gray-400',
        className
      )}
      {...props}
    />
  );
};
