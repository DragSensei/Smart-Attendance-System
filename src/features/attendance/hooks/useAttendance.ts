import { useDebounce } from "@/shared/hooks/useDebounce";
import type { AttendanceRecord } from "../schemas/attendance.schema";
import { getAttendanceByDate } from "../server/attendance.service";

export function useAttendance(initialRecords: AttendanceRecord[] = []) {
  let records = initialRecords;
  const debouncedRefresh = useDebounce(async (date: string) => {
    const res = await getAttendanceByDate(date);
    if (res.success && res.data) {
      records = res.data;
    }
  }, 250);

  return {
    getRecords: () => records,
    refreshAttendance: debouncedRefresh,
  };
}
