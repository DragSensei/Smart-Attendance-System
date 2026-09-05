import { formatDate } from "@/shared/lib/utils";
import type { User } from "../schemas/user.schema";

export interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return {
    type: "div",
    props: {
      className: "p-4 bg-white rounded-lg shadow-sm border border-gray-100",
      children: {
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
        joined: formatDate(user.createdAt),
      },
    },
  };
}
