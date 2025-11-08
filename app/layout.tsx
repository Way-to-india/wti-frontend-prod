import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Provider from './provider';

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Way to India - Discover India's Best Tours",
    template: "%s | Way to India",
  },
  description: "Discover amazing tours across India. Book your dream vacation with the best tour packages at Waytoindia.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
