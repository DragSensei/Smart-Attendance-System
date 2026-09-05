/**
 * Global application constants
 */
export const APP_CONFIG = {
  name: "Wajha Attendance System",
  company: "Wajha Technologies",
  defaultTimezone: "Asia/Riyadh",
  workHoursPerDay: 8,
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  LATE: "LATE",
  EXCUSED: "EXCUSED",
} as const;

export type AttendanceStatus = keyof typeof ATTENDANCE_STATUS;
