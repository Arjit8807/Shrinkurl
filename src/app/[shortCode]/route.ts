import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { shortCode: string } }
) {
  try {
    const link = await prisma.link.findUnique({
      where: { shortCode: params.shortCode },
    });

    if (link) {
      return NextResponse.redirect(new URL(link.longUrl));
    } else {
      const homeUrl = new URL('/', request.url);
      return NextResponse.redirect(homeUrl);
    }
  } catch (error) {
    console.error("Redirect Error:", error);
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }
}