"use client";

import React from "react";
import { motion } from "framer-motion";
import CourseCard from "@/widgets/course-card";
import type { Course } from "@/widgets/course-card/types";

// This would typically come from an API call
const enrolledCourses: Course[] = [
  {
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming",
    image: "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/U6Plt0N.png",
    price: 49.99,
    isCompleted: false
  },
  {
    title: "Python Programming",
    description: "Learn Python from scratch with practical examples",
    image: "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/TDs5Gpg.png",
    price: 59.99,
    isCompleted: true
  },
  {
    title: "TypeScript Mastery",
    description: "Advanced TypeScript patterns and best practices",
    image: "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png",
    price: 79.99,
    isCompleted: false
  }
];

export default function EnrolledCourses() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          My Enrolled Courses
        </h1>

        <div className="flex flex-col gap-3">
          {enrolledCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>

        {enrolledCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-[var(--text-muted)]">
              You haven't enrolled in any courses yet.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
} 