// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Link Not Found</h1>
      <p className="mt-4">The short link you are looking for does not exist or has been deleted.</p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        Go back to Homepage
      </Link>
    </div>
  );
}