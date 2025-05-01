"use client";

import OAuth from "@/widgets/oauth";
import { SignInForm } from "./sign-in";
import { SignUpForm } from "./sign-up";
import useAuthStore from "@/shared/store/auth-store";

export default function Auth() {
  const isSignIn = useAuthStore((state) => state.isSignIn);
  const toggle = useAuthStore((state) => state.toggle);

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-[var(--background)] px-4"
    >
      <div
        className="w-full max-w-md min-h-96 shadow-lg rounded-2xl flex 
        flex-col text-center justify-between bg-[var(--background-lighter)] 
        p-8 border border-[var(--background-darker)]"
      >
        {isSignIn ? (
          <>
            <div className="">
              <h1 className="text-3xl font-bold text-foreground">Authorize</h1>
              <OAuth />
            </div>
            <SignInForm />
            <span>
              {"Don't have an account yet? "}
              <strong
                onClick={toggle}
                className="cursor-pointer hover:underline"
              >
                Sign up!
              </strong>
            </span>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">
              Sign up
            </h1>
            <SignUpForm />
            <span>
              {"Already have an account? "}
              <strong
                onClick={toggle}
                className="cursor-pointer hover:underline"
              >
                Sign in!
              </strong>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
