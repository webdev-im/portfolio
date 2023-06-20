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
import { ThemeProvider } from "next-themes";

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
      <VStack>
        <ChakraProvider>
          <Header onClick={onOpen} />

          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
              bg={
                colorMode === "light" ? "rgb(40, 40, 40) " : "rgb(70, 70, 70)"
              }
              color={colorMode === "light" ? "black" : "white"}
            >
              <DrawerCloseButton />
              <DrawerHeader>Live projects</DrawerHeader>

              <DrawerBody>
                <VStack spacing={4}>
                  {[
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
                    {
                      title: "Animatrix",
                      string: "animatrix",
                      url: "animatrix.lt",
                    },
                  ].map((e) => (
                    <Link
                      href={`/${e.url}`}
                      key={e.title}
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
                  ))}
                </VStack>
              </DrawerBody>

              <DrawerFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <VStack mb={{ base: "2rem", md: "0" }}>
            <Heading
              fontSize={{ base: "sm", md: "lg" }}
              // className="flipH"
              transition="0.3s"
              mt={{ base: "3rem", md: "0" }}
            >
              I specialize in these technologies
            </Heading>
            <BigTextSlides
              slides={[
                "NextJs.",
                "Chakra UI.",
                "Typescript.",
                "Strapi CMS.",
                "Figma.",
              ]}
            />
          </VStack>

          <Footer />
        </ChakraProvider>
      </VStack>
    </>
  );
}
