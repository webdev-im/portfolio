import { HStack, Text } from "@chakra-ui/react";

import { GiSelfLove } from "react-icons/gi";

const Footer = () => {
  return (
    <HStack minW="100%" mt={20} justify="center">
      <HStack spacing={2}>
        <Text>Made with </Text>
        <Text>
          <GiSelfLove color="#415bb2" />
        </Text>
        <Text>by WebDev I'm</Text>
        <Text>{new Date().getFullYear()}</Text>
      </HStack>
    </HStack>
  );
};

export default Footer;
