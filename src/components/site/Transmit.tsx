"use client"

import { Box, Field, Flex, Grid, Heading, Input, Link, Stack, Text, Textarea } from "@chakra-ui/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import emailjs from "emailjs-com"

import { profile } from "@/constants/data"

import { SignalButton } from "./SignalButton"

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

const fieldLabel = {
  fontFamily: "mono",
  fontSize: "xs",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "sand",
} as const

const control = {
  variant: "flushed" as const,
  borderColor: "line",
  borderRadius: "0",
  px: "0",
  color: "bone",
  _placeholder: { color: "mute" },
  _focus: { borderColor: "sodium", boxShadow: "none" },
  _focusVisible: { borderColor: "sodium", boxShadow: "none", outline: "none" },
}

export function Transmit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ mode: "onTouched" })

  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null)

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setNotice(null)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setNotice({
        tone: "error",
        text: `Contact is not configured in this environment. Email ${profile.email} and it will still reach me.`,
      })
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
        publicKey,
      )
      reset()
      setNotice({
        tone: "ok",
        text: "Message received. I will reply to the address you sent.",
      })
    } catch {
      setNotice({
        tone: "error",
        text: `The message did not send. Email ${profile.email} and it will still reach me.`,
      })
    }
  }

  return (
    <Box
      as="section"
      id="contact"
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
        top="0"
        right={{ base: "-1rem", lg: "4vw" }}
        fontFamily="heading"
        fontWeight="700"
        fontSize={{ base: "8rem", lg: "18rem" }}
        lineHeight="0.8"
      >
        04
      </Box>

      <Grid
        position="relative"
        maxW="1500px"
        mx="auto"
        templateColumns={{ base: "1fr", lg: "0.8fr 1.1fr" }}
        gap={{ base: 10, lg: 20 }}
      >
        <Stack gap="5">
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.22em"
            textTransform="uppercase"
            color="sand"
          >
            04 — Contact
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: "4rem", md: "6.5rem" }}
            lineHeight="0.84"
            letterSpacing="-0.04em"
            textTransform="uppercase"
            fontWeight="700"
          >
            Tell me what
            <Box as="span" display="block">
              you are building.
            </Box>
          </Heading>
          <Text maxW="36rem" fontWeight="300" fontSize="lg">
            A product, a content system, an AI workflow, a domain that still
            needs a mailbox. Send the shape of it.
          </Text>
          <Link
            href={`mailto:${profile.email}`}
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="0.06em"
            color="sand"
            borderBottomWidth="1px"
            borderColor="sodium"
            width="fit-content"
            _hover={{ color: "sodium", textDecoration: "none" }}
          >
            {profile.email}
          </Link>
        </Stack>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="6">
            <Field.Root invalid={!!errors.name} required>
              <Field.Label {...fieldLabel}>
                Name <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...control}
                autoComplete="name"
                placeholder="Your name"
                {...register("name", { required: "Name is required." })}
              />
              <Field.ErrorText color="alert">{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.email} required>
              <Field.Label {...fieldLabel}>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...control}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@company.com"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address.",
                  },
                })}
              />
              <Field.ErrorText color="alert">{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.phone}>
              <Field.Label {...fieldLabel}>Phone</Field.Label>
              <Input
                {...control}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Optional"
                {...register("phone", {
                  validate: (value) =>
                    !value ||
                    /^[+\d\s()-]{6,}$/.test(value) ||
                    "That phone number does not look valid.",
                })}
              />
              <Field.ErrorText color="alert">{errors.phone?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.message} required>
              <Field.Label {...fieldLabel}>
                Message <Field.RequiredIndicator />
              </Field.Label>
              <Textarea
                {...control}
                rows={6}
                placeholder="What needs to be designed, built, or brought online."
                {...register("message", {
                  required: "A message is required.",
                  maxLength: { value: 5000, message: "Keep it under 5000 characters." },
                })}
              />
              <Field.ErrorText color="alert">{errors.message?.message}</Field.ErrorText>
            </Field.Root>

            {notice ? (
              <Text
                role="status"
                aria-live="polite"
                borderLeftWidth="2px"
                borderColor={notice.tone === "ok" ? "sodium" : "alert"}
                pl="3"
                py="1"
                fontWeight="300"
              >
                {notice.text}
              </Text>
            ) : null}

            <Flex>
              <SignalButton type="submit" loading={isSubmitting} disabled={isSubmitting}>
                Send message
              </SignalButton>
            </Flex>
          </Stack>
        </form>
      </Grid>
    </Box>
  )
}
