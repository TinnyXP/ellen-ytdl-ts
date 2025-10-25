import { Noto_Sans_Thai } from "next/font/google";
import { Providers as UIProviders } from "./providers";
import type { Metadata } from "next";

import "@/styles/globals.css";

const notoSansTH = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YTDownloader",
  description: "My MP4&MP3 Downloader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoSansTH.variable} antialiased`}>
        <UIProviders>
          {children}
        </UIProviders>
      </body>
    </html>
  );
}