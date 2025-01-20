"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";

import BigTextSlides from "@/components/Layout/BigTextSlides";
import ContactForm from "@/components/Layout/ContactForm";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { NextSeo } from "next-seo";
import { useState } from "react"

/// Regular item (non-clickable)
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
          alt: "Renata Valcik",
          text: "Renata Valcik",
          link: "https://renatavalcik.com",
        },
        {
          src: "/images/imageSeven.png",
          alt: "Animatrix",
          text: "Animatrix",
          link: "https://animatrix.lt",
        },
        {
          src: "/images/imageEight.png",
          alt: "Something for Windy",
          text: "Something for Windy",
          link: "https://somethingforwindy.netlify.app",
        },
      ],
      gridColumns: { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
    },
  ];

export default function Page() {

  const {
    isOpen: isContactOpen,
    onOpen: onContactOpen,
    onClose: onContactClose,
  } = useDisclosure();

  // Animation control
  const [isPaused, setIsPaused] = useState(false);
  const [page, setPage] = useState<"home" | "about">("home");
  const isMobile = useBreakpointValue({ base: true, md: false });

  // State for each section's items
  const [sectionItems, setSectionItems] = useState(
    sections.map((section) => section.items)
  );

  const handleItemClick = (sectionIndex: number, itemIndex: number) => {
    const clickedItem = sectionItems[sectionIndex][itemIndex];
    const updatedItems = [
      clickedItem,
      ...sectionItems[sectionIndex].filter((_, i) => i !== itemIndex),
    ];
    setSectionItems((prev) =>
      prev.map((items, index) =>
        index === sectionIndex ? updatedItems : items
      )
    );
  };



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
              border="5px solidrgb(3, 123, 252)"
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
          <Box as="main" py={8} zIndex='4'  maxW={['100%', '60%']} pt={['','10rem']} >
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
              <Stack justify='space-between' direction={isMobile? 'column' : 'row-reverse'} mt={['', '2rem']} minW={['', '100%']}>
              <Text fontSize={['md', 'lg']} mb={6} maxW="600px" fontWeight='300'>
                My mission is simple: to make your digital presence seamless,
                engaging, and impactful. Let’s create something extraordinary
                together!
              </Text>
              <Button colorScheme="blue" size={['md', 'lg']} onClick={onContactOpen}>
                Let's Talk →
              </Button>
              </Stack>
            </Flex>
           <VStack minW='full'> 
            <div className="mouse"></div>
              </VStack>
            <Box mt={['', '7rem']}>
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} mb={12} >
          {/* Section Heading */}
          <Heading as="h3" size={['md', 'xl']} mb={4}>
            {section.heading.toUpperCase()}
          </Heading>

          {/* Render Grid */}
          <Grid
              my={["", "4rem"]}
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              <AnimatePresence>
                {sectionItems[sectionIndex].map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleItemClick(sectionIndex, itemIndex)}
                    style={{
                      gridColumn: itemIndex === 0 ? "1 / -1" : undefined,
                      cursor: "pointer",
                    }}
                  >
                    <HStack>
                      <Box position="relative" overflow="hidden" borderRadius="md">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width="100%"
                          height="auto"
                          filter="brightness(0.8)"
                        />
                        {isLinkedItem(item) && (
                          <Link href={item.link} isExternal>
                            <HStack
                              position="absolute"
                              bottom="0"
                              left="0"
                              bg="blue.100"
                              borderRadius="0 1.5rem 1.5rem 0"
                              p={4}
                              boxShadow="lg"
                            >
                              <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="black"
                                lineHeight="1.2"
                              >
                                {item.text}
                              </Text>
                            </HStack>
                          </Link>
                        )}
                      </Box>
                    </HStack>
                  </motion.div>
                ))}
              </AnimatePresence>
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
