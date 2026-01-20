"use client";

import {
    Box,
    Flex,
    Heading,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    VStack,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { useRef, useState } from "react";

import { Card } from "@/components/Layout/Card";
import MultilayerButton from "../Layout/action/StyledButton";
import { keyframes } from "@emotion/react";
import { sections } from "@/constants/data";

interface AboutSectionProps {
    onContactOpen: () => void;
}

export default function AboutSection({ onContactOpen }: AboutSectionProps) {
    const items = sections.flatMap((section) => section.items);

    const isMobile = useBreakpointValue({ base: true, md: false });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const galleryRef = useRef<HTMLDivElement | null>(null);

    // COLORS & THEMING
    const sectionBgColor = useColorModeValue("rgba(247, 250, 252, 0.85)", "rgba(10, 10, 10, 0.7)");

    // DYNAMIC GLOW SETTINGS
    // Higher opacity and blur for mobile to ensure separation is visible
    const glowOpacity = useBreakpointValue({ base: 0.6, md: 0.25 });
    const glowSize = useBreakpointValue({ base: "160%", md: "1200px" });
    const glowBlur = useBreakpointValue({ base: "60px", md: "120px" });

    // Correctly applying opacity to the radial gradient
    const lightGlow = `radial-gradient(circle, rgba(66, 153, 225, ${glowOpacity}) 0%, transparent 70%)`;
    const darkGlow = `radial-gradient(circle, rgba(121, 40, 202, ${glowOpacity}) 0%, transparent 70%)`;
    const sectionGlow = useColorModeValue(lightGlow, darkGlow);

    // ARROW & UI
    const arrowColor = useColorModeValue("gray.800", "white");
    const arrowBg = useColorModeValue("white", "whiteAlpha.200");
    const arrowBorder = useColorModeValue("gray.200", "whiteAlpha.300");

    const handleScrollDown = () => {
        galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCardClick = (index: number) => {
        setSelectedImage(items[index].src);
        onOpen();
    };

    const bounce = keyframes`
        0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
        40% { transform: translateX(-50%) translateY(-10px); }
        60% { transform: translateX(-50%) translateY(-5px); }
    `;

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.800" />
                <ModalContent
                    maxW={["95%", "85%", "75%"]}
                    bg="transparent" // Remove content bg to let image be the star
                    boxShadow="none"
                    position="relative"
                >
                    {/* HIGH VISIBILITY CLOSE BUTTON */}
                    <Box
                        position="absolute"
                        top={{ base: "-50px", md: "10px" }} // On mobile, move it ABOVE the image
                        right={{ base: "50%", md: "-60px" }} // On mobile, center it; on desktop, move it OUTSIDE
                        transform={{ base: "translateX(50%)", md: "none" }}
                        zIndex="20"
                        onClick={onClose}
                        cursor="pointer"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="44px"
                        h="44px"
                        borderRadius="full"
                        // Stronger glass effect to ensure visibility
                        bg="rgba(255, 255, 255, 0.2)"
                        backdropFilter="blur(15px)"
                        border="1px solid"
                        borderColor="whiteAlpha.400"
                        color="white"
                        boxShadow="0 4px 12px rgba(0,0,0,0.5)"
                        transition="all 0.2s"
                        _hover={{ bg: "whiteAlpha.400", transform: isMobile ? "translateX(50%) scale(1.1)" : "scale(1.1)" }}
                    >
                        <Icon as={FiX} w={6} h={6} strokeWidth={3} />
                    </Box>

                    <ModalBody p={0} display="flex" justifyContent="center">
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                alt="Fullscreen view"
                                maxW="100%"
                                maxH="85vh" // Leave room for the button on mobile
                                borderRadius="24px" // Match your card style
                                objectFit="contain"
                                boxShadow="0 20px 60px rgba(0,0,0,0.5)"
                                onClick={onClose}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            <VStack as="main" minW="100%" spacing={0} position="relative" >

                {/* HERO SECTION */}
                <VStack
                    h="96vh"
                    justify="center"
                    px="1rem"
                    maxW="1200px"
                    textAlign={isMobile ? "center" : "left"}
                    position='relative'
                    zIndex="1"
                >
                    <Flex direction="column" align={isMobile ? "center" : "start"}>
                        <Text fontSize={isMobile ? "xs" : "sm"} mb="2" fontWeight="800" color="brand.500" letterSpacing="0.4em">
                            WEB DEVELOPER
                        </Text>
                        <Heading fontSize={isMobile ? "clamp(2.5rem, 10vw, 4.5rem)" : "7.5rem"} fontWeight="900" lineHeight="1.1" mb={isMobile ? '6' : '14'} letterSpacing="-0.04em">
                            Crafting Modern <br />
                            <Text as="span" color="brand.500">Experiences.</Text>
                        </Heading>
                        <Stack direction={isMobile ? "column" : "row"} spacing={8} align="center">
                            <MultilayerButton buttonText="Let's talk" onClick={() => {
                                onContactOpen();
                                onClose();
                            }} size={isMobile ? "sm" : "lg"} />
                            <Text fontSize={isMobile ? "md" : "lg"} maxW="450px" opacity={0.7}>
                                High-performance digital products with a polished aesthetic.
                            </Text>
                        </Stack>
                    </Flex>

                    <Box position="absolute" bottom="4rem" left="50%" cursor="pointer" animation={`${bounce} 2s infinite`} onClick={handleScrollDown} zIndex="10">
                        <Flex w="64px" h="64px" borderRadius="full" bg={arrowBg} border="1px solid" borderColor={arrowBorder} boxShadow="xl" align="center" justify="center" color={arrowColor}>
                            <Icon as={FiChevronDown} w={8} h={8} strokeWidth={2.5} />
                        </Flex>
                    </Box>
                </VStack>

                {/* THE CURVE SEPARATOR */}
                <Box
                    w="100%"
                    h={{ base: "80px", md: "150px" }}
                    position="relative"
                    zIndex="2"
                    mt="-1px"
                    pointerEvents="none"
                >
                    <svg width="100%" height="100%" viewBox="0 0 1440 150" preserveAspectRatio="none" style={{ display: 'block' }}>
                        <defs>
                            <linearGradient id="curve-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor={sectionBgColor} stopOpacity="0" />
                                <stop offset="100%" stopColor={sectionBgColor} stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0 0 C 480 150, 960 150, 1440 0 L 1440 150 L 0 150 Z"
                            fill="url(#curve-gradient)"
                        />
                    </svg>
                </Box>

                {/* GALLERY SECTION */}
                <Box
                    ref={galleryRef}
                    as="section"
                    position="relative"
                    w="100%"
                    py={{ base: "4rem", md: "10rem" }}
                    bg={sectionBgColor}
                    backdropFilter="blur(20px)"
                    overflow="hidden"
                >
                    {/* ENHANCED GLOW - Optimized for mobile visibility */}
                    <Box
                        position="absolute"
                        top="2%"
                        left="50%"
                        transform="translateX(-50%)"
                        w={glowSize}
                        h={{ base: "600px", md: "800px" }}
                        bg={sectionGlow}
                        filter={`blur(${glowBlur})`}
                        zIndex="0"
                        pointerEvents="none"
                        opacity={isMobile ? 0.8 : 1}
                    />

                    <VStack maxW="1400px" mx="auto" px={["1.5rem", "2rem", "4rem"]} position="relative" zIndex="1">
                        <VStack spacing={6} mb={{ base: "4rem", md: "8rem" }} align="center">
                            <Heading as="h3" size={isMobile ? "xl" : "2xl"} letterSpacing="tighter" fontWeight="900">
                                <Box as="span" color="brand.500">My</Box> Work
                            </Heading>
                            <Box h="3px" w="100px" bgGradient="linear(to-r, transparent, brand.500, transparent)" />
                        </VStack>

                        <Flex wrap="wrap" gap={{ base: 10, md: 16 }} justify="center" w="100%">
                            {items.map((item, index) => (
                                <Card key={index} {...item} onClick={() => handleCardClick(index)} />
                            ))}
                        </Flex>
                    </VStack>
                </Box>
            </VStack>
        </>
    );
}