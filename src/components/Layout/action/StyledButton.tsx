import {
  Box,
  forwardRef,
  useTheme,
  Text,
  Icon,
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
      ...props
    }: {
      buttonText: string;
      onClick?: () => void;
      size?: ButtonSize;
      variant?: ButtonVariant;
      noIcon?: boolean;
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

    const validSize: ButtonSize = size || "md";
    const { width, height, fontSize } = sizeConfig[validSize];

    const isOutline = variant === "outline";

    return (
      <Box
        as="button"
        position="relative"
        display="grid"
        placeItems="center"
        fontWeight="bold"
        color={isOutline ? theme.colors?.brand?.[500] || "#6c87dc" : "black"}
        background={isOutline ? "transparent" : "var(--bg-color-1)"}
        border={isOutline ? "2px solid" : "none"}
        borderColor={isOutline ? theme.colors?.brand?.[500] || "#6c87dc" : "transparent"}
        borderRadius="8px"
        cursor="pointer"
        width={width}
        height={height}
        fontSize={fontSize}
        ref={ref}
        onClick={onClick}
        {...props}
        _hover={{
          "--active": "1",
          background: isOutline ? "var(--bg-color-1)" : undefined,
          color: isOutline ? "white" : undefined,
        }}
        _focusVisible={{
          "--active": "1",
        }}
        _active={{
          "--active": "0.5",
        }}
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
              animate={{ x: [0, 10, 0] }}
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
                color={isOutline ? theme.colors?.brand?.[500] : "black"} // Consistent icon color
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
