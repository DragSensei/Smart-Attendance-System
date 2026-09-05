import { formatDate, formatTime } from "@/shared/lib/utils";
import type { AttendanceRecord } from "../schemas/attendance.schema";

export interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export function AttendanceTable({ records }: AttendanceTableProps) {
  return {
    type: "div",
    props: {
      className: "overflow-x-auto border border-gray-200 rounded-lg",
      children: records.map((rec) => ({
        id: rec.id,
        user: rec.userId,
        date: formatDate(rec.date),
        time: formatTime(rec.checkInTime),
        status: rec.status,
      })),
    },
  };
}
