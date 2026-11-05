"use client"

import { Box, Flex, Link, Text } from "@chakra-ui/react"

import { profile } from "@/constants/data"

import { SocialLinks } from "./SocialLinks"

export function SiteFooter() {
  return (
    <Box
      as="footer"
      position="relative"
      zIndex={1}
      bg="void"
      borderTopWidth="1px"
      borderColor="line"
      py={{ base: 8, md: 6 }}
      pl={{ base: 5, lg: 16 }}
      pr={{ base: 5, lg: 12 }}
    >
      <Flex
        maxW="1500px"
        mx="auto"
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 5, md: 4 }}
      >
        <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="mute">
          {profile.mark} · Interface through operations · {new Date().getFullYear()}
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "start", md: "center" }}
          gap={{ base: 3, md: 6 }}
        >
          <Link
            href={`mailto:${profile.email}`}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.08em"
            color="sand"
            _hover={{ color: "sodium", textDecoration: "none" }}
          >
            {profile.email}
          </Link>
          <SocialLinks />
        </Flex>
      </Flex>
    </Box>
  )
}
