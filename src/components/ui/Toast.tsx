'use client';

import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

export const Toast = ({
  id,
  message,
  type = 'info',
  duration = 4000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (duration === 0) return;
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const variants = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: 'text-green-600',
      text: 'text-green-800',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: 'text-red-600',
      text: 'text-red-800',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-600',
      text: 'text-yellow-800',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-800',
    },
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const style = variants[type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border px-4 py-3 max-w-sm w-full',
        style.bg
      )}
      role="alert"
    >
      <div className={cn('shrink-0 mt-0.5', style.icon)}>
        {icons[type]}
      </div>
      <p className={cn('text-sm font-medium flex-1', style.text)}>{message}</p>
      <button
        onClick={() => onClose(id)}
        className={cn('shrink-0 p-1 hover:bg-white/50 rounded transition-colors', style.icon)}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
