"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

import { system } from "@/theme"

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute="class"
        forcedTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
