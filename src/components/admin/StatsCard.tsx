import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'orange' | 'red';
}

const colorStyles = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
};

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
}: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <h3 className="text-3xl font-black text-gray-900 mt-1">{value}</h3>
        </div>
        {icon && <div className={cn('p-3 rounded-lg', colorStyles[color])}>{icon}</div>}
      </div>

      {change && (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-bold',
              change.isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {change.isPositive ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            {Math.abs(change.value)}%
          </div>
          <span className="text-xs text-gray-500">from last month</span>
        </div>
      )}
    </div>
  );
};
