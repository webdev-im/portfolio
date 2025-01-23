import {
  Box,
  Button,
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
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import MultilayerButton from "./action/StyledButton";

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

  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "gray.800" : "white"}
        color={colorMode === "dark" ? "white" : "gray.800"}
        borderRadius="md"
      >
        <ModalHeader fontSize="4xl">Contact Us</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {emailStatus === "success" && (
            <Text color="green.500" mb={4}>
              Your message was sent successfully. Thank you!
            </Text>
          )}
          {emailStatus === "error" && (
            <Text color="red.500" mb={4}>
              Something went wrong. Please try again later.
            </Text>
          )}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Your Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  id="phone"
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
                      input.value = "+" + input.value.replace(/[^0-9]/g, "");
                    } else {
                      input.value = input.value.replace(/[^+\d]/g, "");
                    }
                  }}
                />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.message}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  {...register("message", {
                    required: "Message is required",
                  })}
                />
                <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <VStack minW="full" spacing={4}>
            <HStack spacing={4}>
              {/* Submit Button */}
              <MultilayerButton
                size="md"
                buttonText="Submit"
                noIcon
                onClick={handleSubmit(onSubmit)} // Properly validate and handle submission
                isDisabled={!isValid || isSubmitting} // Disable until form is valid
              />
              {/* Cancel Button */}
              <MultilayerButton
                size="md"
                buttonText="Cancel"
                noIcon
                onClick={onClose}
                isDisabled={isSubmitting}
                variant="outline"
              />
            </HStack>
            <Divider borderColor="gray.400" my={10} />
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
