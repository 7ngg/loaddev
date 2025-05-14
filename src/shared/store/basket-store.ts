import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Course } from '@/widgets/course-card/types';

interface BasketStore {
  items: Course[];
  total: number;
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  clearBasket: () => void;
  isInBasket: (courseId: string) => boolean;
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (course) => {
        if (get().isInBasket(course.id)) return;
        set((state) => ({
          items: [...state.items, course],
          total: state.total + course.price,
        }));
      },
      removeItem: (courseId) => {
        set((state) => {
          const item = state.items.find((i) => i.id === courseId);
          return {
            items: state.items.filter((i) => i.id !== courseId),
            total: item ? state.total - item.price : state.total,
          };
        });
      },
      clearBasket: () => set({ items: [], total: 0 }),
      isInBasket: (courseId) => {
        return get().items.some((item) => item.id === courseId);
      },
    }),
    {
      name: 'basket-storage', // name of the item in localStorage
    }
  )
); 