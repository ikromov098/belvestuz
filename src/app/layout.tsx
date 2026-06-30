import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/Chatbot";
import CallbackWidget from "@/components/CallbackWidget";
import ClientProviders from "@/components/ClientProviders";

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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Chatbot />
          <CallbackWidget />
        </ClientProviders>
      </body>
    </html>
  );
}
