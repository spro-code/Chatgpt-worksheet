import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AbleSpace Worksheet Module',
  description: 'Local-first worksheet builder for teachers and providers',
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
