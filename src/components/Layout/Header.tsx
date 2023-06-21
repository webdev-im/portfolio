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
import { FiGithub, FiGlobe, FiLinkedin } from "react-icons/fi";

import Image from "next/image";
import React from "react";
import { UseChangeTheme } from "../../functions/hooks/useChangeTheme";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";

const handleClick = () => {
  let url = "/portfolio.png";
  saveAs(url, "portfolio");
};

interface HeaderProps {
  onClick?: () => void;
}

const Header = ({ onClick }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <HStack
      minW={isMobile ? "full" : "40%"}
      justify="space-between"
      minH="4rem"
      px={{ base: "1rem", md: "0" }}
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
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>
      <HStack spacing={7} justify="space-between">
        {/* ssocial media */}
        <HStack>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "rgb(40, 40, 40) " : "rgb(70, 70, 70)"}
          color={colorMode === "light" ? "black" : "white"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={5}>
            <motion.div animate={{ y: 5 }} transition={{ delay: 1 }}>
              <Image
                src="/portfolio.png"
                alt="portfolio"
                width={800}
                height={800}
              />
            </motion.div>
          </ModalBody>

          <ModalFooter mr={"-10px"}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                {
                  handleClick(), onClose;
                }
              }}
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default Header;
