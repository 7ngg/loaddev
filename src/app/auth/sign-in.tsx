import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import Button from "@/ui/button";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = () => {
    console.log("Processing sign in...");
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
      <Button type="submit">Sign in</Button>
    </form>
  );
}
