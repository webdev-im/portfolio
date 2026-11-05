"use client"

import { useEffect, useRef, useState } from "react"
import { Box, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/react"

import { slate } from "@/constants/data"

import { SignalButton } from "./SignalButton"

const poster = {
  fontFamily: "heading",
  fontWeight: "700",
  fontSize: "clamp(3.4rem, 8.6vw, 8.75rem)",
  lineHeight: "0.8",
  letterSpacing: "-0.045em",
  textTransform: "uppercase",
  textAlign: "center",
} as const

const corners = [
  { top: "-1px", left: "-1px", borderTopWidth: "1px", borderLeftWidth: "1px" },
  { top: "-1px", right: "-1px", borderTopWidth: "1px", borderRightWidth: "1px" },
  { bottom: "-1px", left: "-1px", borderBottomWidth: "1px", borderLeftWidth: "1px" },
  { bottom: "-1px", right: "-1px", borderBottomWidth: "1px", borderRightWidth: "1px" },
] as const

function Readout() {
  return (
    <Box
      position="relative"
      w="full"
      maxW="640px"
      mx="auto"
      borderWidth="1px"
      borderColor="line"
      bg="#101218"
      px="5"
    >
      {corners.map((mark, index) => (
        <Box
          key={index}
          aria-hidden
          position="absolute"
          w="10px"
          h="10px"
          borderColor="teal"
          pointerEvents="none"
          {...mark}
        />
      ))}
      {slate.map((row) => (
        <Flex
          key={row.label}
          justify="space-between"
          align="baseline"
          gap="6"
          py="2.5"
          borderBottomWidth="1px"
          borderColor="line"
          _last={{ borderBottomWidth: "0" }}
        >
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="teal"
            flex="none"
          >
            {row.label}
          </Text>
          {row.label === "Status" ? (
            <Flex align="center" gap="2" justify="flex-end" minW="0" flex="1">
              <Box className="live-pip" aria-hidden />
              <Text fontWeight="300" textAlign="right">
                {row.value}
              </Text>
            </Flex>
          ) : (
            <Text fontWeight="300" textAlign="right" minW="0" flex="1">
              {row.value}
            </Text>
          )}
        </Flex>
      ))}
    </Box>
  )
}

export function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const [cue, setCue] = useState(true)
  const [cueHref, setCueHref] = useState("#architecture")

  useEffect(() => {
    const node = stage.current
    if (!node) return
    const query = window.matchMedia("(max-width: 1023px)")
    const update = () => {
      setCue(node.getBoundingClientRect().bottom > window.innerHeight * 0.4)
      setCueHref(query.matches ? "#record" : "#architecture")
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    query.addEventListener("change", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      query.removeEventListener("change", update)
    }
  }, [])

  return (
    <Box as="section" id="top" position="relative" zIndex={1}>
      <Box aria-hidden className="ruler ruler--left" />
      <Box aria-hidden className="ruler ruler--right" />

      <Flex
        ref={stage}
        direction="column"
        minH="calc(100svh - 4rem)"
        pl={{ base: 5, lg: 16 }}
        pr={{ base: 5, lg: 10 }}
      >
      <Flex flex="1" align="center" justify="center" py={{ base: 6, md: 4 }}>
        <Grid
          w="full"
          maxW="1180px"
          alignItems="center"
          templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(280px, 400px)" }}
          gap={{ base: 5, lg: 12 }}
        >
        <Stack align="center" gap={{ base: 5, lg: 6 }} w="full">
          <Flex align="center" gap="3">
            <Box aria-hidden w="1px" h="3.5" bg="sodium" />
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color="sand"
            >
              01 — Practice
            </Text>
            <Box aria-hidden w="1px" h="3.5" bg="sodium" />
          </Flex>

          <Heading as="h1" {...poster} color="bone" aria-label="Webdev I'm">
            <Box
              as="span"
              display="block"
              textShadow="-2px 0 rgba(255, 106, 26, 0.72), 2px 0 rgba(125, 255, 240, 0.4)"
            >
              Webdev
            </Box>
            <Box
              as="span"
              display="block"
              color="transparent"
              style={{ WebkitTextStroke: "1px rgba(228, 220, 203, 0.84)" }}
            >
              I
              <Box as="span" color="sodium" style={{ WebkitTextStroke: "0px" }}>
                &apos;
              </Box>
              m
            </Box>
          </Heading>

          <Text
            maxW="34rem"
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="300"
            color="bone"
          >
            Multi-layer products, from the interface to the domain. I design the
            surface and architect what sits under it.
          </Text>

          <Flex gap="3" wrap="wrap" justify="center">
            <SignalButton href="#work">View the work</SignalButton>
            <SignalButton href="#contact" ghost>
              Start a project
            </SignalButton>
          </Flex>

        </Stack>
        <Box display={{ base: "none", lg: "block" }} minW="0">
          <Readout />
        </Box>
        </Grid>
      </Flex>

      <Link
        href={cueHref}
        aria-label="Scroll for more"
        className="scroll-cue"
        data-hidden={cue ? undefined : "true"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="2"
        fontFamily="mono"
        fontSize="10px"
        letterSpacing="0.28em"
        textTransform="uppercase"
        color="sand"
        _hover={{ color: "teal", textDecoration: "none" }}
      >
        Scroll
        <Box className="descent" aria-hidden />
      </Link>
      </Flex>

      <Flex
        id="record"
        display={{ base: "flex", lg: "none" }}
        justify="center"
        pl="5"
        pr="5"
        pt="8"
        pb="16"
      >
        <Readout />
      </Flex>
    </Box>
  )
}
