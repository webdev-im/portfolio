import "./globals.css";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { gsap } from "gsap";

gsap.registerPlugin(CSSPlugin);

// Load Google Font
const inter = Inter({ subsets: ["latin"] });

// Add metadata for the favicon
export const metadata = {
  icons: {
    icon: "/favicon.ico", // Path to the favicon in the public folder
  },
};

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
