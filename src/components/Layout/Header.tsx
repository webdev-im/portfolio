import { FaBehance, FaDribbble, FaLinkedinIn } from "react-icons/fa";
import {
  Flex,
  HStack,
  Link,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import React from "react";
import { UseChangeTheme } from "../../functions/hooks/useChangeTheme";

interface HeaderProps {
  page: "home" | "about";
  setPage: (page: "home" | "about") => void;
  onContactOpen: () => void;
}

const Header = ({ page, setPage, onContactOpen }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      minW={isMobile ? "full" : "60%"}
      maxW={isMobile ? "full" : "60%"}
      justify="space-between"
      minH="4rem"
      px={{ base: "1rem", md: "0" }}
      zIndex={2}
    >
      {/* Logo */}
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

      {/* Mobile Menu Button */}
      {isMobile ? (
        <IconButton
          icon={<HamburgerIcon boxSize={7} />} // Increased menu icon size
          aria-label="Open Menu"
          variant="ghost"
          onClick={onOpen}
          boxSize="40px" // Make button larger
        />
      ) : (
        // Desktop Navigation (Centered)
        <Flex flexGrow={1} justify="center" gap={2}>
          <Flex
            cursor="pointer"
            onClick={() => setPage("about")}
            w="90px"
            justify="center"
            align="center"
            _hover={{
              color: colorMode === "light" ? "orange.400" : "blue.300",
              letterSpacing: "3px",

            }}
          >
            <Text
              textAlign="center"
              transition="letter-spacing 0.2s ease-in-out"
            >
              ABOUT
            </Text>
          </Flex>

          <Flex
            cursor="pointer"
            onClick={onContactOpen}
            w="100px"
            justify="center"
            align="center"
            _hover={{
              color: colorMode === "light" ? "orange.400" : "blue.300",
              letterSpacing: "3px",
            }}
          >
            <Text
              textAlign="center"
              transition="letter-spacing 0.2s ease-in-out"

            >
              CONTACT
            </Text>
          </Flex>
        </Flex>
      )}

      {/* Social Media & Theme Toggler (Desktop) */}
      {!isMobile && (
        <HStack spacing={20} mt={0}> {/* Increased spacing */}
          <HStack spacing={4}>   <Tooltip label="Linkedin">
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
              >
                <FaBehance fontSize="25px" className="shaking" />
              </Link>
            </Tooltip>
            <Tooltip label="Dribbble">
              <Link
                href="https://www.dribbble.com/webdevim/"
                target="_blank"
                rel="noreferrer"
              >
                <FaDribbble fontSize="18px" className="shaking" />
              </Link>
            </Tooltip></HStack>

          {/* Theme Toggler */}
          <UseChangeTheme />
        </HStack>
      )}

      {/* Mobile Drawer for Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody display="flex" flexDirection="column" justifyContent="start" mt={20}> {/* Centers menu items */}
            <VStack spacing={3} align="start" >
              {/* About Link */}
              <Flex
                cursor="pointer"
                onClick={() => {
                  setPage("about");
                  onClose();
                }}
                _hover={{
                  color: colorMode === "light" ? "orange.400" : "blue.300",
                }}
              >
                <Text
                  textAlign="center"
                  transition="letter-spacing 0.2s ease-in-out"
                  _hover={{ letterSpacing: "3px" }}
                >
                  ABOUT
                </Text>
              </Flex>

              {/* Contact Link */}
              <Flex
                cursor="pointer"
                onClick={() => {
                  onContactOpen();
                  onClose();
                }}
                _hover={{
                  color: colorMode === "light" ? "orange.400" : "blue.300",
                }}
              >
                <Text
                  textAlign="center"
                  transition="letter-spacing 0.2s ease-in-out"
                  _hover={{ letterSpacing: "3px" }}
                >
                  CONTACT
                </Text>
              </Flex>
            </VStack>

            {/* Add spacing before social media & theme toggler */}
            <HStack spacing={6} align="start" mt={12} justify='space-between'> {/* More spacing */}
              {/* Social Media Links (Mobile) */}
              <HStack spacing={4}>
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
                  >
                    <FaBehance fontSize="25px" className="shaking" />
                  </Link>
                </Tooltip>
                <Tooltip label="Dribbble">
                  <Link
                    href="https://www.dribbble.com/webdevim/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaDribbble fontSize="18px" className="shaking" />
                  </Link>
                </Tooltip>
              </HStack>

              {/* Theme Toggler (Mobile) */}
              <UseChangeTheme />
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
