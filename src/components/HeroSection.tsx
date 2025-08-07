"use client";

import React, { useState } from 'react';

const HeroSection = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShortenClick = async () => {
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await response.json(); 

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setShortUrl(data.shortUrl); 

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="text-center py-12 px-4">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        One link, infinite possibilities.
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        The only URL shortener you will ever need. Create short, memorable links in seconds.
      </p>
      <p className="mt-1 text-lg leading-8 text-gray-600">
        Sign up to manage your links, track clicks, and see your analytics.
      </p>
      
      <div className="mt-6 flex items-center justify-center gap-x-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
        <input
          type="text"
          placeholder="Paste your long URL here"
          className="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          onClick={handleShortenClick}
          disabled={loading}
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>

      {shortUrl && (
        <div className="mt-8 max-w-xl mx-auto">
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700">Your shortened URL is Ready:</p>
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-8 max-w-xl mx-auto">
          <div className="p-4 bg-red-100 rounded-md">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;