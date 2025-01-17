"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

import BaseLayout from "@/components/Layout/BaseLayout";

const AboutPage = () => {
  return (
    <BaseLayout>
      <Box as="main" px={4} py={8}>
        {/* Hero Section */}
        <Flex direction="column" align="center" textAlign="center" mb={12}>
          <Heading as="h1" size="xl" mb={4}>
            Hi, I am WebDev I’m
          </Heading>
          <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
            Your Creative Partner in Crafting Exceptional{" "}
            <Text as="span" color="gray.500">
              Digital Experiences!
            </Text>
          </Heading>
          <Text fontSize="lg" mb={6} maxW="600px">
            My mission is simple: to make your digital presence seamless,s
            engaging, and impactful. Let’s create something extraordinary
            together!
          </Text>
          <Button colorScheme="blue" size="lg">
            Let's Talk →
          </Button>
        </Flex>

        {/* Visual Design Solutions */}
        <Box mb={12}>
          <Heading as="h3" size="md" mb={4}>
            Visual design solutions
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            <Image
              src="/images/imageOne.png"
              alt="Design 1"
              borderRadius="md"
            />
            <Image
              src="/images/imageTwo.png"
              alt="Design 2"
              borderRadius="md"
            />
            <Image
              src="/images/imageThree.png"
              alt="Design 3"
              borderRadius="md"
            />
            <Image
              src="/images/imageFour.png"
              alt="Design 4"
              borderRadius="md"
            />
          </Grid>
        </Box>

        {/* Technical and Visual Products */}
        <Box mb={12}>
          <Heading as="h3" size="md" mb={4}>
            Technical and visual products
          </Heading>
          <Flex direction="column" align="center" mb={6}>
            <Image
              src="/images/imageFive.png"
              alt="Technical products"
              borderRadius="md"
            />
          </Flex>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <Image
              src="/images/imageSix.png"
              alt="Product 1"
              borderRadius="md"
            />
            <Image
              src="/images/imageSeven.png"
              alt="Product 2"
              borderRadius="md"
            />
            <Image
              src="/images/imageEight.png"
              alt="Product 3"
              borderRadius="md"
            />
          </Grid>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default AboutPage;
