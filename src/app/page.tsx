"use client";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  useColorMode,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import BigTextSlides from "@/components/Layout/BigTextSlides";
import ContactForm from "@/components/Layout/ContactForm";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { useState } from "react";

// Regular item (non-clickable)
interface RegularItem {
  src: string;
  alt: string;
}

// Linked item (clickable with text and a link)
interface LinkedItem extends RegularItem {
  text: string;
  link: string;
}

// Union type for all items
type SectionItem = RegularItem | LinkedItem;

// Section type
interface Section {
  heading: string;
  layout: string; // "grid" or "mixed"
  items: SectionItem[];
  gridColumns: { base: string; md: string; lg: string };
}

const isLinkedItem = (item: SectionItem): item is LinkedItem => {
  return (item as LinkedItem).link !== undefined;
};

export default function Page() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isContactOpen,
    onOpen: onContactOpen,
    onClose: onContactClose,
  } = useDisclosure();
  const [title, setTitle] = useState("");
  const { colorMode } = useColorMode();
  // Animation control
  const [isPaused, setIsPaused] = useState(false);
  const [page, setPage] = useState<"home" | "about">("home");

  const sections: Section[] = [
    {
      heading: "Visual design solutions",
      layout: "grid",
      items: [
        { src: "/images/imageOne.png", alt: "Design 1" },
        { src: "/images/imageTwo.png", alt: "Design 2" },
        { src: "/images/imageThree.png", alt: "Design 3" },
        { src: "/images/imageFour.png", alt: "Design 4" },
      ],
      gridColumns: { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
    },
    {
      heading: "Technical and visual products",
      layout: "grid",
      items: [
        {
          src: "/images/imageFive.png",
          alt: "Product 1",
          text: "Mackialo Projects",
          link: "https://mackialo.com",
        },
        {
          src: "/images/imageSix.png",
          alt: "Product 2",
          text: "Tech Innovations",
          link: "https://example.com/tech",
        },
        {
          src: "/images/imageSeven.png",
          alt: "Product 3",
          text: "Creative Designs",
          link: "https://example.com/designs",
        },
        {
          src: "/images/imageEight.png",
          alt: "Product 4",
          text: "Future Solutions",
          link: "https://example.com/future",
        },
      ],
      gridColumns: { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
    },
  ];

  return (
    <>
      <NextSeo
        title="WebDev I'm"
        description="WebDev I'm, UI/UX Designer, Frontend Developer, and a blogger."
      />
      <VStack minH="100vh" justify="space-between" zIndex='4' >
        <Header page={page} setPage={setPage}  onContactOpen={onContactOpen}/>

        {page === "home" && (
          <VStack spacing={0} justifyContent="space-between">
            <VStack
              mb={{ base: "2rem", md: "0" }}
              className="shape"
              bg="gray"
              border="5px solid #fc2803"
              p={["2.2rem", "5rem"]}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                animation: "morph 8s ease-in-out infinite",
                animationPlayState: isPaused ? "paused" : "running", // Dynamic control
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                transition: "all 1s ease-in-out",
              }}
            >
              <Heading
                fontSize={{ base: "xs", md: "lg" }}
                transition="0.3s"
                mt={{ base: "1rem", md: "0" }}
              >
                <Text as="span" color="#415bb2">
                  I
                </Text>{" "}
                specialize in these technologies
              </Heading>
              <BigTextSlides
                slides={[
                  "Figma.",
                  "Chakra UI.",
                  "Typescript.",
                  "Strapi CMS.",
                  "NextJs.",
                ]}
              />
            </VStack>
          </VStack>
        )}
        {page === "about" && (
          <Box as="main" py={8} zIndex='4'  maxW={['100%', '60%']} pt={['','5rem']}>
            {/* Hero Section */}
            <Flex direction="column" align="start"  mb={12} >
              <Text size={['xl', 'lg']} mb={['2','4']} fontWeight='500'>
                Hi, I am WebDev I’m
              </Text>
              <Heading  fontSize={['5xl', '6rem']} fontWeight="700" mb={['10', '15']} lineHeight={['','6.2rem']}>
                Your Creative Partner in Crafting Exceptional{" "}
                <Text as="span" color='#415bb2'>
                  Digital Experiences!
                </Text>
              </Heading>
              <Stack direction={isMobile? = 'column' : 'row'}>
              <Text fontSize={['md', 'lg']} mb={6} maxW="600px" fontWeight='300'>
                My mission is simple: to make your digital presence seamless,s
                engaging, and impactful. Let’s create something extraordinary
                together!
              </Text>
              <Button colorScheme="blue" size={['md', 'lg']} onClick={onContactOpen}>
                Let's Talk →
              </Button>
              </Stack>
            </Flex>
            <Box px={{ base: 4, md: 10, lg: 20 }} /* Add horizontal padding for desktop */>
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} mb={12}>
          {/* Section Heading */}
          <Heading as="h3" size="md" mb={4}>
            {section.heading}
          </Heading>

          {/* Render Grid */}
          <Grid
            templateColumns={{
              base: "1fr", // Single column for small screens
              md: "repeat(2, 1fr)", // Two columns for medium screens
              lg: "repeat(4, 1fr)", // Four columns for large screens
            }}
            gap={6}
          >
            {section.items.map((item, itemIndex) =>
              isLinkedItem(item) ? (
                // Linked Item (Clickable)
                <Link
                  key={itemIndex}
                  href={item.link}
                  isExternal
                  _hover={{ textDecoration: "none" }}
                  style={{
                    gridColumn: itemIndex === 0 || itemIndex === 4 ? "1 / -1" : undefined, // Span full width for 1st and 5th items
                  }}
                >
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="md"
                    cursor="pointer"
                  >
                    {/* Image */}
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width="100%"
                      height="auto"
                      filter="brightness(0.8)" // Dim the image
                    />
                    {/* Text Overlay */}
                    <HStack
                      position="absolute"
                      bottom="0"
                      left="0"
                      bg="blue.100"
                      borderRadius="0 1.5rem 1.5rem 0"
                      p={4}
                      boxShadow="lg"
                    >
                      <Text fontSize="lg" fontWeight="bold" color="black" lineHeight="1.2">
                        {item.text}
                      </Text>
                    </HStack>
                  </Box>
                </Link>
              ) : (
                // Regular Item (Non-clickable)
                <Box
                  key={itemIndex}
                  style={{
                    gridColumn: itemIndex === 0 || itemIndex === 4 ? "1 / -1" : undefined, // Span full width for 1st and 5th items
                  }}
                  w={
                    sectionIndex === 1 && itemIndex > 4 // For bottom 3 images of the second section
                      ? "30%" // Make smaller images 30% width
                      : "auto"
                  }
                  mx="auto" // Center the smaller images
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    borderRadius="md"
                    width="100%"
                    height="auto"
                  />
                </Box>
              )
            )}
          </Grid>
        </Box>
      ))}
    </Box>
          </Box>
        )}

        <Footer />
      </VStack>

      {page === "home" && (
        <>
       
          <Box className="shape" bg="red" zIndex='4'></Box >
        </>
      )}
       {/* Contact Modal */}
      <ContactForm isOpen={isContactOpen} onClose={onContactClose} />
      <div className="bg"></div>
    </>
  );
}
