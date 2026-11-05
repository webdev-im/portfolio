"use client"

import { HStack, Link } from "@chakra-ui/react"

import { socials } from "@/constants/data"

export function SocialLinks() {
  return (
    <HStack as="ul" gap="4" listStyleType="none" m="0" p="0" flexWrap="wrap">
      {socials.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="mute"
            whiteSpace="nowrap"
            _hover={{ color: "sodium", textDecoration: "none" }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </HStack>
  )
}
