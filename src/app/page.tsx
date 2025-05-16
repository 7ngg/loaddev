"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show theme-dependent content after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const getGradientColors = () => {
    if (!mounted) {
      return {
        background: 'from-blue-50 via-indigo-50 to-violet-50',
        accent: 'from-blue-600 via-indigo-600 to-violet-600',
      };
    }
    
    if (theme === 'dark') {
      return {
        background: 'from-slate-900 via-slate-800 to-slate-900',
        accent: 'from-sky-400 via-indigo-400 to-violet-400',
      };
    }
    return {
      background: 'from-blue-50 via-indigo-50 to-violet-50',
      accent: 'from-blue-600 via-indigo-600 to-violet-600',
    };
  };

  const colors = getGradientColors();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.background} relative overflow-hidden pt-16`}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-40 -left-40 w-96 h-96 ${mounted && theme === 'dark' ? 'bg-indigo-500/20' : 'bg-blue-500/20'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-60 -right-40 w-96 h-96 ${mounted && theme === 'dark' ? 'bg-sky-500/20' : 'bg-indigo-500/20'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-40 left-1/2 w-96 h-96 ${mounted && theme === 'dark' ? 'bg-violet-500/20' : 'bg-violet-500/20'} rounded-full blur-3xl`}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-3xl text-center text-6xl md:text-7xl font-bold bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent mb-6`}
        >
          Learn anything, anywhere
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-6 max-w-xl text-center text-xl leading-relaxed text-[var(--text-muted)]"
        >
          Learn anything, anywhere, anytime
        </motion.p>
        <motion.a
          href="/courses"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative flex items-center gap-2 px-6 py-3 text-white rounded-full bg-gradient-to-r ${colors.accent} hover:opacity-90 transition-opacity`}
        >
          Our courses
          <FontAwesomeIcon
            className="transition-transform group-hover:-rotate-45 group-active:-rotate-12"
            icon={faArrowRight}
          />
        </motion.a>
      </div>
    </div>
  );
}
