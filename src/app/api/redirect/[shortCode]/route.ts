// src/app/api/redirect/[shortCode]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split('/');
    const shortCode = pathnameParts[pathnameParts.length - 1];

    if (!shortCode) {
      return NextResponse.json({ message: 'Short code is missing' }, { status: 400 });
    }

    const link = await prisma.link.findUnique({
      where: { shortCode },
    });

    if (link) {
      return NextResponse.json({ longUrl: link.longUrl });
    } else {
      return NextResponse.json({ message: 'Link not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Redirect API Error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
