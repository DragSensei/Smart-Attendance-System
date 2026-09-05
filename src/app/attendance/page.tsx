import { CheckInButton, AttendanceTable } from "@/features/attendance";
import { Button } from "@/shared/components/Button";

export default function AttendancePage() {
  return {
    type: "section",
    props: {
      title: "Daily Attendance Dashboard",
      checkIn: CheckInButton({ userId: "usr_current" }),
      table: AttendanceTable({ records: [] }),
      backButton: Button({ label: "Back to Home", variant: "secondary" }),
    },
  };
}
