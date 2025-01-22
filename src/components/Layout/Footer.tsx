import { HStack, Text, useTheme } from "@chakra-ui/react";

import { GiSelfLove } from "react-icons/gi";

const Footer = () => {
  const theme = useTheme()
  return (
    <HStack
      minW="100%"
      justify="center"
      pb={4}
      fontSize={{ base: "xs", md: "sm" }}
    >
      <HStack spacing={2}>
        <Text>Made with </Text>
        <Text>
          <GiSelfLove color={theme.colors?.brand?.[500] || "#6c87dc"} />
        </Text>
        <Text>by WebDev I'm</Text>
        <Text>{new Date().getFullYear()}</Text>
      </HStack>
    </HStack>
  );
};

export default Footer;
