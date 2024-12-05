import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greeting cards web",
  description: "Generated greeting card from upload file",
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
