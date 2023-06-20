"use client";

import {
  Button,
  ChakraProvider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import BigTextSlides from "@/components/Layout/BigTextSlides";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import { NextSeo } from "next-seo";
import React from "react";
import { ThemeProvider } from "next-themes";

export default function Container(props: any) {
  return (
    <>
      <NextSeo
        title="WebDev I'm"
        description="WebDev I'm, UI/UX Designer, Frontend Developer, and a blogger."
      />
      <ThemeProvider enableSystem={false}>
        <ChakraProvider>
          <VStack>
            <Header />

            <main>
              <VStack>
                <Heading fontSize="lg">
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
            </main>
          </VStack>
          <Footer />
        </ChakraProvider>
      </ThemeProvider>
    </>
  );
}
