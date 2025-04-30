import CourseCard from "@/widgets/course-card";
import React from "react";

const items = [
  {
    title: "Learn Linux",
    image:
      "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/U6Plt0N.png",
    description: "Mipt course on C++ development",
    price: 99.9,
  },
  {
    title: "Learn Go",
    image:
      "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png",
    description: "Mipt course on C++ development",
    price: 87.9,
  },
  {
    title: "Learn SQL",
    image:
      "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/TDs5Gpg.png",
    description: "Mipt course on C++ development",
    price: 39.9,
  },
];

export default function Courses() {
  return (
    <div
      className="h-full flex flex-col justify-self-center w-full 
      items-center my-32 gap-1"
    >
      {items.map((item, index) => {
        return <CourseCard key={index} course={item} />;
      })}
    </div>
  );
}
