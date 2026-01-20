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
import { useRef, useState } from "react";

import { Card } from "@/components/Layout/Card";
import { FiChevronDown } from "react-icons/fi";
import MultilayerButton from "../Layout/action/StyledButton";
import { keyframes } from "@emotion/react";
import { sections } from "@/constants/data";

export default function AboutSection() {
    const items = sections.flatMap((section) => section.items);

    const isMobile = useBreakpointValue({ base: true, md: false });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const curveColor = useColorModeValue("#f7fafc", "#0a0a0a"); // Matches sectionBg
    const galleryRef = useRef<HTMLDivElement | null>(null);

    // Modern Section Separator Logic
    const sectionGlow = useColorModeValue(
        "radial-gradient(circle, rgba(66,153,225,0.12) 0%, transparent 70%)",
        "radial-gradient(circle, rgba(121,40,202,0.25) 0%, transparent 70%)"
    );

    // Fixed: Arrow visibility for Light Mode
    const arrowColor = useColorModeValue("gray.800", "white");
    const arrowBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
    const arrowBorder = useColorModeValue("gray.200", "whiteAlpha.300");
    const sectionBg = useColorModeValue("gray.50", "#0a0a0a");
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
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent
                    maxW={["95%", "80%", "70%"]}
                    bg="rgba(0,0,0,0.85)"
                    backdropFilter="blur(20px)"
                    borderRadius="32px"
                    overflow="hidden"
                >
                    <ModalBody p={0}>
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                alt="Fullscreen"
                                w="100%"
                                h="100%"
                                objectFit="contain"
                                onClick={onClose}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            <VStack as="main" minW="100%" zIndex="4" spacing={0} position="relative">
                {/* HERO SECTION - Guaranteed 100vh */}
                <VStack
                    h="93vh"
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
                            <MultilayerButton buttonText="Let's talk" onClick={() => console.log("Contact")} size={isMobile ? "sm" : "lg"} />
                            <Text fontSize={isMobile ? "md" : "lg"} maxW="450px" opacity={0.7}>
                                High-performance digital products with a polished aesthetic.
                            </Text>
                        </Stack>
                    </Flex>

                    {/* SCROLL INDICATOR */}
                    <Box position="absolute" bottom="3rem" left="50%" cursor="pointer" animation={`${bounce} 2s infinite`} onClick={handleScrollDown} zIndex="10">
                        <Flex w="64px" h="64px" borderRadius="full" bg={arrowBg} border="1px solid" borderColor={arrowBorder} boxShadow="xl" align="center" justify="center" color={arrowColor}>
                            <Icon as={FiChevronDown} w={8} h={8} strokeWidth={2.5} />
                        </Flex>
                    </Box>
                </VStack>



                {/* GALLERY SECTION */}
                <Box
                    ref={galleryRef}
                    as="section"
                    position="relative"
                    w="100%"
                    py={{ base: "4rem", md: "10rem" }}
                    // The transparent background
                    bg={useColorModeValue("rgba(247, 250, 252, 0.7)", "rgba(10, 10, 10, 0.5)")}
                    // Blurs the radiant glow underneath for a frosted look
                    backdropFilter="blur(20px)"
                    overflow="hidden"
                >
                    {/* ENHANCED GLOW (Now anchored to the section) */}
                    <Box
                        position="absolute"
                        top="20%"
                        left="50%"
                        transform="translateX(-50%)"
                        w="100%"
                        maxW="1000px"
                        h="600px"
                        bg={sectionGlow}
                        filter="blur(100px)"
                        zIndex="0"
                        pointerEvents="none"
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