'use client';

import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: Date;
}

interface OrderTimelineProps {
  steps: TimelineStep[];
}

export const OrderTimeline = ({ steps }: OrderTimelineProps) => {
  const getIcon = (index: number, status: string) => {
    const icons = [Package, CheckCircle, Truck, CheckCircle];
    const Icon = icons[index] || Package;

    return (
      <Icon
        className={cn(
          'w-6 h-6',
          status === 'completed' ? 'text-green-600' : 'text-gray-300'
        )}
      />
    );
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          {/* Timeline Circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                step.status === 'completed'
                  ? 'bg-green-100'
                  : step.status === 'current'
                  ? 'bg-accent/20 border-2 border-accent'
                  : 'bg-gray-100'
              )}
            >
              {getIcon(index, step.status)}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-1 h-8 mt-2',
                  step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="py-2 flex-1">
            <h4
              className={cn(
                'font-bold',
                step.status === 'completed'
                  ? 'text-green-600'
                  : step.status === 'current'
                  ? 'text-accent'
                  : 'text-gray-400'
              )}
            >
              {step.label}
            </h4>
            {step.timestamp && (
              <p className="text-xs text-gray-500 mt-1">
                {new Date(step.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
