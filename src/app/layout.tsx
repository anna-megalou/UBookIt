import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniBookIt - Get Your University Books Easily",
  description: "Order your university books with just one click. Track your order in real-time and get secure delivery to your home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-light flex flex-col justify-center  min-h-screen`}
      >
        <Header />
        <main className="container mx-auto px-auto bg-primary-light flex-1">
          {children}  
        </main>
        <Footer />
      </body>
    </html>
  );
}
