"use client";

import {
  Badge,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  Tooltip,
  VStack,
  useBreakpointValue,
  useColorMode
} from "@chakra-ui/react";
import {
  FiCheckCircle,
  FiFacebook,
  FiGlobe,
  FiInstagram,
} from "react-icons/fi";

import { ItemType } from "@/constants/data";
import MultilayerButton from "./action/StyledButton";
import React from "react";

interface CardProps {
  src: string;
  alt: string;
  text?: string;
  link?: string;
  fbLink?: string;
  website?: string;
  instagram?: string;
  type: ItemType;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  src,
  alt,
  text,
  link,
  fbLink,
  website,
  instagram,
  type,
  onClick,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const isMobile = useBreakpointValue({ base: true, md: false })
  const buttonLabel = type === "project" ? "Live project" : "View design";

  return (
    <Box
      onClick={onClick}
      position="relative"
      flex={{ base: "1 1 100%", sm: "1 1 45%", md: "1 1 350px" }}
      maxW={{ base: "100%", md: "400px" }}
      h={{ base: "450px", md: "500px" }}
      borderRadius="32px"
      overflow="hidden"
      cursor="pointer"
      role="group"
      bg={isDark ? "gray.800" : "gray.100"}
      transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      _hover={{ transform: "scale(1.02)" }}
    >
      {/* BACKGROUND IMAGE */}
      <Image
        src={src}
        alt={alt}
        w="100%"
        h="100%"
        objectFit="cover"
        transition="transform 0.6s ease"
        _groupHover={{ transform: "scale(1.1)" }}
      />

      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 90%)"
      />

      {/* TOP BADGE */}
      <Badge
        position="absolute"
        top="5"
        left="5"
        px="3"
        py="1"
        borderRadius="full"
        fontSize="10px"
        fontWeight="bold"
        color="white"
        backdropFilter="blur(8px)"
        bg="whiteAlpha.300"
      >
        {type === "project" ? "Design & Code" : "Visual Design"}
      </Badge>

      {/* CONTENT AREA */}
      <VStack
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p="6"
        spacing={4}
        align="start"
      >
        <VStack align="start" spacing={1} w="100%">
          <HStack spacing={2}>
            <Heading size="md" color="white" fontSize="22px" letterSpacing="-0.02em">
              {text}
            </Heading>

            {/* GREEN TICK LOGIC */}
            {link && (
              <Tooltip
                label="This project is live and verified"
                hasArrow
                placement="top"
                bg="gray.700"
                color="white"
              >
                <Box display="flex" alignItems="center">
                  <Icon as={FiCheckCircle} color="green.400" w={5} h={5} />
                </Box>
              </Tooltip>
            )}
          </HStack>

          <Text color="whiteAlpha.800" fontSize="sm" noOfLines={2}>
            {type === "project"
              ? "Focused on simplicity, performance, and clean code."
              : "Exploring intuitive design and modern visual identity."}
          </Text>
        </VStack>

        {/* FOOTER: SOCIALS + CONDITIONAL BUTTON */}
        <Flex w="100%" justify="space-between" align="center">
          <HStack spacing={4} color="whiteAlpha.900">
            {website && (
              <Link href={website} isExternal _hover={{ color: "blue.300" }}>
                <Icon as={FiGlobe} w={5} h={5} />
              </Link>
            )}
            {fbLink && (
              <Link href={fbLink} isExternal _hover={{ color: "facebook.400" }}>
                <Icon as={FiFacebook} w={5} h={5} />
              </Link>
            )}
            {instagram && (
              <Link href={instagram} isExternal _hover={{ color: "pink.400" }}>
                <Icon as={FiInstagram} w={5} h={5} />
              </Link>
            )}
          </HStack>

          {/* RENDER BUTTON ONLY IF LINK EXISTS */}
          {link && (
            <Box onClick={(e) => e.stopPropagation()}>
              <MultilayerButton
                buttonText={buttonLabel}
                onClick={() => window.open(link, "_blank")}
                size={isMobile ? 'xs' : 'sm'}
              />
            </Box>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};