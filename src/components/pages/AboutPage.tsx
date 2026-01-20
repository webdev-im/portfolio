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

    const galleryRef = useRef<HTMLDivElement | null>(null);

    // Dynamic Colors for the "Tint/Glow"
    const glowColor = useColorModeValue("rgba(66, 153, 225, 0.15)", "rgba(74, 27, 121, 0.3)");
    const sectionBg = useColorModeValue("gray.50", "transparent");

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

            <VStack as="main" minW="100%" zIndex="4" spacing={0}>
                {/* HERO SECTION */}
                <VStack
                    minH="90vh"
                    justify="center"
                    px="1rem"
                    maxW="1200px"
                    textAlign={isMobile ? "center" : "left"}
                    position='relative'
                >
                    <Flex direction="column" align={isMobile ? "center" : "start"}>
                        <Text
                            fontSize={isMobile ? "xs" : "sm"}
                            mb="2"
                            fontWeight="800"
                            color="brand.500"
                            letterSpacing="0.4em"
                        >
                            WEB DEVELOPER
                        </Text>

                        <Heading
                            fontSize={isMobile ? "clamp(2.5rem, 10vw, 4rem)" : "7.5rem"}
                            fontWeight="900"
                            lineHeight="1.1"
                            mb={isMobile ? '6' : '14'}
                            letterSpacing="-0.04em"
                        >
                            Crafting Modern <br />
                            <Text as="span" color="brand.500">
                                Experiences.
                            </Text>
                        </Heading>

                        <Stack
                            direction={isMobile ? "column" : "row"}
                            spacing={8}
                            align="center"
                        >
                            <MultilayerButton
                                buttonText="Let's talk"
                                onClick={() => console.log("Contact")}
                                size={isMobile ? "sm" : "lg"}
                            />
                            <Text
                                fontSize={isMobile ? "md" : "lg"}
                                maxW="450px"
                                opacity={0.7}
                            >
                                High-performance digital products with a polished aesthetic.
                            </Text>
                        </Stack>
                    </Flex>

                    {/* ENHANCED SCROLL INDICATOR */}
                    <Box
                        position="absolute"
                        bottom="3rem"
                        left="50%"
                        cursor="pointer"
                        animation={`${bounce} 2s infinite`}
                        onClick={handleScrollDown}
                        zIndex={10}
                    >
                        <Flex
                            w="50px"
                            h="50px"
                            borderRadius="full"
                            bg="whiteAlpha.200"
                            backdropFilter="blur(10px)"
                            border="1px solid"
                            borderColor="whiteAlpha.300"
                            align="center"
                            justify="center"
                            color="white"
                            transition="all 0.3s"
                            _hover={{ bg: "whiteAlpha.400" }}
                        >
                            <Icon as={FiChevronDown} w={6} h={6} />
                        </Flex>
                    </Box>
                </VStack>

                {/* GALLERY SECTION WITH ENHANCED GLOW */}
                <Box
                    ref={galleryRef}
                    as="section"
                    position="relative"
                    w="100%"
                    py={{ base: "4rem", md: "8rem" }}
                    bg={sectionBg}
                    overflow="hidden"
                >
                    {/* THE RADIANT GLOW (The Tint) */}
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w={{ base: "300px", md: "800px" }}
                        h={{ base: "300px", md: "800px" }}
                        bg={glowColor}
                        filter="blur(120px)"
                        borderRadius="full"
                        zIndex="0"
                        pointerEvents="none"
                    />

                    <VStack
                        maxW="1400px"
                        mx="auto"
                        px={["1.5rem", "2rem", "4rem"]}
                        position="relative"
                        zIndex="1"
                    >
                        <VStack spacing={4} mb={{ base: "3rem", md: "6rem" }} align="center">
                            <Heading
                                as="h3"
                                size={isMobile ? "xl" : "2xl"}
                                letterSpacing="tighter"
                                fontWeight="900"
                            >
                                <Box as="span" color="brand.500">My</Box> Work
                            </Heading>
                            <Box
                                h="2px"
                                w="80px"
                                bgGradient="linear(to-r, transparent, brand.500, transparent)"
                            />
                        </VStack>

                        <Flex
                            wrap="wrap"
                            gap={{ base: 8, md: 12 }}
                            justify="center"
                            w="100%"
                        >
                            {items.map((item, index) => (
                                <Card
                                    key={index}
                                    {...item}
                                    onClick={() => handleCardClick(index)}
                                />
                            ))}
                        </Flex>
                    </VStack>
                </Box>
            </VStack>
        </>
    );
}