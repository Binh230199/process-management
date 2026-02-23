import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { getAllProcesses } from "@/lib/data-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Process Knowledge Base",
  description: "Interactive process management for software engineering teams",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const processes = getAllProcesses();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <AppShell processes={processes}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
