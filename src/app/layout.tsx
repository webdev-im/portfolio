import "./globals.css"

import type { Metadata, Viewport } from "next"
import { Big_Shoulders, IBM_Plex_Mono, Outfit } from "next/font/google"
import type { ReactNode } from "react"

import { Provider } from "@/components/ui/provider"
import { profile } from "@/constants/data"

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
})

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: "WebDev I'm — Interface through operations",
  description:
    "Full-stack product architecture. WebDev I'm designs the interface and builds the system under it: Next.js, Chakra UI, Tailwind, Supabase, Firebase, Strapi, AI workflows, domains, and client email.",
  openGraph: {
    title: "WebDev I'm — Interface through operations",
    description:
      "Multi-layer products: interface, application, intelligence, data, and the domain they run on.",
    url: profile.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebDev I'm — Interface through operations",
    description:
      "Interface, data, AI, and operations. Designed and built as one system.",
  },
}

export const viewport: Viewport = {
  themeColor: "#08090d",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
