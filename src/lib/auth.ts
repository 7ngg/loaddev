"use server";

import { signIn } from "auth";

export async function SignIn(provider: string) {
  await signIn(provider, { redirectTo: "http://localhost:3000" });
}
