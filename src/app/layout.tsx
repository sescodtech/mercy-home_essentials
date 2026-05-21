import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mercy Home Essentials — Premium Home, Office & Tech",
  description: "Premium gadgets, kitchen essentials & office tools curated for modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
