import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ATLAS by Osman Consulting — NGO Operations Platform",
  description:
    "The complete NGO operations platform for MEAL teams. Built for the field, trusted by donors. Manage vouchers, dashboards, beneficiaries, contracts and more.",
  keywords: [
    "NGO",
    "MEAL",
    "operations platform",
    "donor reporting",
    "voucher management",
    "beneficiary tracking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
