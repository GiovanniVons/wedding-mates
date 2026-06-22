import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Friend Led Wedding Ceremonies | Wedding Mates",
    template: "%s | Wedding Mates",
  },
  description:
    "Have your best mate lead your wedding ceremony while a registered celebrant handles the legals. One package, fully sorted. Book your friend led ceremony today.",
  applicationName: SITE.visibleName,
  icons: {
    icon: "/images/cropped-favicon.png",
    apple: "/images/cropped-favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.visibleName,
    locale: "en_AU",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [SITE.ogImage] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={fontVariables}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Site-wide structured data: Organization + WebSite (referenced by @id
            from page-specific schema). Server-rendered so crawlers see it. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
