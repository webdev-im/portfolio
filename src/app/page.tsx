"use client";

import {
  Button,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Link,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import BigTextSlides from "@/components/Layout/BigTextSlides";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import { NextSeo } from "next-seo";
import React from "react";
import { motion } from "framer-motion";

export default function Container(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = React.useState("");
  const { colorMode } = useColorMode();

  return (
    <>
      <NextSeo
        title="WebDev I'm"
        description="WebDev I'm, UI/UX Designer, Frontend Developer, and a blogger."
      />

      {/* metatags */}

      {/* Theme provider */}
      <ChakraProvider>
        <VStack minH="100vh" spacing={0} justifyContent="space-between">
          {/* Header */}
          <Header onClick={onOpen} />

          {/* Drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
              bg={
                colorMode === "light" ? "rgb(40, 40, 40) " : "rgb(70, 70, 70)"
              }
              color={colorMode === "light" ? "black" : "white"}
            >
              <DrawerCloseButton mt={2} mr={2} />
              <DrawerHeader>Live projects</DrawerHeader>

              <DrawerBody>
                <VStack spacing={4}>
                  {[
                    {
                      title: "Renata Valcik",
                      string: "renatavalcik",
                      url: "renatavalcik.com",
                    },
                    {
                      title: "Animatrix",
                      string: "animatrix",
                      url: "animatrix.lt",
                    },
                    {
                      title: "Something for Windy",
                      string: "somethingforwindy",
                      url: "somethingforwindy.netlify.app",
                    },
                    {
                      title: "Cozy cafe",
                      string: "cozycafe",
                      url: "cozy-cafe.netlify.app",
                    },
                  ].map((e) => (
                    <motion.div
                      key={e.title}
                      animate={{ y: 20 }}
                      transition={{ delay: 1 }}
                    >
                      <Link
                        href={`https://${e.url}`}
                        isExternal
                        onMouseEnter={() => {
                          setTitle(e.title);
                        }}
                        onMouseLeave={() => {
                          setTitle("");
                        }}
                        style={{ position: "relative" }}
                      >
                        <Image
                          src={`/${e.string}.png`}
                          alt={e.title}
                          width={500}
                          height={400}
                        />
                        <Text
                          position="absolute"
                          bottom={2}
                          left={2}
                          fontWeight="bold"
                        >
                          {title === e.title && e.title}
                        </Text>
                      </Link>
                    </motion.div>
                  ))}
                </VStack>
              </DrawerBody>

              <DrawerFooter>
                <Button onClick={onClose} colorScheme="blue">
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <VStack mb={{ base: "2rem", md: "0" }}>
            <Heading
              fontSize={{ base: "xs", md: "lg" }}
              transition="0.3s"
              mt={{ base: "1rem", md: "0" }}
            >
              I specialize in these technologies
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

          <Footer />
        </VStack>
        <div className="bg"></div>
      </ChakraProvider>
    </>
  );
}
