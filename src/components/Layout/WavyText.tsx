"use client";

import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const slide = keyframes`
  0%   { background-position: -400% 0; }
  50%  { background-position: 200% 0; }
  100% { background-position: -300% 0; }
`;

// MORE COLORS + HARD STRIPES
const stripedGradient = `linear-gradient(-60deg,
  #3b82f6 0%,   #3b82f6 7%,
  #06b6d4 7%,   #06b6d4 14%,
  #10b981 14%,  #10b981 21%,
  #84cc16 21%,  #84cc16 28%,
  #f59e0b 28%,  #f59e0b 35%,
  #ef4444 35%,  #ef4444 42%,
  #ec4899 42%,  #ec4899 49%,
  #8b5cf6 49%,  #8b5cf6 56%,
  #6366f1 56%,  #6366f1 63%,
  #1d4ed8 63%,  #1d4ed8 70%,
  #7c3aed 70%,  #7c3aed 77%,
  #db2777 77%,  #db2777 84%,
  #0ea5e9 84%,  #0ea5e9 92%,
  #3b82f6 92%,  #3b82f6 100%
)`;

export default function SlidingGradientText({ children }: { children: React.ReactNode }) {
    return (
        <Box
            as="span"
            position="relative"
            display="inline-block"
            fontWeight="inherit"
            lineHeight="inherit"
            color="transparent"
        >
            {/* LAYER 1 — slow drift */}
            <Box
                as="span"
                position="absolute"
                inset="-0.15em 0 -0.15em 0"
                bg={stripedGradient}
                bgSize="800% 800%"
                animation={`${slide} 70s cubic-bezier(0.4, 0.0, 0.2, 1) infinite alternate`}
                opacity={0.45}
                bgClip="text"

            >
                {children}
            </Box>

            {/* LAYER 2 — reverse drift, slightly faster */}
            <Box
                as="span"
                position="absolute"
                inset="-0.15em 0 -0.15em 0"
                bg={stripedGradient}
                bgSize="800% 800%"
                animation={`${slide} 90s cubic-bezier(0.6, 0.0, 0.4, 1) infinite alternate-reverse`}
                opacity={0.45}
                bgClip="text"
            >
                {children}
            </Box>

            {/* LAYER 3 — slowest, gentle bounce */}
            <Box
                as="span"
                position="absolute"
                inset="-0.15em 0 -0.15em 0"
                bg={stripedGradient}
                bgSize="800% 800%"
                animation={`${slide} 110s cubic-bezier(0.5, 0.1, 0.3, 1) infinite alternate`}
                opacity={0.45}
                bgClip="text"
            >
                {children}
            </Box>

            {/* Invisible text for layout */}
            <Box as="span" visibility="hidden">
                {children}
            </Box>
        </Box>
    );
}
