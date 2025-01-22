import { Heading, Text, VStack, useBreakpointValue } from "@chakra-ui/react";

import React from "react";
import classNames from "@/functions/classNames";
import { useInterval } from "react-use";

interface BigTextSlideProps {
  slides: Array<string>;
}

export default function BigTextSlides({ slides }: BigTextSlideProps) {
  const [currentSlide, setSlide] = React.useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const totalSlides = slides.length;

  useInterval(() => {
    if (totalSlides - 1 === currentSlide) {
      setSlide(0);
    } else {
      setSlide(currentSlide + 1);
    }
  }, 2000);

  return (
    <VStack className="flex flex-col items-center text-6xl font-extrabold tracking-tight md:text-9xl">
      <VStack className="flex flex-col items-center">
        {slides.map((text, index) => {
          return (
            <Heading key={text}      fontSize={
              isMobile
                ? `calc(7vh)` // Smaller text size for mobile screens
                : `calc(9vh)` // Larger text size for larger screens
            }>
              <span
                className={classNames(
                  "absolute transition duration-1000",
                  currentSlide !== index ? "opacity-100" : "opacity-0"
                )}
                aria-hidden={true}
              >
                {text}
              </span>

              <span
                className={classNames(
                  "decoration-clone bg-clip-text text-transparent bg-gradient-to-r",
                  index === 0 ? "from-blue-500 to-green-500" : "",
                  index === 1 ? "from-yellow-500 to-red-500" : "",
                  index === 2 ? "from-violet-500 to-pink-500" : "",
                  index === 3 ? "from-yellow-500 to-blue-700" : "",
                  index === 4 ? "from-red-500 to-violet-900" : ""
                )}
              >
                {text}
              </span>
            </Heading>
          );
        })}
      </VStack>
    </VStack>
  );
}
