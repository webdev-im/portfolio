"use client"

import { useEffect, useRef, useState } from "react"
import { Box, Button } from "@chakra-ui/react"

const SRC = "/music/song.mp3"

export function Playback() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const held = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.7
    audio.loop = true

    const mark = () => setPlaying(!audio.paused)
    const start = () => {
      if (held.current || !audio.paused) return
      void audio.play().catch(() => {})
    }
    const fromGesture = (event: Event) => {
      const target = event.target
      if (target instanceof Element && target.closest("[data-playback]")) return
      start()
    }

    audio.addEventListener("play", mark)
    audio.addEventListener("pause", mark)
    window.addEventListener("pointerdown", fromGesture)
    window.addEventListener("keydown", fromGesture)
    void audio.play().catch(() => {})

    return () => {
      audio.pause()
      audio.removeEventListener("play", mark)
      audio.removeEventListener("pause", mark)
      window.removeEventListener("pointerdown", fromGesture)
      window.removeEventListener("keydown", fromGesture)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      held.current = false
      void audio.play().catch(() => {})
      return
    }
    held.current = true
    audio.pause()
  }

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" />
      <Button
        type="button"
        data-playback=""
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause soundtrack" : "Play soundtrack"}
        position="fixed"
        zIndex={50}
        right={{ base: 4, lg: 6 }}
        bottom={{ base: 4, lg: 6 }}
        h="10"
        px="4"
        gap="2"
        borderRadius="0"
        borderWidth="1px"
        borderColor="line"
        bg="#101218"
        color="bone"
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="0.16em"
        textTransform="uppercase"
        _hover={{ borderColor: "sodium", color: "sodium", bg: "#101218" }}
      >
        <Box
          boxSize="1.5"
          bg={playing ? "sodium" : "mute"}
          boxShadow={playing ? "0 0 8px rgba(255, 106, 26, 0.7)" : "none"}
        />
        {playing ? "Pause" : "Play"}
      </Button>
    </>
  )
}
