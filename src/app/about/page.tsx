"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCode, 
  faGraduationCap, 
  faLaptopCode, 
  faUsers, 
  faRocket, 
  faLightbulb 
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getGradientColors = () => {
    if (theme === 'dark') {
      return {
        background: 'from-slate-900 via-slate-800 to-slate-900',
        accent: 'from-sky-400 via-indigo-400 to-violet-400',
        card: 'from-sky-500 via-indigo-500 to-violet-500',
        hover: 'hover:border-pink-500/50',
        glow: 'shadow-[0_0_15px_rgba(56,189,248,0.3)]',
        neon: 'shadow-[0_0_20px_rgba(56,189,248,0.5)]'
      };
    }
    return {
      background: 'from-blue-50 via-indigo-50 to-violet-50',
      accent: 'from-blue-600 via-indigo-600 to-violet-600',
      card: 'from-blue-500 via-indigo-500 to-violet-500',
      hover: 'hover:border-blue-500/50',
      glow: 'shadow-[0_0_15px_rgba(37,99,235,0.3)]',
      neon: 'shadow-[0_0_20px_rgba(37,99,235,0.5)]'
    };
  };

  const colors = getGradientColors();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      }, 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`min-h-screen bg-gradient-to-br ${colors.background} relative overflow-hidden pt-16`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-40 -left-40 w-96 h-96 ${theme === 'dark' ? 'bg-indigo-500/20' : 'bg-blue-500/20'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-60 -right-40 w-96 h-96 ${theme === 'dark' ? 'bg-sky-500/20' : 'bg-indigo-500/20'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-40 left-1/2 w-96 h-96 ${theme === 'dark' ? 'bg-violet-500/20' : 'bg-violet-500/20'} rounded-full blur-3xl`}
        />
      </div>
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
          mass: 3
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.accent} rounded-full blur-3xl opacity-10`} />
      </motion.div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-[1] max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent mb-6 relative`}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px rgba(56,189,248,0.5)",
                  "0 0 20px rgba(56,189,248,0.3)",
                  "0 0 10px rgba(56,189,248,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              О нашей платформе
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`text-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} max-w-3xl mx-auto`}
            whileHover={{ scale: 1.02 }}
          >
            Ваш путь к успеху в мире технологий начинается здесь
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
              className={`group relative ${theme === 'dark' ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-md rounded-2xl p-8 border border-white/20 ${colors.hover} transition-all duration-300 ${colors.glow}`}
            >
              <motion.div 
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r ${colors.card} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-slate-900/90 via-slate-800/90 to-slate-900/90' : 'from-white/90 via-white/90 to-white/90'} rounded-2xl`} />
              </motion.div>
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${colors.card} flex items-center justify-center ${colors.glow}`}
                >
                  <FontAwesomeIcon icon={feature.icon} className="text-2xl text-white" />
                </motion.div>
                
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                
                <p className={`${theme === 'dark' ? 'text-white/80' : 'text-slate-700/80'} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className={`text-4xl font-bold mb-8 bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`}
            whileHover={{ scale: 1.05 }}
          >
            Наша миссия
          </motion.h2>
          <motion.p 
            className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} max-w-4xl mx-auto leading-relaxed`}
            whileHover={{ scale: 1.02 }}
          >
            Мы стремимся сделать образование в сфере IT доступным для каждого. 
            Наша платформа объединяет лучшие практики обучения, современные технологии 
            и опытных преподавателей, чтобы помочь вам достичь новых высот в карьере.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent ${colors.glow}`}
              >
                {stat.value}
              </motion.div>
              <p className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: faCode,
    title: "Современные технологии",
    description: "Изучайте актуальные языки программирования и фреймворки, которые востребованы на рынке труда."
  },
  {
    icon: faGraduationCap,
    title: "Структурированное обучение",
    description: "Пошаговые курсы с практическими заданиями и проектами для закрепления знаний."
  },
  {
    icon: faLaptopCode,
    title: "Практические проекты",
    description: "Создавайте реальные проекты, которые можно добавить в ваше портфолио."
  },
  {
    icon: faUsers,
    title: "Сообщество",
    description: "Общайтесь с единомышленниками, делитесь опытом и находите партнеров для совместных проектов."
  },
  {
    icon: faRocket,
    title: "Быстрый старт",
    description: "Начните обучение уже сегодня с нашими интерактивными курсами для начинающих."
  },
  {
    icon: faLightbulb,
    title: "Инновационный подход",
    description: "Используем современные методики обучения и постоянно обновляем наши курсы."
  }
];

const stats = [
  {
    value: "1000+",
    label: "Активных студентов"
  },
  {
    value: "50+",
    label: "Курсов"
  },
  {
    value: "95%",
    label: "Успешных выпускников"
  }
]; 