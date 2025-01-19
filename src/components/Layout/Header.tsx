import { FiGithub, FiImage, FiLinkedin, FiMail } from "react-icons/fi";
import {
Flex,
HStack,
Link,
Tooltip,
useBreakpointValue,
useColorMode,
useDisclosure,
} from "@chakra-ui/react";

import ContactForm from "./ContactForm";
import Image from "next/image";
import React from "react";
import { UseChangeTheme } from "../../functions/hooks/useChangeTheme";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";

interface HeaderProps {
  page: "home" | "about";
  setPage: (page: "home" | "about") => void;
}


const Header = ({ page, setPage }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

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
        <Tooltip label={page==='home'? '' : 'Home'}>
          <Image
            src="/avatar.png"
            alt="avatar"
            className="shaking"
            height={30}
            width={30}
            style={{ aspectRatio: 1 / 1, borderRadius: "50%" }}
            onClick={() => setPage("home")}
          />
        </Tooltip>
      </HStack>
      <HStack spacing={7} justify="space-between">
        {/* Social Media */}
        <HStack spacing={[3, 3]}>
          <Tooltip label="About">
            <Flex>
              <FiImage
                fontSize="22px"
                className="shaking"
                onClick={() => setPage("about")}
                cursor="pointer"
              />
            </Flex>
          </Tooltip>
          <Tooltip label="Contact" aria-label="Contact Us Tooltip">
            <Link onClick={onContactOpen}>
              <FiMail fontSize="22px" className="shaking" />
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
        {/* Theme Changer */}
        <UseChangeTheme />
      </HStack>
   
      <ContactForm isOpen={isContactOpen} onClose={onContactClose} />
    </HStack>
  );
};

export default Header;
