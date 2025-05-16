import Button from "@/ui/button";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchemaType } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./actions";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      setError(null);
      const result = await registerUser(data);
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      router.push('/auth?mode=signin');
    } catch (err) {
      console.error('Sign-up error:', err);
      setError('Failed to create account. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex flex-col items-center">
        <Input {...register("username")} placeholder="Username" />
        {errors.username && (
          <span className="text-rose-600">{errors.username.message}</span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <Input {...register("email")} placeholder="Email" type="email" />
        {errors.email && (
          <span className="text-rose-600">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <Input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <span className="text-rose-600">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <Input
          {...register("confirmPassword")}
          placeholder="Confirm password"
          type="password"
        />
        {errors.confirmPassword && (
          <span className="text-rose-600">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      {error && (
        <div className="text-rose-600 text-sm text-center">{error}</div>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
}
