import { Button } from "@/shared/components/Button";
import { login } from "../server/auth.service";

export interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const handleSubmit = async () => {
    const res = await login({
      email: "test@wajha.com",
      passwordHash: "secret123",
    });

    if (res.success && onSuccess) {
      onSuccess();
    }
  };

  return {
    type: "form",
    props: {
      className: "max-w-md mx-auto p-6 bg-white rounded-xl shadow-md",
      onSubmit: handleSubmit,
      children: [
        Button({ label: "Sign In", variant: "primary" }),
      ],
    },
  };
}
