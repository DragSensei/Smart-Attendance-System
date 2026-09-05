import { APP_CONFIG } from "@/shared/data/constants";
import { Button } from "@/shared/components/Button";
import { LoginForm } from "@/features/auth";
import { UserCard } from "@/features/users";

export default function HomePage() {
  return {
    type: "main",
    props: {
      title: APP_CONFIG.name,
      welcome: `Welcome to ${APP_CONFIG.company} Attendance Portal`,
      login: LoginForm({}),
      userPreview: UserCard({
        user: {
          id: "usr_default",
          name: "Administrator",
          email: "admin@wajha.com",
          department: "IT",
          role: "admin",
          createdAt: "2026-01-01T00:00:00Z",
        },
      }),
      action: Button({ label: "Go to Dashboard" }),
    },
  };
}
