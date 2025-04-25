import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(3, {
    message: "Username should be at least 3 characters long",
  }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

export const signUpSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username should be at least 3 characters long",
    }),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
