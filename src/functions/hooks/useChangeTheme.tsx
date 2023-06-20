import { Flex, Tooltip } from "@chakra-ui/react";
import { GiMoonBats, GiSun } from "react-icons/gi";

import { useTheme } from "next-themes";

export const UseChangeTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Tooltip label={theme === "dark" ? "Light Mode" : "Dark Mode"}>
        <Flex
          cursor="pointer"
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme === "dark" ? (
            <GiSun
              fontSize="20px"
              style={{ color: theme === "dark" ? "white" : "black" }}
            />
          ) : (
            <GiMoonBats
              fontSize="22px"
              style={{ color: theme === "dark" ? "white" : "black" }}
            />
          )}
        </Flex>
      </Tooltip>
    </div>
  );
};
