import { Box, Link, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface CardProps {
  src: string;
  alt: string;
  text?: string;
  link?: string;
  isBig?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  src,
  alt,
  text,
  link,
  isBig,
  isMobile,
  onClick,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBig || isMobile) {
      setFlipped(!flipped);
    }
  };

  return (
    <Box
      w="100%"
      position="relative"
      borderRadius="md"
      overflow="visible"
      boxShadow="md"
      cursor="pointer"
      sx={{
        perspective: "1200px",
      }}
      onClick={isMobile || isBig ? handleFlip : onClick}
    >
      <Box
        position="relative"
        pb="56.25%" // Maintain aspect ratio
        w="100%"
        sx={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
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
          borderRadius="md"
          sx={{
            backfaceVisibility: "hidden",
          }}
        />

        {/* Back Side */}
        {isBig || isMobile ? (
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
                {text || "No Title"}
              </Text>
              {link && (
                <Link href={link} isExternal fontSize="md" color="blue.500">
                  Visit Link →
                </Link>
              )}
            </VStack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
