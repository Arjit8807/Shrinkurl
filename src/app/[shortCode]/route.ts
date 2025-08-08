// src/app/[shortCode]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { shortCode: string } }
) {
  try {
    const { shortCode } = params;

    const link = await prisma.link.findUnique({
      where: { shortCode },
    });

    if (link) {
      // If the link is found, perform the redirect.
      return NextResponse.redirect(new URL(link.longUrl));
    } else {
      // If not found, redirect to a custom 'not-found' page on your site.
      const homeUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.redirect(new URL('/not-found', homeUrl));
    }
  } catch (error) {
    // Log the actual error to the server console for debugging
    console.error("Redirect Error:", error); 
    
    // In case of any other error, redirect to the homepage.
    const homeUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL('/', homeUrl));
  }
}