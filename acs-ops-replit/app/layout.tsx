import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Clean Solutions | Bismarck Cleaning Services",
  description: "Commercial and residential cleaning services in Bismarck, ND. Fast quotes, reliable service, and 24/7 emergency response.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
