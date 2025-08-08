import { PrismaClient } from '@prisma/client';
import { redirect, notFound } from 'next/navigation';

const prisma = new PrismaClient();

// The type for the props, including searchParams
type Props = {
  params: { shortCode: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// The component now uses the corrected Props type
async function RedirectPage({ params }: Props) {
  const { shortCode } = params;

  const link = await prisma.link.findUnique({
    where: {
      shortCode: shortCode,
    },
  });

  if (link) {
    redirect(link.longUrl);
  }

  notFound();
}

export default RedirectPage;