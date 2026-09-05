"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, UserCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { formatDate, formatTime } from "@/shared/lib/utils";
import type { AttendanceRecord } from "../schemas/attendance.schema";

export interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export function AttendanceTable({ records }: AttendanceTableProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed rounded-xl text-muted-foreground">
        <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No attendance records found for today.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground border-b text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3 font-semibold">User</th>
            <th className="px-6 py-3 font-semibold">Date</th>
            <th className="px-6 py-3 font-semibold">Time</th>
            <th className="px-6 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {records.map((rec, index) => (
            <motion.tr
              key={rec.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-muted/40 transition-colors"
            >
              <td className="px-6 py-4 font-medium flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary" />
                {rec.userId}
              </td>
              <td className="px-6 py-4 text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(rec.date)}
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(rec.checkInTime)}
                </span>
              </td>
              <td className="px-6 py-4">
                <Badge
                  variant={
                    rec.status === "PRESENT"
                      ? "success"
                      : rec.status === "LATE"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {rec.status === "ABSENT" && <ShieldAlert className="w-3 h-3 mr-1" />}
                  {rec.status}
                </Badge>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
