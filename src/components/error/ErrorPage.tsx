import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Error</h1>
          <p className="text-gray-600">
            {error.message || 'An unexpected error occurred'}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-400">Error ID: {error.digest}</p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} className="rounded-lg">
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="rounded-lg">
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
