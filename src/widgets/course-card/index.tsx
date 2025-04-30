"use client";

import React from "react";
import { Course } from "./types";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";

export interface CourseCardProps {
  course: Course;
}

export default function CourseCard(props: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="w-10/12 h-16 rounded flex items-center justify-between px-8 
      bg-[var(--background-lighter)] border border-[var(--background-darker)] 
      shadow cursor-pointer"
    >
      <div className="flex items-center gap-4">
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
