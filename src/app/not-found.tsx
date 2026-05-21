import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl font-bold text-accent">404</div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
          <p className="text-gray-600">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="rounded-lg">Go home</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="rounded-lg">
              Shop now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
