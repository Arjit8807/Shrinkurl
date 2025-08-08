// src/app/[shortCode]/page.tsx
"use client";

import { useEffect, useState } from 'react';

const RedirectPage = ({ params }: { params: { shortCode: string } }) => {
  const [message, setMessage] = useState('Redirecting...');
  const { shortCode } = params;

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await fetch(`/api/redirect/${shortCode}`);
        const data = await response.json();

        if (response.ok) {
          // If successful, redirect the browser
          window.location.href = data.longUrl;
        } else {
          // If not found, show an error message
          setMessage(data.message || 'Link not found.');
        }
      } catch (error) {
  console.error("Failed to fetch long URL:", error);
  setMessage('Failed to load link. Please try again.');
}
    };

    fetchLongUrl();
  }, [shortCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
};

export default RedirectPage;