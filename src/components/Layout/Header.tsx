import { FaBehance, FaImage, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";
import {
  Flex,
  HStack,
  Link,
  Tooltip,
  useBreakpointValue
} from "@chakra-ui/react";

import { FiImage } from "react-icons/fi";
import Image from "next/image";
import { PiBehanceLogo } from "react-icons/pi";
import React from "react";
import { RiLinkedinLine } from "react-icons/ri";
import { SlSocialBehance } from "react-icons/sl";
import { UseChangeTheme } from "../../functions/hooks/useChangeTheme";

interface HeaderProps {
  page: "home" | "about";
  setPage: (page: "home" | "about") => void;
  onContactOpen: () => void; // Use the passed prop for modal control
}

const Header = ({ page, setPage, onContactOpen }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });


  return (
    <HStack
      minW={isMobile ? "full" : "60%"}
      maxW={isMobile ? "full" : "60%"}
      justify="space-between"
      minH="4rem"
      px={{ base: "1rem", md: "0" }}
      zIndex={2}
    >
      <HStack cursor="pointer">
        <Tooltip label={page === "home" ? "" : "Home"}>
          <Image
            src="/avatar.png"
            alt="avatar"
            className="shaking"
            height={50}
            width={50}
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
              <FaRegEnvelope fontSize="22px" className="shaking" />
            </Link>
          </Tooltip>
          <Tooltip label="Linkedin">
            <Link
              href="https://www.linkedin.com/in/webdev-im/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn fontSize="22px" className="shaking" />
            </Link>
          </Tooltip>
          <Tooltip label="Behance">
            <Link
              href="https://www.behance.com/webdev-im/"
              target="_blank"
              rel="noreferrer"
              mt={1}
            >
              <FaBehance fontSize="22px" className="shaking" />
            </Link>
          </Tooltip>
        </HStack>
        {/* Theme Changer */}
        <UseChangeTheme />
      </HStack>
    </HStack>
  );
};

export default Header;
