"use client"; // We need this to use the useSession hook

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react'; // Import hooks

const Navbar = () => {
  // Get session data and status (loading, authenticated, unauthenticated)
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center py-25 px-45">
      <div className="w-1/3">
        <div className="text-4xl font-bold">ShrinkUrl</div>
      </div>
      <div className="w-1/3">
        {/* Future links can go here */}
      </div>
      <div className="w-1/3 flex justify-end">
        <div className="flex items-center gap-x-4">
          {/* If the session is loading, we can show a placeholder */}
          {status === 'loading' && (
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          )}
          
          {/* If the user is logged in (authenticated) */}
          {status === 'authenticated' && session?.user && (
            <>
              <span>{session.user.name}</span>
              <button 
                onClick={() => signOut()} // Call signOut function on click
                className="font-medium hover:text-blue-600 transition-colors"
              >
                Sign Out
              </button>
            </>
          )}

          {/* If the user is not logged in (unauthenticated) */}
          {status === 'unauthenticated' && (
            <>
              <Link
                href="/signin"
                className="font-medium hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              
              <Link 
                href="/signup"
                className="font-medium hover:text-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;