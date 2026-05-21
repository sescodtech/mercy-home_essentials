'use client';

import React, { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Something went wrong
              </h1>
              <p className="text-gray-600">
                {this.state.error?.message ||
                  'An unexpected error occurred. Please try again.'}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => this.setState({ hasError: false })}
                className="rounded-lg"
              >
                Try again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="rounded-lg"
              >
                Go home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
