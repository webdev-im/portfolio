import React from "react";
import { Box, Image, Text, Link, HStack } from "@chakra-ui/react";

interface ProjectCardProps {
  image: string; // Image URL
  altText: string; // Alt text for the image
  projectName: string; // Project name
  projectHighlight?: string; // Highlighted part of the project name
  link?: string; // External link (optional)
  isExternal?: boolean; // Whether the link is external
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  altText,
  projectName,
  projectHighlight,
  link,
  isExternal = false, // Defaults to false
}) => {
  // Conditional rendering for the link
  const Wrapper = link ? Link : React.Fragment;

  return (
    <Wrapper {...(link ? { href: link, isExternal, _hover: { textDecoration: "none" } } : {})}>
      <Box position="relative" overflow="hidden" borderRadius="lg" cursor={link ? "pointer" : "default"}>
        {/* Image */}
        <Image
          src={image}
          alt={altText}
          width="100%"
          height="auto"
          filter="brightness(0.8)" // Dim the image slightly
        />

        {/* Text Box */}
        <HStack
          position="absolute"
          bottom="2rem"
          left="2rem"
          bg="blue.100"
          borderRadius="0 1.5rem 1.5rem 0"
          p={4}
          boxShadow="lg"
          maxW={["100px", "300px"]}
        >
          <Text fontSize="lg" fontWeight="bold" color="black">
            {projectName}{" "}
            {projectHighlight && (
              <Text as="span" color="orange.500">
                {projectHighlight}
              </Text>
            )}
          </Text>
        </HStack>
      </Box>
    </Wrapper>
  );
};

export default ProjectCard;
