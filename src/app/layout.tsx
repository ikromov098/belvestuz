import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Belvest — Лизинг, рассрочка и трейд-ин в Узбекистане",
  description:
    "Современный финансовый сервис: лизинг, рассрочка, трейд-ин и инвестиции для жителей Узбекистана.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <ClientProviders>
          <SiteShell>{children}</SiteShell>
        </ClientProviders>
      </body>
    </html>
  );
}
