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

import BigTextSlides from "@/components/Layout/BigTextSlides";
import { Card } from "@/components/Layout/Card";
import ContactForm from "@/components/Layout/ContactForm";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import MultilayerButton from './../components/Layout/action/StyledButton';
import { useState } from "react";

// Regular item (non-clickable)
interface RegularItem {
  src: string;
  alt: string;
}

// Linked item (clickable with text and a link)
interface LinkedItem extends RegularItem {
  text?: string;
  link?: string;
}

// Union type for all items
type SectionItem = RegularItem | LinkedItem;

// Section type
interface Section {
  heading: string;
  items: SectionItem[];
}


const sections: Section[] = [
  {
    heading: "Live projects",
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
  },
  {
    heading: "Visual Design Solutions",
    items: [
      { src: "/images/imageOne.png", alt: "Epic forests", text: "Epic forests"},
      { src: "/images/imageTwo.png", alt: "Cozy cafe",text: "Cozy cafe" },
      { src: "/images/imageThree.png", alt: "Parfois", text: "Parfois" },
      { src: "/images/imageFour.png", alt: "Sauce pizza", text: "Sauce pizza" },
    ],
  },
];

export default function Page() {

  const theme =useTheme()
  const {
    isOpen: isContactOpen,
    onOpen: onContactOpen,
    onClose: onContactClose,
  } = useDisclosure();

  // Animation control
  const [isPaused, setIsPaused] = useState(false);
  const [page, setPage] = useState<"home" | "about">("home");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [sectionsTopCard, setSectionsTopCard] = useState<SectionItem[]>(
    sections.map((section) => section.items[0] || { src: "", alt: "" })
  );
  const [sectionsBottomCards, setSectionsBottomCards] = useState(
    sections.map((section) => section.items.slice(1))
  );
  const [flippedStates, setFlippedStates] = useState(sections.map(() => false));

  const toggleFlip = (sectionIndex: number, cardIndex?: number) => {
    setFlippedStates((prev) =>
      prev.map((flipped, index) =>
        index === sectionIndex ? !flipped : flipped
      )
    );
  };

  const handleCardClick = (sectionIndex: number, itemIndex: number) => {
    if (isMobile) {
      toggleFlip(sectionIndex, itemIndex);
      return;
    }

    const clickedCard = sectionsBottomCards[sectionIndex][itemIndex];
    const currentTopCard = sectionsTopCard[sectionIndex];

    setSectionsTopCard((prev) =>
      prev.map((topCard, index) =>
        index === sectionIndex ? clickedCard : topCard
      )
    );

    setSectionsBottomCards((prev) =>
      prev.map((bottomCards, index) =>
        index === sectionIndex
          ? [currentTopCard, ...bottomCards.filter((_, i) => i !== itemIndex)]
          : bottomCards
      )
    );
  };

  const isLinkedItem = (item: SectionItem): item is LinkedItem => {
    return "text" in item;
  };


  const getLinkedItemProps = (item: SectionItem) => {
    return {
      text: "text" in item ? item.text : undefined, // Include `text` if it exists
      link: "link" in item ? item.link : undefined, // Include `link` if it exists
    };
  };


  const { colorMode } = useColorMode()


  return (
    <>
      <VStack minH="100vh" justify="space-between" zIndex="4">
        <Header page={page} setPage={setPage} onContactOpen={onContactOpen} />
        {page === "home" && (
          <VStack spacing={0} justifyContent="space-between">
            <VStack
              mb={{ base: "2rem", md: "0" }}
              className="shape"
              bg="gray"
              p={["2.2rem", "5rem"]}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              borderWidth='2px'
              borderColor={theme.colors?.brand?.[500] || "#6c87dc"}
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
                <Text as="span" color="brand.500">
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
          <Box
            as="main"
          
            zIndex="4"
            maxW={["100%", "60%"]}
     
          >
            {/* Hero Section */}
            <VStack   minH='90vh' justify='space-between'>
              <Flex></Flex>
              <Flex direction="column" align="start" px={{ base: "1rem", md: "0" }}  maxW='1200px'>
              <Text size={["xl", "lg"]} mb={["2", "4"]} fontWeight="500">
                Hi, I am WebDev I’m
              </Text>
              <Heading
                fontSize={["5xl", "6rem"]}
                fontWeight="700"
                mb={["10", "15"]}
                lineHeight={["3.4rem", "6.2rem"]}
              >
                Your Creative Partner in Crafting Exceptional{" "}
                <Text as="span" color="#415bb2">
                  Digital Experiences!
                </Text>
              </Heading>
              <Stack
                justify="space-between"
                direction={isMobile ? "column" : "row-reverse"}
                mt={["", "5rem"]}
                minW={["", "100%"]}
              >
                <Text
                  fontSize={["md", "lg"]}
                  mb={6}
                  maxW="600px"
                  fontWeight="300"
                >
                  My mission is simple: to make your digital presence seamless,
                  engaging, and impactful. Let’s create something extraordinary
                  together!
                </Text>
                <MultilayerButton buttonText={`Let's talk`}    onClick={onContactOpen} size={isMobile? 'md': 'lg'}></MultilayerButton>
             
              </Stack>
            </Flex>
            <VStack minW="full" mt={['4rem']}>
              <div className="mouse"></div>
            </VStack></VStack>
            <Box mt={["", "7rem"]}>

{/* slides */}

              <VStack minH="100vh" justify="space-between" zIndex="4" px={['1rem', '']} mt={['5rem','']}  >
                <Box mt={["", "7rem"]}  minW='100%'>
                  {sections.map((section, sectionIndex) => (
                    <Box key={sectionIndex} mb={['6rem', '10rem']}>
                      {/* Section Heading */}
                      <Flex
      align="center"
   
      justify="flex-start"
      mb={['10', '20']}
    >
      <Heading as="h3" size={["lg", "3xl"]} mb={['','2']}>
        <Box as="span" color={colorMode === "light" ? "#6c87dc" : "#6c87dc"}>
          {section.heading.split(" ")[0].toUpperCase()}
        </Box>{" "}
        {section.heading.split(" ").slice(1).join(" ").toUpperCase()}
      </Heading>

      {/* Loader */}
   {section.heading === 'Live projects' &&    <Box
       height={['3rem', '5rem']}
       width={['3rem', '5rem']}
   ml={['1rem', '2rem']}
        className="water"
       backgroundColor={colorMode==='light'? '#33468b' : '#94a7e6'}
        ></Box>}
    </Flex>

                      {/* Top Card */}
                      <Card
                        src={sectionsTopCard[sectionIndex]?.src || ""}
                        alt={sectionsTopCard[sectionIndex]?.alt || ""}
                        {...getLinkedItemProps(sectionsTopCard[sectionIndex])}
                        isBig={!isMobile}
                        isMobile={isMobile}
                        onClick={
                          () =>
                            isMobile ? toggleFlip(sectionIndex) : undefined // No action for desktop unless clicking bottom cards
                        }
                      />

                      {/* Bottom Cards */}
                      <Grid
                        templateColumns={{
                          base: "repeat(1, 1fr)", // Single column on small screens
                          md: "repeat(3, 1fr)", // Three columns on medium and larger screens
                        }}
                        gap={4}
                        mt={4}
                      >
                        {sectionsBottomCards[sectionIndex].map(
                          (item, itemIndex) => (
                            <Card
                            key={itemIndex}
                            src={item.src}
                            alt={item.alt}
                            {...getLinkedItemProps(item)} // Spread the result
                            isBig={false}
                            isMobile={isMobile}
                            onClick={() => handleCardClick(sectionIndex, itemIndex)}
                          />
                          
                          
                          )
                        )}
                      </Grid>
                    </Box>
                  ))}
                </Box>
              </VStack>


              {/* slides */}
            </Box>
          </Box>
        )}
        <Footer />
      </VStack>
      {page === "home" && (
        <>
          <Box className="shape" bg="red" zIndex="4"></Box>
        </>
      )}
      {/* Contact Modal */}
      <ContactForm isOpen={isContactOpen} onClose={onContactClose} />
      <div className="bg"></div>
    </>
  );
}
