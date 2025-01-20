import { Box, Image, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface CardProps {
  src: string;
  alt: string;
  text?: string;
  link?: string;
  isBig?: boolean;
  isMobile?: boolean;
  onClick?: () => void; // Optional onClick prop
}

export const Card: React.FC<CardProps> = ({ src, alt, text, link, isBig, isMobile, onClick }) => {
  return (
    <Box
      w="100%"
      position="relative"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      cursor={onClick ? "pointer" : "default"} // Cursor pointer if onClick is provided
      onClick={onClick} // Attach onClick if provided
      sx={{
        perspective: isBig ? "1000px" : "unset", // Enable perspective for big cards
      }}
    >
      {/* Aspect Ratio Box for 16:9 */}
      <Box
        position="relative"
        pb="56.25%" // 16:9 aspect ratio
        w="100%"
        sx={{
          transformStyle: isBig ? "preserve-3d" : "unset",
          transition: isBig ? "transform 0.6s" : "unset",
        }}
      >
        {/* Front Side */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          backgroundImage={`url(${src})`}
          backgroundSize="cover"
          backgroundPosition="center"
          sx={{
            backfaceVisibility: "hidden",
          }}
        />

        {/* Back Side */}
        {isBig && (
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            background="white"
            borderRadius="md"
            transform="rotateY(180deg)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="lg"
            sx={{
              backfaceVisibility: "hidden",
            }}
          >
            <VStack>
              <Text fontSize="xl" fontWeight="bold">
                {text || "No Description"}
              </Text>
              {link && (
                <Link href={link} isExternal fontSize="md" color="blue.500">
                  Visit Link →
                </Link>
              )}
            </VStack>
          </Box>
        )}
      </Box>
    </Box>
  );
};
