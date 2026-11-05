"use client"

import { Box, Button, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"

import { socials, works, type WorkItem, type WorkKind } from "@/constants/data"

type Filter = "all" | WorkKind

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Live" },
  { id: "study", label: "Studies" },
]

function hostOf(href: string) {
  try {
    return new URL(href).host.replace(/^www\./, "")
  } catch {
    return href
  }
}

function Brackets() {
  const arm = {
    position: "absolute" as const,
    w: "16px",
    h: "16px",
    borderColor: "sand",
    borderStyle: "solid",
    borderWidth: "0",
    pointerEvents: "none" as const,
  }

  return (
    <>
      <Box {...arm} top="3" left="3" borderTopWidth="1px" borderLeftWidth="1px" />
      <Box {...arm} top="3" right="3" borderTopWidth="1px" borderRightWidth="1px" />
      <Box {...arm} bottom="3" left="3" borderBottomWidth="1px" borderLeftWidth="1px" />
      <Box {...arm} bottom="3" right="3" borderBottomWidth="1px" borderRightWidth="1px" />
    </>
  )
}

function countFor(filter: Filter) {
  if (filter === "all") return works.length
  return works.filter((item) => item.kind === filter).length
}

export function Archive() {
  const [filter, setFilter] = useState<Filter>("all")
  const [active, setActive] = useState(works[0].code)

  const visible = works.filter((item) => filter === "all" || item.kind === filter)
  const current = visible.find((item) => item.code === active) ?? visible[0]

  const applyFilter = (next: Filter) => {
    setFilter(next)
    const nextVisible = works.filter((item) => next === "all" || item.kind === next)
    setActive((code) =>
      nextVisible.some((item) => item.code === code) ? code : nextVisible[0].code,
    )
  }

  return (
    <Box
      as="section"
      id="work"
      position="relative"
      zIndex={1}
      borderTopWidth="1px"
      borderColor="line"
      py={{ base: 16, lg: 24 }}
      pl={{ base: 5, lg: 16 }}
      pr={{ base: 5, lg: 12 }}
    >
      <Box maxW="1500px" mx="auto">
        <Flex
          justify="space-between"
          align={{ base: "start", md: "end" }}
          direction={{ base: "column", md: "row" }}
          gap="6"
          mb={{ base: 8, lg: 12 }}
        >
          <Stack gap="4" maxW="40rem">
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color="sand"
            >
              03 — Archive
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "4rem", md: "6.5rem" }}
              lineHeight="0.84"
              letterSpacing="-0.04em"
              textTransform="uppercase"
              fontWeight="700"
            >
              On record.
            </Heading>
            <Text fontWeight="300" color="bone">
              Shipped products, each one open on its own address.
            </Text>
          </Stack>
          <Flex
            gap="4"
            role="group"
            aria-label="Filter the archive"
            display={new Set(works.map((item) => item.kind)).size > 1 ? "flex" : "none"}
          >
            {filters.map((item) => {
              const selected = filter === item.id
              return (
                <Button
                  key={item.id}
                  unstyled
                  type="button"
                  onClick={() => applyFilter(item.id)}
                  aria-pressed={selected}
                  bg="transparent"
                  borderWidth="0"
                  borderBottomWidth="1px"
                  borderRadius="0"
                  borderColor={selected ? "sodium" : "transparent"}
                  color={selected ? "sodium" : "mute"}
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  h="auto"
                  minW="0"
                  pb="1"
                  px="0"
                  cursor="pointer"
                  _hover={{ color: "bone" }}
                >
                  {item.label} {String(countFor(item.id)).padStart(2, "0")}
                </Button>
              )
            })}
          </Flex>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="start"
        >
          <Stack as="div" order={{ base: 2, lg: 1 }} gap="0">
            {visible.map((item) => (
              <RecordButton
                key={item.code}
                item={item}
                selected={item.code === current.code}
                onSelect={() => setActive(item.code)}
              />
            ))}
          </Stack>

          <Plate item={current} />
        </Grid>
      </Box>
    </Box>
  )
}

function RecordButton({
  item,
  selected,
  onSelect,
}: {
  item: WorkItem
  selected: boolean
  onSelect: () => void
}) {
  return (
    <Flex
      asChild
      w="100%"
      align="baseline"
      justify="space-between"
      gap="4"
      py="4"
      bg="transparent"
      borderWidth="0"
      borderBottomWidth="1px"
      borderColor="line"
      borderRadius="0"
      textAlign="left"
      cursor="pointer"
      color={selected ? "sodium" : "mute"}
      _hover={{ color: "bone" }}
    >
      <button type="button" onClick={onSelect} aria-pressed={selected}>
      <Flex align="baseline" gap="4" minW="0">
        <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" flex="none">
          {item.code}
        </Text>
        <Text
          fontFamily="heading"
          fontWeight="700"
          fontSize={{ base: "2xl", md: "3xl" }}
          lineHeight="0.9"
          letterSpacing="-0.03em"
          textTransform="uppercase"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {item.title}
        </Text>
      </Flex>
      <Text
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="0.14em"
        textTransform="uppercase"
        flex="none"
      >
        {item.kind === "product" ? "Live" : "Study"}
      </Text>
      </button>
    </Flex>
  )
}

function Plate({ item }: { item: WorkItem }) {
  const outbound = [
    ...(item.href ? [{ label: "Live site", href: item.href }] : []),
    ...(item.links ?? []),
  ]

  return (
    <Box
      order={{ base: 1, lg: 2 }}
      position={{ lg: "sticky" }}
      top="6"
      borderWidth="1px"
      borderColor="line"
      bg="panel"
      p={{ base: 4, md: 6 }}
      boxShadow="0 30px 80px rgba(0, 0, 0, 0.45)"
    >
      <Box key={item.code} className="screen-in" position="relative">
        <Brackets />
        <Box position="relative" aspectRatio="16 / 10" overflow="hidden" mb="5">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.imageAlt ?? item.title}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Flex align="center" justify="center" h="100%">
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize={{ base: "6rem", md: "8rem" }}
                lineHeight="0.8"
                letterSpacing="-0.04em"
                color="transparent"
                style={{ WebkitTextStroke: "1px rgba(228, 220, 203, 0.45)" }}
              >
                {item.code}
              </Text>
            </Flex>
          )}
        </Box>

        <Flex justify="space-between" align="baseline" gap="4" mb="3">
          <Heading
            as="h3"
            flex="1"
            minW="0"
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="0.88"
            letterSpacing="-0.03em"
            textTransform="uppercase"
            fontWeight="700"
          >
            {item.title}
          </Heading>
          <Text fontFamily="mono" fontSize="xs" letterSpacing="0.16em" color="sand">
            {item.kind === "product" ? "Product" : "Study"}
          </Text>
        </Flex>

        <Text fontWeight="300" color="bone" mb="4">
          {item.summary}
        </Text>

        {item.href ? (
          <Text fontFamily="mono" fontSize="xs" letterSpacing="0.08em" color="mute" mb="4">
            {hostOf(item.href)}
          </Text>
        ) : null}

        {outbound.length > 0 ? (
          <Flex
            as="ul"
            gap="4"
            wrap="wrap"
            justify="flex-end"
            listStyleType="none"
            position="relative"
            zIndex={1}
            m="0"
            pt="1"
            pr="12"
            pl="8"
            pb="1"
          >
            {outbound.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  color="sand"
                  borderBottomWidth="1px"
                  borderColor="sodium"
                  _hover={{ color: "sodium", textDecoration: "none" }}
                >
                  {link.label} ↗
                </Link>
              </li>
            ))}
          </Flex>
        ) : (
          <Flex as="ul" gap="4" wrap="wrap" listStyleType="none" p="0" m="0">
            {socials
              .filter((item) => item.label !== "LinkedIn")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                    color="sand"
                    borderBottomWidth="1px"
                    borderColor="sodium"
                    _hover={{ color: "sodium", textDecoration: "none" }}
                  >
                    {item.label} ↗
                  </Link>
                </li>
              ))}
          </Flex>
        )}
      </Box>
    </Box>
  )
}
