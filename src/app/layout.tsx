import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter font as in our previous steps
import "./globals.css";

// Step 1: Import the provider we created
import { NextAuthProvider } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

// Step 2: Update the metadata to match our project
export const metadata: Metadata = {
  title: "ShrinkUrl",
  description: "The only URL shortener you will ever need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Step 3: Wrap the children with the provider */}
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}