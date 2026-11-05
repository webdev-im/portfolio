"use client"

import { Button, type ButtonProps } from "@chakra-ui/react"

type SignalButtonProps = ButtonProps & {
  ghost?: boolean
  href?: string
}

export function SignalButton({
  ghost = false,
  href,
  children,
  ...props
}: SignalButtonProps) {
  const visual: ButtonProps = {
    borderRadius: "0",
    h: "12",
    px: "5",
    bg: ghost ? "transparent" : "bone",
    color: ghost ? "bone" : "void",
    borderWidth: "1px",
    borderColor: "bone",
    fontFamily: "mono",
    fontSize: "xs",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: "500",
    boxShadow: "none",
    textDecoration: "none",
    _hover: {
      bg: ghost ? "transparent" : "sodium",
      color: ghost ? "sodium" : "void",
      borderColor: "sodium",
      textDecoration: "none",
    },
  }

  if (href) {
    return (
      <Button asChild {...visual} {...props}>
        <a href={href}>{children}</a>
      </Button>
    )
  }

  return (
    <Button {...visual} {...props}>
      {children}
    </Button>
  )
}
