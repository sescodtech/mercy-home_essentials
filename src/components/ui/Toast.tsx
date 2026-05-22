'use client';

import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
      bg: 'bg-green-500/10 backdrop-blur-md border-green-500/20',
      icon: 'text-green-500',
      text: 'text-green-700',
      progress: 'bg-green-500'
    },
    error: {
      bg: 'bg-red-500/10 backdrop-blur-md border-red-500/20',
      icon: 'text-red-500',
      text: 'text-red-700',
      progress: 'bg-red-500'
    },
    warning: {
      bg: 'bg-yellow-500/10 backdrop-blur-md border-yellow-500/20',
      icon: 'text-yellow-500',
      text: 'text-yellow-700',
      progress: 'bg-yellow-500'
    },
    info: {
      bg: 'bg-blue-500/10 backdrop-blur-md border-blue-500/20',
      icon: 'text-blue-500',
      text: 'text-blue-700',
      progress: 'bg-blue-500'
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
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className={cn(
        'flex items-start gap-4 rounded-2xl border px-5 py-4 max-w-sm w-full shadow-2xl shadow-black/5 relative overflow-hidden',
        style.bg
      )}
      role="alert"
    >
      <div className={cn('shrink-0 mt-0.5', style.icon)}>
        {icons[type]}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <p className={cn('text-sm font-bold tracking-tight', style.text)}>{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className={cn('shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors', style.icon)}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className={cn('absolute bottom-0 left-0 h-1', style.progress)}
      />
    </motion.div>
  );
}
