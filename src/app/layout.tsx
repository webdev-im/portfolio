"use client";

import "./globals.css";

import { CSSPlugin } from "gsap/CSSPlugin";
import { Inter } from "next/font/google";
import { gsap } from "gsap";
import { ChakraProvider } from "@chakra-ui/react";

gsap.registerPlugin(CSSPlugin);

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "WebDev I'm",
  description: "Visual Design / Web Design / UI-UX / Front-End Developer",
  image: "favicon.ico",
  openGraph: {
    title: "WebDev I'm",
    description: "Visual Design / Web Design / UI-UX / Front-End Developer",
    image: "favicon.ico",
  },
};
