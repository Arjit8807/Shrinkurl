import { PrismaClient } from '@prisma/client';
import { redirect, notFound } from 'next/navigation';

const prisma = new PrismaClient();

// We define the type for params directly here
type RedirectPageProps = {
  params: {
    shortCode: string;
  };
};

// The component uses the new type
const RedirectPage = async ({ params }: RedirectPageProps) => {
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

  // This part of the code is never reached, but it satisfies TypeScript
  return null;
};

export default RedirectPage;