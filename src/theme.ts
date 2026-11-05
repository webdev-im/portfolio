import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  globalCss: {
    html: {
      colorScheme: "dark",
      bg: "void",
      color: "bone",
      fontFamily: "var(--font-sans), 'Segoe UI', sans-serif",
    },
    body: {
      bg: "void",
      color: "bone",
      minHeight: "100%",
    },
  },
  theme: {
    tokens: {
      colors: {
        void: { value: "#08090d" },
        panel: { value: "rgba(12, 14, 18, 0.78)" },
        bone: { value: "#e4dccb" },
        mute: { value: "#9a9284" },
        sand: { value: "#ffb07a" },
        sodium: { value: "#ff6a1a" },
        teal: { value: "#7dfff0" },
        line: { value: "rgba(228, 220, 203, 0.16)" },
        veil: { value: "rgba(8, 9, 13, 0.88)" },
        alert: { value: "#ff9b86" },
      },
      fonts: {
        heading: { value: "var(--font-display), 'Arial Narrow', sans-serif" },
        body: { value: "var(--font-sans), 'Segoe UI', sans-serif" },
        mono: { value: "var(--font-mono), ui-monospace, monospace" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
