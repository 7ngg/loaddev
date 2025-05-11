"use client";

import { motion } from "framer-motion";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  exercises: number;
}

const courses: Course[] = [
  {
    id: "javascript-basics",
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming",
    level: "Beginner",
    duration: "4 weeks",
    lessons: 24,
    exercises: 12,
  },
  {
    id: "python-basics",
    title: "Python Programming",
    description: "Learn Python from scratch with practical examples",
    level: "Beginner",
    duration: "6 weeks",
    lessons: 30,
    exercises: 15,
  },
  {
    id: "typescript-advanced",
    title: "TypeScript Mastery",
    description: "Advanced TypeScript patterns and best practices",
    level: "Advanced",
    duration: "8 weeks",
    lessons: 32,
    exercises: 18,
  },
  {
    id: "java-basics",
    title: "Java Programming",
    description: "Learn Java programming fundamentals",
    level: "Intermediate",
    duration: "8 weeks",
    lessons: 36,
    exercises: 20,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
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
          className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" 
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
          className="absolute top-60 -right-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" 
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
          className="absolute -bottom-40 left-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" 
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent mb-6"
          >
            Available Courses
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl text-slate-300 max-w-2xl mx-auto"
          >
            Choose a course to start your learning journey
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: Course, index: number) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-pink-500/50 transition-all duration-300"
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
                className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-2xl" />
              </motion.div>
              
              <div className="relative z-10">
                <motion.h2 
                  whileHover={{ x: 5 }}
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent"
                >
                  {course.title}
                </motion.h2>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-1.5 bg-sky-500/20 text-sky-300 rounded-full text-sm font-medium"
                  >
                    {course.level}
                  </motion.span>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium"
                  >
                    {course.duration}
                  </motion.span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-white/70">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 rounded-full bg-sky-500" 
                      />
                      <span>{course.lessons} lessons</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        className="w-2 h-2 rounded-full bg-indigo-500" 
                      />
                      <span>{course.exercises} exercises</span>
                    </motion.div>
                  </div>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-sky-400 group-hover:text-sky-300 transition-colors flex items-center gap-2"
                  >
                    <span>Start Learning</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
