"use client"

import { Box, Button, Dialog, Flex, Link, Stack, Text } from "@chakra-ui/react"

import { profile } from "@/constants/data"

import { SocialLinks } from "./SocialLinks"

const links = [
  { href: "#work", label: "Work" },
  { href: "#architecture", label: "Architecture" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <Flex
      as="header"
      position="relative"
      zIndex={40}
      flex="none"
      h="16"
      pl={{ base: 5, lg: 12 }}
      pr={{ base: 4, lg: 8 }}
      align="center"
      justify="space-between"
      bg="transparent"
    >
      <Link
        href="#top"
        fontFamily="heading"
        fontWeight="700"
        fontSize="xl"
        letterSpacing="0.08em"
        color="bone"
        _hover={{ color: "sodium", textDecoration: "none" }}
      >
        {profile.mark}
      </Link>

      <Flex as="nav" aria-label="Primary" display={{ base: "none", lg: "flex" }} gap="7">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="mute"
            _hover={{ color: "bone", textDecoration: "none" }}
          >
            {link.label}
          </Link>
        ))}
      </Flex>

      <Box display={{ base: "none", lg: "block" }}>
        <SocialLinks />
      </Box>

      <Dialog.Root size="full" motionPreset="none">
        <Dialog.Trigger asChild>
          <Button
            display={{ base: "inline-flex", lg: "none" }}
            borderRadius="0"
            variant="outline"
            borderColor="bone"
            color="bone"
            bg="transparent"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.16em"
            textTransform="uppercase"
            h="10"
            px="4"
            _hover={{ borderColor: "sodium", color: "sodium", bg: "transparent" }}
          >
            Menu
          </Button>
        </Dialog.Trigger>
        <Dialog.Backdrop bg="blackAlpha.700" />
        <Dialog.Positioner>
          <Dialog.Content bg="void" color="bone" borderRadius="0" boxShadow="none">
            <Dialog.CloseTrigger
              position="absolute"
              top="5"
              right="5"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="bone"
            >
              Close
            </Dialog.CloseTrigger>
            <Dialog.Body
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              gap="10"
              minH="100dvh"
              px={{ base: 6, md: 12 }}
              pb="12"
              pt="24"
            >
              <Stack as="nav" aria-label="Mobile" gap="1">
                {links.map((link) => (
                  <Dialog.ActionTrigger asChild key={link.href}>
                    <Link
                      href={link.href}
                      fontFamily="heading"
                      fontWeight="700"
                      fontSize="clamp(3.4rem, 16vw, 7rem)"
                      lineHeight="0.84"
                      letterSpacing="-0.03em"
                      textTransform="uppercase"
                      color="bone"
                      width="fit-content"
                      _hover={{ color: "sodium", textDecoration: "none" }}
                    >
                      {link.label}
                    </Link>
                  </Dialog.ActionTrigger>
                ))}
              </Stack>
              <SocialLinks />
              <Text fontFamily="mono" fontSize="xs" letterSpacing="0.16em" color="sand">
                A001 — {profile.mark}
              </Text>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Flex>
  )
}
