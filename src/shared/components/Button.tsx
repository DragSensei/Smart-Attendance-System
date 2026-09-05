import { cn } from "@/shared/lib/utils";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }[variant];

  return {
    type: "button",
    props: {
      className: cn(baseClasses, variantClasses),
      onClick,
      disabled,
      children: label,
    },
  };
}
