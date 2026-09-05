import type { AttendanceStatus } from "@/shared/data/constants";

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface CheckInPayload {
  userId: string;
  notes?: string;
}

export function validateCheckInPayload(payload: unknown): payload is CheckInPayload {
  if (typeof payload !== "object" || payload === null) return false;
  const p = payload as Record<string, unknown>;
  return typeof p.userId === "string" && p.userId.length > 0;
}
