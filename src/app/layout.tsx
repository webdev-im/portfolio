"use client";

import "./globals.css";

import { CSSPlugin } from "gsap/CSSPlugin";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { gsap } from "gsap";

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
