import { Flex, Tooltip, useColorMode } from "@chakra-ui/react";
import { GiMoonBats, GiSun } from "react-icons/gi";

export const UseChangeTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Tooltip label={colorMode === "dark" ? "Light Mode" : "Dark Mode"}>
        <Flex cursor="pointer" onClick={toggleColorMode}>
          {colorMode === "dark" ? (
            <GiSun
              fontSize="20px"
              color={colorMode === "dark" ? "white" : "black"}
            />
          ) : (
            <GiMoonBats
              fontSize="22px"
              color={colorMode === "light" ? "black" : "white"}
            />
          )}
        </Flex>
      </Tooltip>
    </div>
  );
};
