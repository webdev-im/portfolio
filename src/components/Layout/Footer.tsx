import { HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack minW="100%" mt={20} justify="center">
      <Text>All rights reserved {new Date().getFullYear()} WebDev I'm </Text>
    </HStack>
  );
};

export default Footer;
