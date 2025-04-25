"use client";

import { useState } from "react";
import { SignInForm } from "./sign-in";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md shadow-lg rounded-2xl flex flex-col text-center bg-[var(--background-lighter)] p-8 border border-[var(--background-darker)]">
        {isSignIn ? (
          <>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">
              Authorize
            </h1>
            <SignInForm />
            <span>
              {"Don't have an account yet? "}
              <strong
                onClick={() => setIsSignIn(false)}
                className="cursor-pointer hover:underline"
              >
                Sign up!
              </strong>
            </span>
          </>
        ) : (
          <span>Registration</span>
        )}
      </div>
    </div>
  );
}
