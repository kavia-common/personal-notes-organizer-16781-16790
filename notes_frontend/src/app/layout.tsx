import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "A playful, vibrant personal notes organizer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-bg min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
