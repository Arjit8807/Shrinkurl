import { PrismaClient } from '@prisma/client';
import { redirect, notFound } from 'next/navigation';

const prisma = new PrismaClient();

// This is a Server Component that receives params from the URL
async function RedirectPage({ params }: { params: { shortCode: string } }) {
  const { shortCode } = params;

  // Find the link in the database using the shortCode from the URL
  const link = await prisma.link.findUnique({
    where: {
      shortCode: shortCode,
    },
  });

  // If a link is found, redirect the browser to its long URL
  if (link) {
    redirect(link.longUrl);
  }

  // If no link is found for that code, show a 404 page
  notFound();
}

export default RedirectPage;