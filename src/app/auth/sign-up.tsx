import Button from "@/ui/button";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchemaType } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = () => {
    console.log("Processing sign up...");
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
      <div>
        <Input {...register("email")} placeholder="Email" type="email" />
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
      <Button type="submit">Sign in</Button>
    </form>
  );
}
