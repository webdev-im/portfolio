import {
  Box,
  Icon,
  Text,
  forwardRef,
  useTheme,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outline";

const MultilayerButton = forwardRef(
  (
    {
      buttonText,
      onClick,
      size = "md",
      variant = "solid",
      noIcon = false,
      isDisabled = false, // Use isDisabled as prop for clarity
      ...props
    }: {
      buttonText: string;
      onClick?: () => void;
      size?: ButtonSize;
      variant?: ButtonVariant;
      noIcon?: boolean;
      isDisabled?: boolean; // Use isDisabled instead of disabled
    },
    ref
  ) => {
    const theme = useTheme();

    // Define size variations
    const sizeConfig: Record<ButtonSize, { width: string; height: string; fontSize: string }> = {
      sm: { width: "120px", height: "40px", fontSize: "sm" },
      md: { width: "160px", height: "50px", fontSize: "md" },
      lg: { width: "240px", height: "60px", fontSize: "lg" },
    };

    const { width, height, fontSize } = sizeConfig[size];
    const isOutline = variant === "outline";

    return (
      <Box
        as="button"
        position="relative"
        display="grid"
        placeItems="center"
        fontWeight="bold"
        color={
          isDisabled
            ? "gray.400" // Grayed out color for disabled
            : isOutline
            ? theme.colors?.brand?.[500] || "#6c87dc"
            : "black"
        }
        background={
          isDisabled
            ? "gray.200" // Background for disabled
            : isOutline
            ? "transparent"
            : "var(--bg-color-1)"
        }
        border={isOutline ? "2px solid" : "none"}
        borderColor={
          isDisabled
            ? "gray.300" // Border for disabled
            : isOutline
            ? theme.colors?.brand?.[500] || "#6c87dc"
            : "transparent"
        }
        borderRadius="8px"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        width={width}
        height={height}
        fontSize={fontSize}
        ref={ref}
        onClick={isDisabled ? undefined : onClick} // Prevent click when disabled
        aria-disabled={isDisabled} // Add ARIA attribute for accessibility
        {...props}
        _hover={
          isDisabled
            ? undefined // No hover effect if disabled
            : {
                "--active": "1",
                background: isOutline ? "var(--bg-color-1)" : undefined,
                color: isOutline ? "white" : undefined,
              }
        }
        _focusVisible={isDisabled ? undefined : { "--active": "1" }}
        _active={isDisabled ? undefined : { "--active": "0.5" }}
        sx={{
          "--bg-color-1": theme.colors?.brand?.[100] || "#33468b",
          "--bg-color-2": theme.colors?.brand?.[500] || "#6c87dc",
          "--bg-color-3": theme.colors?.brand?.[700] || "#bcc8ef",
          "--step": "0.5rem",
          "--active": "0",
        }}
      >
        {/* Top Layer */}
        <Box
          as="span"
          position="absolute"
          inset="0"
          bg={isOutline ? "transparent" : "var(--bg-color-3)"}
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
          <Text fontWeight="bold">{buttonText || "Click Me"}</Text>
          {!noIcon && (
            <Box
              as={motion.div}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              right="10px"
              zIndex="4"
              animate={!isDisabled ? { x: [0, 10, 0] } : undefined} // Disable animation when disabled
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              } as any}
            >
              <Icon
                as={ChevronRightIcon}
                boxSize={6}
                color={
                  isDisabled
                    ? "gray.400" // Icon color for disabled
                    : isOutline
                    ? theme.colors?.brand?.[500]
                    : "black"
                }
              />
            </Box>
          )}
        </Box>

        {/* Middle Layer */}
        {!isOutline && (
          <Box
            as="span"
            position="absolute"
            inset="0"
            bg="var(--bg-color-2)"
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
        )}

        {/* Bottom Layer */}
        {!isOutline && (
          <Box
            as="span"
            position="absolute"
            inset="0"
            bg="var(--bg-color-1)"
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
        )}
      </Box>
    );
  }
);

export default MultilayerButton;





