"use client";

import React from "react";
import { Course } from "./types";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ProgressIndicator from "@/ui/progress-indicator";
import { useRouter } from "next/navigation";
import { useBasketStore } from "@/shared/store/basket-store";

export interface CourseCardProps {
  course: Course;
}

export default function CourseCard(props: CourseCardProps) {
  const router = useRouter();
  const { addItem, isInBasket } = useBasketStore();

  const handleClick = () => {
    // Navigate to the first task of the course
    // In a real app, you'd get the courseId from the course object
    // and possibly fetch the first taskId from an API
    const courseId = props.course.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/courses/${courseId}/tasks/1`);
  };

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    addItem(props.course);
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
      <div className="flex items-center gap-4">
        <span>
          {props.course.price + " "}
          <FontAwesomeIcon icon={faDollar} />
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToBasket}
          disabled={Boolean(isInBasket(props.course.id))}
          className={`px-3 py-1 rounded-full transition-colors ${
            Boolean(isInBasket(props.course.id))
              ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          {Boolean(isInBasket(props.course.id)) ? 'In Basket' : 'Add to Basket'}
        </motion.button>
      </div>
    </motion.div>
  );
}
