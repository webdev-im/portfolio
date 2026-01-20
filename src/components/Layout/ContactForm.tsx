"use client";

import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import MultilayerButton from "./action/StyledButton";
import emailjs from "emailjs-com";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ContactFormData>({ mode: "onChange" });

  const { colorMode } = useColorMode();
  const toast = useToast();
  const [emailStatus, setEmailStatus] = useState<"success" | "error" | null>(
    null
  );

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast({
        title: "Message sent!",
        description: "Your message was sent successfully. Thank you!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      reset();
      onClose();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    setEmailStatus(null);
    onClose();
  };

  // Glass input style
  const inputStyle = {
    bg:
      colorMode === "dark"
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.6)",
    border: "1px solid",
    borderColor:
      colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200",
    backdropFilter: "blur(10px)",
    _focus: {
      borderColor: "brandPrimary.500",
      boxShadow: "0 0 0 1px var(--chakra-colors-brandPrimary-500)",
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />

      <ModalContent
        borderRadius="40px"
        p="2rem"
        maxW={["90%", "600px", "700px"]} // ← wider modal
        bg={
          colorMode === "dark"
            ? "rgba(20,20,25,0.55)"
            : "rgba(255,255,255,0.45)"
        }
        backdropFilter="blur(25px)"

        border="1px solid"
        borderColor={
          colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200"
        }
        boxShadow={
          colorMode === "dark"
            ? "0 20px 60px rgba(0,0,0,0.6)"
            : "0 20px 60px rgba(65,91,178,0.15)"
        }
      >
        <ModalHeader
          fontSize="3xl"
          fontWeight="900"
          letterSpacing="-0.03em"
          textAlign="center"
          color={colorMode === "dark" ? "white" : "gray.900"}
        >
          Contact Us
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={5}>
              {/* NAME */}
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                  {...inputStyle}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              {/* EMAIL */}
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  {...inputStyle}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              {/* PHONE */}
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  placeholder="Your Phone Number (e.g., +1234567890)"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?\d+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (!input.value.startsWith("+")) {
                      input.value =
                        "+" + input.value.replace(/[^0-9]/g, "");
                    } else {
                      input.value = input.value.replace(/[^+\d]/g, "");
                    }
                  }}
                  {...inputStyle}
                />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              {/* MESSAGE */}
              <FormControl isInvalid={!!errors.message}>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Your Message"
                  {...register("message", {
                    required: "Message is required",
                  })}
                  {...inputStyle}
                />
                <FormErrorMessage>
                  {errors.message?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </form>
        </ModalBody>

        {/* FOOTER */}
        <ModalFooter
          mt="2rem"
          borderTop="1px solid"
          borderColor={
            colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200"
          }
          pt="2rem"
        >
          <VStack minW="full" spacing={4}>
            <HStack spacing={4}>
              <MultilayerButton
                size="md"
                buttonText="Submit"
                noIcon
                onClick={handleSubmit(onSubmit)}
                isDisabled={!isValid || isSubmitting}
              />

              <MultilayerButton
                size="md"
                buttonText="Cancel"
                noIcon
                onClick={onClose}
                isDisabled={isSubmitting}
                variant="outline"
              />
            </HStack>

            <Divider borderColor="gray.400" />

            <HStack spacing={2} fontWeight={200}>
              <Text>Send us an email:</Text>
              <Link
                href="mailto:wedev.im@gmail.com"
                color="#415bb2"
                fontWeight="bold"
              >
                wedev.im@gmail.com
              </Link>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContactForm;
