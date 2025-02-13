import { Flex, useColorMode, useBreakpointValue } from "@chakra-ui/react";
import { GiMoonBats, GiSun } from "react-icons/gi";
import { motion } from "framer-motion";

export const UseChangeTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const defaultColor = colorMode === "light" ? "black" : "white";
  const hoverColor = colorMode === "light" ? "#eb8c34" : "#4A90E2";

  return (
    <div>
      <Flex
        as={motion.div}
        cursor="pointer"
        onClick={toggleColorMode}
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        color={isMobile ? hoverColor : defaultColor} // Always active on mobile
        _hover={!isMobile ? { color: hoverColor } : undefined} // Apply hover effect only on desktop
      >
        {colorMode === "light" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            whileHover={!isMobile ? { color: hoverColor } : undefined} // Hover effect only for desktop
            transition={{ duration: 0.5 }}
          >
            <GiSun fontSize="20px" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            whileHover={!isMobile ? { color: hoverColor } : undefined} // Hover effect only for desktop
            transition={{ duration: 0.5 }}
          >
            <GiMoonBats fontSize="22px" />
          </motion.div>
        )}
      </Flex>
    </div>
  );
};
