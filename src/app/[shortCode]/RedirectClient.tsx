"use client";
import { useEffect, useState } from 'react';

const RedirectClient = ({ shortCode }: { shortCode: string }) => {
  const [message, setMessage] = useState('Redirecting...');

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await fetch(`/api/redirect/${shortCode}`);
        const data = await response.json();

        if (response.ok) {
          window.location.href = data.longUrl;
        } else {
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

export default RedirectClient;