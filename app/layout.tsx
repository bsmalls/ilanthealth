import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ilant Health: Google Books Search",
  description: "Search the Google Books API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
