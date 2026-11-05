"use client"

import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react"

import { layers, signalPath } from "@/constants/data"

export function Architecture() {
  return (
    <Box
      as="section"
      id="architecture"
      position="relative"
      zIndex={1}
      overflow="hidden"
      borderTopWidth="1px"
      borderColor="line"
      py={{ base: 16, lg: 24 }}
      pl={{ base: 5, lg: 16 }}
      pr={{ base: 5, lg: 12 }}
    >
      <Box
        aria-hidden
        className="watermark"
        position="absolute"
        top={{ base: "1rem", lg: "0" }}
        right={{ base: "-1rem", lg: "2vw" }}
        fontFamily="heading"
        fontWeight="700"
        fontSize={{ base: "9rem", lg: "22rem" }}
        lineHeight="0.8"
        letterSpacing="-0.05em"
      >
        02
      </Box>

      <Grid
        position="relative"
        maxW="1500px"
        mx="auto"
        templateColumns={{ base: "1fr", lg: "0.78fr 1.22fr" }}
        gap={{ base: 12, lg: 16 }}
        alignItems="start"
      >
        <Stack gap="6" position={{ lg: "sticky" }} top="6">
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.22em"
            textTransform="uppercase"
            color="sand"
          >
            02 — Architecture
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontWeight="700"
            fontSize={{ base: "4rem", md: "6.5rem" }}
            lineHeight="0.84"
            letterSpacing="-0.04em"
            textTransform="uppercase"
          >
            Five layers.
            <Box as="span" display="block" color="transparent" style={{ WebkitTextStroke: "1px rgba(228, 220, 203, 0.8)" }}>
              One build.
            </Box>
          </Heading>
          <Text maxW="36rem" fontWeight="300" color="bone" fontSize="lg">
            A project is a section cut, not a screen. I stay on it from the
            component to the DNS record, and I add an intelligence layer where
            the workflow needs judgment at scale.
          </Text>
        </Stack>

        <Box position="relative" pl="5">
          <Box className="system-rail" aria-hidden />
          <Stack gap="3">
            {layers.map((layer, index) => (
              <Box
                key={layer.index}
                className="layer-plate"
                ml={{ base: 0, lg: `${index * 1.15}rem` }}
                borderWidth="1px"
                borderColor="line"
                bg="panel"
                px={{ base: 4, md: 6 }}
                py={{ base: 5, md: 6 }}
              >
                <Flex justify="space-between" align="end" gap="4" mb="3">
                  <Heading
                    as="h3"
                    fontSize={{ base: "2xl", md: "4xl" }}
                    lineHeight="0.9"
                    letterSpacing="-0.03em"
                    textTransform="uppercase"
                    fontWeight="700"
                  >
                    {layer.name}
                  </Heading>
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.18em"
                    color="sand"
                  >
                    {layer.index}
                  </Text>
                </Flex>
                <Text fontWeight="300" color="bone" maxW="68ch" mb="4">
                  {layer.summary}
                </Text>
                <Flex gap="2" wrap="wrap">
                  {layer.tools.map((tool) => (
                    <Text
                      key={tool}
                      as="span"
                      fontFamily="mono"
                      fontSize="xs"
                      letterSpacing="0.12em"
                      textTransform="uppercase"
                      color="sand"
                      borderWidth="1px"
                      borderColor="line"
                      px="2"
                      py="1"
                    >
                      {tool}
                    </Text>
                  ))}
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
      </Grid>

      <Flex
        as="ol"
        maxW="1500px"
        mx="auto"
        mt={{ base: 12, lg: 16 }}
        wrap="wrap"
        gap="2"
        align="center"
        listStyleType="none"
        p="0"
      >
        {signalPath.map((step, index) => (
          <Flex as="li" key={step} align="center" gap="2">
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="sand"
            >
              {step}
            </Text>
            {index < signalPath.length - 1 ? (
              <Text as="span" color="sodium" aria-hidden>
                →
              </Text>
            ) : null}
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}
