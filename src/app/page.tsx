"use client";

import {
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  useTheme
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

import AboutSection from "@/components/pages/AboutPage";
import BigTextSlides from "@/components/Layout/BigTextSlides";
import { Card } from "@/components/Layout/Card";
import ContactForm from "@/components/Layout/ContactForm";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import MultilayerButton from './../components/Layout/action/StyledButton';
import { sections } from "@/constants/data";

// --- Interfaces & Data ---
interface RegularItem { src: string; alt: string; }
interface LinkedItem extends RegularItem { text?: string; link?: string; }
type SectionItem = RegularItem | LinkedItem;
interface Section { heading: string; items: SectionItem[]; }

export default function Page() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { isOpen: isContactOpen, onOpen: onContactOpen, onClose: onContactClose } = useDisclosure();

  const [page, setPage] = useState<"home" | "about">("home");
  const [isPaused, setIsPaused] = useState(false);
  const brandColor = theme.colors?.brand?.[500] || "#415bb2";



  // --- Glassmorphism Style ---
  const glassStyle = useMemo(() => {
    const isDark = colorMode === "dark";
    return {
      bg: isDark ? "rgba(10, 11, 20, 0.4)" : "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(40px) saturate(180%)",
      // WebkitBackdropFilter: "blur(40px) saturate(180%)",
      border: "1px solid",
      borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(108, 135, 220, 0.3)",
      boxShadow: isDark ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)" : "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
    };
  }, [colorMode]);



  return (
    <>
      {/* Dynamic Background */}
      <Box position="fixed" inset={0} zIndex={0} bg={colorMode === "dark" ? "#050508" : "#FBFBFF"} overflow="hidden">
        <Box
          position="absolute" top="-10%" left="5%" w="80vw" h="80vw"
          bg={`radial-gradient(circle, ${brandColor} 0%, transparent 70%)`}
          opacity={colorMode === "dark" ? 0.25 : 0.2} filter="blur(120px)"
          style={{ animation: "liquidMove 25s infinite alternate ease-in-out" }}
        />
      </Box>

      <VStack minH="100vh" justify="space-between" zIndex="4" position="relative">
        <Header page={page} setPage={setPage} onContactOpen={onContactOpen} />

        {page === "home" && (
          <VStack spacing={0} justifyContent="center" flex="1">
            <VStack
              {...glassStyle} p={["2.5rem", "6.5rem"]}
              onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
              style={{
                animation: "morph 10s infinite alternate ease-in-out",
                animationPlayState: isPaused ? "paused" : "running",
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%"
              }}
            >
              <Heading fontSize={{ base: "xs", md: "lg" }} fontWeight="500">
                <Text as="span" color="brand.500" fontWeight="700">I</Text> specialize in these technologies
              </Heading>
              <BigTextSlides slides={["Figma.", "Chakra UI.", "Typescript.", "Strapi CMS.", "NextJs."]} />
            </VStack>
          </VStack>
        )}



        {page === "about" && (
          <AboutSection onContactOpen={onContactOpen} />
        )}


        <Footer />
      </VStack>
      <ContactForm isOpen={isContactOpen} onClose={onContactClose} />
      <style jsx global>{`
        @keyframes liquidMove { 0% { transform: translate(0, 0); } 50% { transform: translate(10%, 15%); } 100% { transform: translate(0, 0); } }
      `}</style>
    </>
  );
}