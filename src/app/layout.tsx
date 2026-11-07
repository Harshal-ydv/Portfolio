import type { Metadata } from "next";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/dm-mono/latin-400.css";
import "@fontsource/dm-mono/latin-500.css";
import "./globals.scss";
import "@/moods/developer/developer.scss";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.seoTitle,
  description: site.seoDescription,
  openGraph: {
    title: site.seoTitle,
    description: site.seoDescription,
    type: "website",
    ...(site.publicUrl ? { url: site.publicUrl, images: [`${site.publicUrl}/shared/og-card.svg`] } : {}),
  },
  icons: { icon: "/favicon.svg" },
  ...(site.publicUrl ? { metadataBase: new URL(site.publicUrl) } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-mood="default"><body>{children}</body></html>;
}
