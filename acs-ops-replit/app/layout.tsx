import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACS Ops",
  description: "CRM + FSM fast launch app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
