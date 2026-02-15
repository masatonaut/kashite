import type { Metadata, Viewport } from "next";
import { Zen_Kaku_Gothic_New, DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KASHITE | Lend it. Track it. Get it back.",
  description: "誰に何を貸した？を1画面で解決。シンプルな貸し借り記録アプリ。",
  keywords: ["貸し借り", "記録", "貸す", "借りる", "管理"],
  authors: [{ name: "choimo" }],
  openGraph: {
    title: "KASHITE",
    description: "Lend it. Track it. Get it back.",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "KASHITE",
    description: "Lend it. Track it. Get it back.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${zenKaku.variable} ${dmSans.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
