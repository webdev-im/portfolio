import { Flex, Tooltip, useColorMode } from "@chakra-ui/react";
import { GiMoonBats, GiSun } from "react-icons/gi";

import { motion } from "framer-motion";

export const UseChangeTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>

      <Flex
        as={motion.div}
        cursor="pointer"
        onClick={toggleColorMode}
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }} // Shrink effect on click
      >
        {colorMode === "light" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            whileHover={{ color: "#eb8c34" }} // Gold color on hover
            transition={{ duration: 0.5 }}
            style={{ color: "black" }}
          >
            <GiSun fontSize="20px" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            whileHover={{ color: "#4A90E2" }} // Blue color on hover
            transition={{ duration: 0.5 }}
            style={{ color: "white" }}
          >
            <GiMoonBats fontSize="22px" />
          </motion.div>
        )}
      </Flex>

    </div>
  );
};
