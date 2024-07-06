import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { Providers } from '@/components';


export const metadata: Metadata = {
  title: {
    template: "%s - Decade | Shop",
    default: "Home - Decade | Shop ",
  },
  description: "A site for Decade Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}