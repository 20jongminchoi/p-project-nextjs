import type { Metadata } from "next";
import "./globals.css";

import { Links } from "./_components/Links";
import Link from "next/link";

export const metadata: Metadata = {
  title: "가천대학교 주차장 혼잡도 현황",
  description: "가천대학교 주차장 혼잡도 현황",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col items-center pb-40">
        <Link href="/">
          <h1 className="font-extrabold text-3xl text-center mt-8">
            가천대학교 주차장 혼잡도 현황
          </h1>
        </Link>
        <Links />
        {children}
      </body>
    </html>
  );
}
