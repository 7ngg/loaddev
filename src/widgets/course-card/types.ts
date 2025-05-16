export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  isCompleted?: boolean;
  level: string;
  duration: string;
  lessons: number;
  exercises: number;
}
