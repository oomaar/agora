import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/utils/cn";
import { themeScript } from "@/lib/theme/themeScript";
import { ToastProvider } from "@/context/ToastContext";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  TITLE_TEMPLATE,
} from "@/lib/site/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: TITLE_TEMPLATE },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "h-full antialiased has-[dialog[open]]:overflow-hidden",
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-ag-bg text-ag-text text-body font-sans">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
