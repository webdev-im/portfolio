import { Flex, Tooltip, useColorMode } from "@chakra-ui/react";
import { GiMoonBats, GiSun } from "react-icons/gi";

export const UseChangeTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Tooltip label={colorMode === "light" ? "Light Mode" : "Dark Mode"}>
        <Flex cursor="pointer" onClick={toggleColorMode}>
          {colorMode === "light" ? (
            <GiSun
              fontSize="20px"
              color={colorMode === "light" ? "black" : "white"}
            />
          ) : (
            <GiMoonBats
              fontSize="22px"
              color={colorMode === "dark" ? "white" : "black"}
            />
          )}
        </Flex>
      </Tooltip>
    </div>
  );
};
