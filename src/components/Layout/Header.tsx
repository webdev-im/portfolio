import {
  Button,
  Flex,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { FiGithub, FiGlobe, FiLinkedin, FiMail } from "react-icons/fi";

import ContactForm from "./ContactForm";
import Image from "next/image";
import React from "react";
import { UseChangeTheme } from "../../functions/hooks/useChangeTheme";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";

const handleClick = () => {
  let url = "/resume.png";
  saveAs(url, "resume");
};

interface HeaderProps {
  onClick?: () => void;
}

const Header = ({ onClick }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    isOpen: isResumeOpen,
    onOpen: onResumeOpen,
    onClose: onResumeClose,
  } = useDisclosure();

  const {
    isOpen: isContactOpen,
    onOpen: onContactOpen,
    onClose: onContactClose,
  } = useDisclosure();

  const { colorMode } = useColorMode();

  return (
    <HStack
      minW={isMobile ? "full" : "40%"}
      maxW={isMobile ? "full" : "40%"}
      justify="space-between"
      minH="4rem"
      px={{ base: "1rem", md: "0" }}
      zIndex={2}
    >
      <HStack cursor="pointer">
        <Tooltip label="About me">
          <Image
            src="/avatar.png"
            alt="avatar"
            className="shaking"
            height={30}
            width={30}
            style={{ aspectRatio: 1 / 1, borderRadius: "50%" }}
            onClick={onResumeOpen}
          />
        </Tooltip>
      </HStack>
      <HStack spacing={7} justify="space-between">
        {/* ssocial media */}
        <HStack spacing={[3, 3]}>
          <Tooltip label="Examples">
            <Flex>
              <FiGlobe
                fontSize="22px"
                className="shaking"
                onClick={onClick}
                cursor="pointer"
              />
            </Flex>
          </Tooltip>

          <Tooltip label="Contact" aria-label="Contact Us Tooltip">
            <Link onClick={onContactOpen}>
              <FiMail size={20} />
            </Link>
          </Tooltip>

          <Tooltip label="Github">
            <Link
              href="https://github.com/webdev-im/"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
            >
              <FiGithub fontSize="22px" className="shaking" />
            </Link>
          </Tooltip>
          <Tooltip label="Linkedin">
            <Link
              href="https://www.linkedin.com/in/webdev-im/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin fontSize="22px" className="shaking" />
            </Link>
          </Tooltip>
        </HStack>
        {/* theme changer  */}
        <UseChangeTheme />
      </HStack>
      <Modal isOpen={isResumeOpen} onClose={onResumeClose}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "rgb(40, 40, 40) " : "rgb(70, 70, 70)"}
          color={colorMode === "light" ? "black" : "white"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={5}>
            <motion.div animate={{ y: 5 }} transition={{ delay: 1 }}>
              <Image src="/resume.png" alt="resume" width={800} height={800} />
            </motion.div>
          </ModalBody>

          <ModalFooter mr={"-10px"}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onResumeClose}
              variant="outline"
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                {
                  handleClick(), onResumeClose;
                }
              }}
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ContactForm isOpen={isContactOpen} onClose={onContactClose} />
    </HStack>
  );
};

export default Header;
