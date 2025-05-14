"use client";

import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import ReactMarkdown from 'react-markdown';

// This would typically come from an API/database
const sampleTask = {
  title: "JavaScript Fundamentals - Variables",
  description: `
# Task: Working with Variables

In this exercise, you'll learn about JavaScript variables and how to use them effectively.

## Instructions:
1. Create a variable named 'greeting' and assign it the value "Hello, World!"
2. Create a variable named 'number' and assign it any number
3. Create a variable named 'isTrue' and assign it a boolean value

## Expected Output:
Your code should declare all three variables with appropriate values.

## Tips:
- Use 'let' or 'const' for variable declaration
- Choose appropriate variable names
- Make sure to use proper data types
  `,
  initialCode: `// Write your code here
let greeting = "";
let number;
let isTrue;

// Don't modify the code below
console.log(greeting);
console.log(number);
console.log(isTrue);
`,
  language: "javascript"
};

export default function TaskPage({ params }: { params: { courseId: string; taskId: string } }) {
  const { theme } = useTheme();
  const [code, setCode] = useState(sampleTask.initialCode);
  const [isResizing, setIsResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50); // percentage

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const container = document.getElementById('split-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Limit the split position between 30% and 70%
    if (newPosition >= 30 && newPosition <= 70) {
      setSplitPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-16">
      <div className="px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent"
        >
          {sampleTask.title}
        </motion.h1>

        <div 
          id="split-container"
          className="flex h-[calc(100vh-8rem)] relative bg-[var(--background-lighter)] rounded-lg shadow-lg overflow-hidden"
        >
          {/* Task Description Panel */}
          <div 
            className="overflow-y-auto p-6"
            style={{ width: `${splitPosition}%` }}
          >
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{sampleTask.description}</ReactMarkdown>
            </div>
          </div>

          {/* Resizer */}
          <div
            className="w-1 cursor-col-resize bg-[var(--background-darker)] hover:bg-blue-500 transition-colors"
            onMouseDown={handleMouseDown}
          />

          {/* Code Editor Panel */}
          <div 
            className="flex-1 overflow-hidden"
            style={{ width: `${100 - splitPosition}%` }}
          >
            <Editor
              height="100%"
              defaultLanguage={sampleTask.language}
              defaultValue={sampleTask.initialCode}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-6 right-6 flex gap-4 mr-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCode(sampleTask.initialCode)}
            className="px-4 py-2 bg-[var(--background-lighter)] text-[var(--foreground)] rounded-lg hover:bg-[var(--background-darker)] transition-colors shadow-lg"
          >
            Reset Code
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Running code:', code)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Run Code
          </motion.button>
        </div>
      </div>
    </div>
  );
} 