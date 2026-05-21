import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
  count?: number;
}

export const Skeleton = ({
  className,
  variant = 'rect',
  count = 1,
  ...props
}: SkeletonProps) => {
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded',
  };

  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, i) => (
        <div
          key={i}
          className={cn(
            'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse',
            variants[variant],
            className
          )}
          {...props}
        />
      ))}
    </>
  );
};
