import { Button } from "@/shared/components/Button";
import { checkIn } from "../server/attendance.service";

export interface CheckInButtonProps {
  userId: string;
  onSuccess?: () => void;
}

export function CheckInButton({ userId, onSuccess }: CheckInButtonProps) {
  const handleCheckIn = async () => {
    const res = await checkIn({ userId });
    if (res.success && onSuccess) {
      onSuccess();
    }
  };

  return Button({
    label: "Check In Now",
    onClick: handleCheckIn,
    variant: "primary",
  });
}
