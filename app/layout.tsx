import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./shared/providers";
import { cookies } from "next/headers";
import { LanguageProvider } from "./providers/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Что посмотреть?",
  description: "Персональная библиотека фильмов и игр",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies();
  const lang = (await cookieStore).get("lang");

  console.log(lang);

  return (
    <html lang={lang?.value} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LanguageProvider initialLang={lang?.value || "ru"}>
            {children}
          </LanguageProvider>
        </Providers>

      </body>
    </html>
  );
}
