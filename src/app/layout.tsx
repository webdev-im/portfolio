import "./globals.css";

import { CSSPlugin } from "gsap/CSSPlugin";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { gsap } from "gsap";

gsap.registerPlugin(CSSPlugin);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://webdevim.netlify.app"), // Replace with your production URL
  title: "WebDev I'm | Expert Web Designer & Full Stack Developer",
  description:
    "Transforming ideas into stunning digital experiences. WebDev I'm specializes in UI/UX design, full-stack development, and modern web technologies. Available for projects and consultations.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "WebDev I'm | Expert Web Designer & Developer",
    description:
      "Transforming ideas into stunning digital experiences. Check out my portfolio to see my latest work in UI/UX design and web development.",
    url: "https://webdevim.netlify.app",
    images: [
      {
        url: "/meta-image.jpeg",
        width: 1200,
        height: 630,
        alt: "WebDev I'm - Expert Web Designer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebDev I'm | Expert Web Designer & Developer",
    description:
      "Specializing in crafting stunning UI/UX designs and building robust web solutions. Visit my portfolio to learn more.",
    images: ["/meta-image.jpeg"],
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
