import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/Chatbot";
import ClientProviders from "@/components/ClientProviders";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <html lang="ru" className={`${geist.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}
      >
        <ClientProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Chatbot />
        </ClientProviders>
      </body>
    </html>
  );
}
