import { FiImage, FiLinkedin, FiMail } from "react-icons/fi";
import {
  Flex,
  HStack,
  Link,
  Tooltip,
  useBreakpointValue
} from "@chakra-ui/react";

import Image from "next/image";
import React from "react";
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
              <FiMail fontSize="22px" className="shaking" />
            </Link>
          </Tooltip>
          <Tooltip label="Linkedin">
            <Link
              href="https://www.linkedin.com/in/webdev-im/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin fontSize="22px" className="shaking" />
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
