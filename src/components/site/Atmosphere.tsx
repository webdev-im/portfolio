"use client"

import { useEffect, useRef } from "react"

export function Atmosphere() {
  const light = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = light.current
    if (!node) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fine = window.matchMedia("(pointer: fine)")
    if (reduce.matches || !fine.matches) return

    let currentX = window.innerWidth * 0.72
    let currentY = window.innerHeight * 0.18
    let targetX = currentX
    let targetY = currentY
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX - 280
      targetY = event.clientY - 280
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.035
      currentY += (targetY - currentY) * 0.035
      node.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="atmo" aria-hidden="true">
      <div className="atmo__haze" />
      <div className="atmo__grid" />
      <svg className="atmo__traces" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M-40 160 C 220 140, 380 420, 720 400 S 1120 180, 1500 260" />
        <path d="M-20 520 C 260 480, 420 760, 760 700 S 1180 540, 1480 620" />
        <path d="M120 940 C 280 620, 640 560, 860 340 S 1200 80, 1500 140" />
        <path d="M-60 300 C 180 340, 460 120, 780 220 S 1160 480, 1500 400" />
      </svg>
      <div className="atmo__sweep" />
      <div className="atmo__dust" />
      <div className="atmo__dust atmo__dust--far" />
      <div className="atmo__grain" />
      <div className="atmo__vignette" />
      <div className="sprocket" />
      <div className="practical" ref={light} />
    </div>
  )
}
