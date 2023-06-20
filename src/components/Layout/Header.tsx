import {
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

import Image from "next/image";
import React from "react";
import { UseChangeTheme } from "../../functions/hooks/useChangeTheme";
import { saveAs } from "file-saver";

const handleClick = () => {
  let url = "/portfolio.png";
  saveAs(url, "portfolio");
};

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack
      minW={isMobile ? "full" : "40%"}
      justify="space-between"
      minH="4rem"
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
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src="/portfolio.png"
              alt="portfolio"
              width={800}
              height={800}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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
