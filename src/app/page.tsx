"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useMotionTemplate } from "framer-motion";

export default function Home() {
  const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, 
  var(--gradient-start) 0%, var(--gradient-middle) 50%, var(--gradient-end) 100%`;
  const border = useMotionTemplate`1px solid var(--gradient-end)`;
  const boxShadow = useMotionTemplate`0px 4px 24px var(--gradient-end)`;

  return (
    <motion.section
      style={{ backgroundImage }}
      animate={{ backgroundPosition: "50% 100%" }}
      transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      className="relative grid min-h-screen place-content-center
      overflow-hidden bg-[var(--background)] px-4 py-24 text-[var(--foreground)]"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="max-w-3xl text-center text-3xl font-medium
          bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
        >
          Some serious text
        </h1>
        <p
          className="my-6 max-w-xl text-center text-base leading-relaxed
          text-gray-400"
        >
          Less serious text but still pretty serious
        </p>
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          style={{ border, boxShadow }}
          className="group relative flex w-fit items-center gap-1.5 text-white
          roudend-full px-4 py-2 transition-colors cursor-pointer rounded-full
          outline-none"
        >
          Some button text
          <FontAwesomeIcon
            className="transition-transform group-hover:-rotate-45 
            group-active:-rotate-12"
            icon={faArrowRight}
          />
        </motion.button>
      </div>
    </motion.section>
  );
}
