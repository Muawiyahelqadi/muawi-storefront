import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { NextIntlClientProvider } from "next-intl";
import { initImageHelper } from "@/src/utilities/image-builder";
import { client } from "@/src/sanity/lib/client";
import { getLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/src/components/SessionProvider/SessionProvider";
import { isRtlOnServer, translate } from "@/src/i18n/translate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await translate("site_title"),
    description: await translate("site_description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const isRTL = await isRtlOnServer();

  initImageHelper(client);

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <SessionProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
