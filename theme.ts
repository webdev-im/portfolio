import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 1. Define your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 2. Create a custom color palette
const colors = {
  brand: {
    50: "#e3e8f9",
    100: "#bcc8ef",
    200: "#94a7e6",
    300: "#6c87dc",
    400: "#4566d3",
    500: "#415bb2",
    600: "#33468b",
    700: "#253265",
    800: "#181d3e",
    900: "#0a0918",
  },
};

// 3. Customize the Button component with theme sensitivity
const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold", // Make all buttons bold
      borderRadius: "md", // Add rounded corners
    },
    sizes: {
      sm: {
        fontSize: "sm",
        px: 4, // Padding x
        py: 2, // Padding y
      },
      md: {
        fontSize: "md",
        px: 6,
        py: 3,
      },
      lg: {
        fontSize: "lg",
        px: 8,
        py: 4,
      },
    },
    variants: {
      solid: (props: any) => ({
        bg: props.colorMode === "light" ? "brand.500" : "brand.400",
        color: "white",
        _hover: {
          bg: props.colorMode === "light" ? "brand.600" : "brand.500",
        },
        _active: {
          bg: props.colorMode === "light" ? "brand.700" : "brand.600",
        },
      }),
      outline: (props: any) => ({
        border: "2px solid",
        borderColor: props.colorMode === "light" ? "brand.500" : "brand.400",
        color: props.colorMode === "light" ? "brand.500" : "brand.400",
        _hover: {
          bg: props.colorMode === "light" ? "brand.50" : "brand.900",
          color: props.colorMode === "light" ? "brand.700" : "brand.300",
        },
        _active: {
          bg: props.colorMode === "light" ? "brand.100" : "brand.800",
          borderColor: props.colorMode === "light" ? "brand.600" : "brand.500",
        },
      }),
      ghost: (props: any) => ({
        color: props.colorMode === "light" ? "brand.500" : "brand.400",
        _hover: {
          bg: props.colorMode === "light" ? "brand.50" : "brand.900",
        },
        _active: {
          bg: props.colorMode === "light" ? "brand.100" : "brand.800",
        },
      }),
    },
    defaultProps: {
      size: "md",
      variant: "solid",
    },
  },
};

// 4. Extend the theme
const theme = extendTheme({ config, colors, components });

export default theme;
