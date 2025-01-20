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
  title: "WebDev I'm | Expert Web Designer & Full Stack Developer",
  description:
    "Transforming ideas into stunning digital experiences. WebDev I'm specializes in UI/UX design, full-stack development, and modern web technologies. Available for projects and consultations.",
  icons: {
    icon: "/favicon.ico", // Path to the favicon in the public folder
  },
  socialLinks: {
    linkedIn: "https://www.linkedin.com/in/webdev-im", // Replace with your actual LinkedIn profile URL
    portfolio: "https://webdevim.netlify.app", // Your professional portfolio
  },
  openGraph: {
    title: "WebDev I'm | Expert Web Designer & Developer",
    description:
      "Transforming ideas into stunning digital experiences. Check out my portfolio to see my latest work in UI/UX design and web development.",
    url: "https://webdevim.netlify.app", // Replace with your actual website URL
    images: [
      {
        url: "/meta-image.jpeg", // Path to a relevant image in the public folder
        width: 1200,
        height: 630,
        alt: "WebDev I'm - Expert Web Designer & Developer",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yourTwitterHandle", // Replace with your Twitter username
  //   title: "WebDev I'm | Expert Web Designer & Developer",
  //   description:
  //     "Specializing in crafting stunning UI/UX designs and building robust web solutions. Visit my portfolio to learn more.",
  //   image: "/meta-image.jpg", // Path to a relevant image in the public folder
  // },
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
