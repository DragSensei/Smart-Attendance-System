import { db } from "@/shared/drizzle/db";
import { createSuccessResponse, createErrorResponse, type ApiResponse } from "@/shared/server/api";
import { ATTENDANCE_STATUS } from "@/shared/data/constants";
import {
  type AttendanceRecord,
  type CheckInPayload,
  validateCheckInPayload,
} from "../schemas/attendance.schema";

export async function checkIn(payload: CheckInPayload): Promise<ApiResponse<AttendanceRecord>> {
  if (!validateCheckInPayload(payload)) {
    return createErrorResponse("Invalid check-in payload");
  }

  const record: AttendanceRecord = {
    id: `att_${Date.now()}`,
    userId: payload.userId,
    date: new Date().toISOString().split("T")[0],
    checkInTime: new Date().toISOString(),
    status: ATTENDANCE_STATUS.PRESENT,
    notes: payload.notes,
  };

  await db.query("INSERT INTO attendance (id, user_id, check_in_time, status) VALUES (?, ?, ?, ?)", [
    record.id,
    record.userId,
    record.checkInTime,
    record.status,
  ]);

  return createSuccessResponse(record);
}

export async function getAttendanceByDate(date: string): Promise<ApiResponse<AttendanceRecord[]>> {
  await db.query("SELECT * FROM attendance WHERE date = ?", [date]);
  return createSuccessResponse([]);
}
