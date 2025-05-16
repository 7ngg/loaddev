"use client";

import { useBasketStore } from "@/shared/store/basket-store";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDollar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function BasketPage() {
  const { items, removeItem, total, clearBasket } = useBasketStore();

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            Your Basket
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-[var(--text-muted)] mb-6">
                Your basket is empty
              </p>
              <Link
                href="/courses"
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-[var(--background-lighter)] p-4 rounded-lg border border-[var(--background-darker)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={50}
                        height={50}
                        className="rounded"
                        priority
                      />
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          {course.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-semibold">
                        {course.price} <FontAwesomeIcon icon={faDollar} />
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(course.id)}
                        className="text-rose-500 hover:text-rose-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-4 items-end">
                <div className="bg-[var(--background-lighter)] p-4 rounded-lg border border-[var(--background-darker)] min-w-[200px]">
                  <div className="flex justify-between mb-2">
                    <span className="text-[var(--text-muted)]">Total:</span>
                    <span className="font-bold">
                      {total} <FontAwesomeIcon icon={faDollar} />
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Checkout
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearBasket}
                  className="text-rose-500 hover:text-rose-600 transition-colors"
                >
                  Clear Basket
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
} 