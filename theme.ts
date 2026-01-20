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
    500: "#415bb2", // Your primary matching color
    600: "#33468b",
    700: "#253265",
    800: "#181d3e",
    900: "#0a0918",
  },
};

// 3. Global Styles for Glassmorphism Backgrounds
const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === "dark" ? "gray.950" : "gray.50",
      color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
      transition: "background-color 0.2s ease",
    },
  }),
};

// 4. Customize the Button component with a "Glass" variant
const components = {
  Button: {
    baseStyle: {
      fontWeight: "600",
      borderRadius: "full", // Rounded buttons look more modern with glass
      transition: "all 0.3s ease",
    },
    variants: {
      solid: (props: any) => ({
        bg: props.colorMode === "light" ? "brand.500" : "brand.400",
        color: "white",
        boxShadow: "0 4px 14px 0 rgba(65, 91, 178, 0.39)", // Subtle glow
        _hover: {
          bg: props.colorMode === "light" ? "brand.600" : "brand.500",
          transform: "translateY(-1px)",
          boxShadow: "0 6px 20px rgba(65, 91, 178, 0.23)",
        },
      }),
      // New Glass Variant for Buttons
      glass: (props: any) => ({
        bg: props.colorMode === "dark" ? "whiteAlpha.100" : "whiteAlpha.600",
        backdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor:
          props.colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200",
        color: props.colorMode === "dark" ? "white" : "brand.600",
        _hover: {
          bg: props.colorMode === "dark" ? "whiteAlpha.200" : "whiteAlpha.800",
          borderColor: "brand.400",
        },
      }),
      outline: (props: any) => ({
        border: "2px solid",
        borderColor: props.colorMode === "light" ? "brand.500" : "brand.400",
        color: props.colorMode === "light" ? "brand.500" : "brand.400",
        _hover: {
          bg:
            props.colorMode === "light"
              ? "brand.50"
              : "rgba(69, 102, 211, 0.1)",
        },
      }),
    },
  },
  // Adding Heading customization for the "Modern" feel
  Heading: {
    baseStyle: {
      letterSpacing: "-0.02em",
    },
  },
};

// 5. Extend the theme
const theme = extendTheme({
  config,
  colors,
  styles,
  components,
  // Custom shadows for glass panes
  shadows: {
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    glassDark: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
});

export default theme;
