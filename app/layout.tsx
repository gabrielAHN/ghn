import type { Metadata } from "next";
import { Providers } from '@/providers/Providers'
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "gabrielhn",
  description:
    "Personal website of Gabrielhn",
  icons: [
    {
      url: "/Technologist.png",
      sizes: "32x32",
      type: "image/png",
    },
  ],
};

const quicksand = localFont({
  src: "./fonts/QuicksandRegular.woff",
  variable: "--font-quicksand",
  display: "swap",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
