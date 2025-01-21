import {
    Box,
    forwardRef,
    useColorMode,
    useTheme,
    Text,
    Icon,
  } from "@chakra-ui/react";
  import { ChevronRightIcon } from "@chakra-ui/icons";
  import { motion } from "framer-motion";
  
  const MultilayerButton = forwardRef(
    ({ buttonText, onClick, ...props }, ref) => {
      const { colorMode } = useColorMode();
      const theme = useTheme();
  
      return (
        <Box
          as="button"
          position="relative"
          display="grid"
          placeItems="center"
        //   fontFamily="monospace"
          fontWeight="bold"
          color="white"
          background="transparent"
          border="none"
          borderRadius="8px"
          cursor="pointer"
          width="200px"
          height="60px"
          ref={ref}
          onClick={onClick}
          {...props}
          _hover={{
            "--active": "1",
          }}
          _focusVisible={{
            "--active": "1",
          }}
          _active={{
            "--active": "0.5",
          }}
          sx={{
            "--bg-color-1":
              theme.colors?.brand?.[100] || "#33468b", // Bottom layer
            "--bg-color-2":
              theme.colors?.brand?.[500] || "#6c87dc", // Middle layer
            "--bg-color-3":
              theme.colors?.brand?.[700] || "#bcc8ef", // Top layer
            "--step": "0.5rem",
            "--active": "0", // Default value
          }}
        >
          {/* Top (Pink) Layer */}
          <Box
            as="span"
            position="absolute"
            inset="0"
            bg="var(--bg-color-3)"
            border="2px solid black"
            display="grid"
            placeItems="center"
            borderRadius="inherit"
            transition="0.2s ease"
            zIndex="3"
            sx={{
              transform: `translate(
                calc((var(--active) * 2) * (var(--step) * -1)),
                calc((var(--active) * 2) * (var(--step) * -1))
              )`,
            }}
          >
            <Text color="black" fontWeight="bold">
              {buttonText || "Click Me"}
            </Text>
            {/* Animated Arrow Icon */}
            <Box
              as={motion.div}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              right="10px" // Adjust position inside the layer
              zIndex="4"
              animate={{
                x: [0, 10, 0], // Moves right and back
              }}
                      transition={{
                        duration: 1,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1,
              
              } as any} 
            >
              <Icon as={ChevronRightIcon} boxSize={6} color="black" />
            </Box>
          </Box>
  
          {/* Middle (Yellow) Layer */}
          <Box
            as="span"
            position="absolute"
            inset="0"
            bg="var(--bg-color-2)"
            border="2px solid black"
            display="grid"
            placeItems="center"
            borderRadius="inherit"
            transition="0.2s ease"
            zIndex="2"
            sx={{
              transform: `translate(
                calc((var(--active) * 1) * (var(--step) * -1)),
                calc((var(--active) * 1) * (var(--step) * -1))
              )`,
            }}
            aria-hidden="true"
          />
  
          {/* Bottom (Blue) Layer */}
          <Box
            as="span"
            position="absolute"
            inset="0"
            bg="var(--bg-color-1)"
            border="2px solid black"
            display="grid"
            placeItems="center"
            borderRadius="inherit"
            transition="0.2s ease"
            zIndex="1"
            sx={{
              transform: `translate(
                calc((var(--active) * 0) * (var(--step) * -1)),
                calc((var(--active) * 0) * (var(--step) * -1))
              )`,
            }}
            aria-hidden="true"
          />
        </Box>
      );
    }
  );
  
  export default MultilayerButton;
  