"use client";

import React from "react";
import { Course } from "./types";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import ProgressIndicator from "@/ui/progress-indicator";
import { useRouter } from "next/navigation";

export interface CourseCardProps {
  course: Course;
}

export default function CourseCard(props: CourseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the first task of the course
    // In a real app, you'd get the courseId from the course object
    // and possibly fetch the first taskId from an API
    const courseId = props.course.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/courses/${courseId}/tasks/1`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="w-10/12 h-16 rounded flex items-center justify-between px-8 
      bg-[var(--background-lighter)] border border-[var(--background-darker)] 
      shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <ProgressIndicator isCompleted={props.course.isCompleted} />
        <Image
          src={props.course.image}
          alt="course-logo"
          width={50}
          height={50}
          priority
        />
        <span>{props.course.title}</span>
      </div>
      <span>
        {props.course.price + " "}
        <FontAwesomeIcon icon={faDollar} />
      </span>
    </motion.div>
  );
}
