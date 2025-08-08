import { PrismaClient } from '@prisma/client';
import { redirect, notFound } from 'next/navigation';

const prisma = new PrismaClient();

// This is the simplest and most robust way to define the props
// for a dynamic server component page in Next.js.
const RedirectPage = async ({ params }: { params: { shortCode: string } }) => {
  const { shortCode } = params;

  const link = await prisma.link.findUnique({
    where: {
      shortCode: shortCode,
    },
  });

  // If a link is found, redirect to its long URL
  if (link) {
    redirect(link.longUrl);
  }

  // If no link is found, show the 404 Not Found page
  notFound();
};

export default RedirectPage;