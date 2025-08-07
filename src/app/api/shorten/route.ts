// src/app/api/shorten/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A simple function to generate a random short code
function generateShortCode(length: number = 7): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: "URL is required." }, { status: 400 });
    }
    
    const shortCode = generateShortCode();

    // Save the new link to the database
    const newLink = await prisma.link.create({
      data: {
        longUrl: url,
        shortCode: shortCode,
      },
    });

    // Construct the full short URL to send back to the user
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${newLink.shortCode}`;

    return NextResponse.json({ 
      message: "Link shortened successfully!",
      shortUrl: shortUrl,
    });

  } catch (error) {
    console.error("Error creating short link:", error);
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}