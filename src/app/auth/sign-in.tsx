import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import Button from "@/ui/button";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(() => {
    const errorParam = searchParams?.get('error');
    if (errorParam === 'CredentialsSignin') {
      return 'Invalid username or password';
    }
    return null;
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      setError(null);
      console.log('Attempting sign in for:', data.username);
      
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      console.log('Sign in result:', { ...result, password: '[REDACTED]' });

      if (result?.error) {
        console.error('Sign in error:', result.error);
        setError('Invalid username or password');
        return;
      }

      router.push('/account');
      router.refresh();
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Failed to sign in. Please try again later.');
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
        <Input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <span className="text-rose-600">{errors.password.message}</span>
        )}
      </div>
      {error && (
        <div className="text-rose-600 text-sm text-center">{error}</div>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
