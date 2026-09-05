"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Clock, CalendarDays, BarChart2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { CheckInButton, AttendanceTable, type AttendanceRecord } from "@/features/attendance";

export default function AttendancePage() {
  const [records, setRecords] = React.useState<AttendanceRecord[]>([
    {
      id: "rec_1",
      userId: "usr_wajha_01",
      date: new Date().toISOString().split("T")[0],
      checkInTime: new Date(Date.now() - 3600000).toISOString(),
      status: "PRESENT",
      notes: "On time - On-site office",
    },
    {
      id: "rec_2",
      userId: "usr_wajha_02",
      date: new Date().toISOString().split("T")[0],
      checkInTime: new Date(Date.now() - 1800000).toISOString(),
      status: "LATE",
      notes: "Traffic delay",
    },
  ]);

  const handleNewCheckIn = () => {
    const newRecord: AttendanceRecord = {
      id: `rec_${Date.now()}`,
      userId: "usr_current_user",
      date: new Date().toISOString().split("T")[0],
      checkInTime: new Date().toISOString(),
      status: "PRESENT",
      notes: "Checked in via web portal",
    };
    setRecords((prev) => [newRecord, ...prev]);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <a href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </a>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Attendance Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ml-10">
            Real-time tracking and daily check-in operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CheckInButton userId="usr_current_user" onSuccess={handleNewCheckIn} />
        </div>
      </div>

      {/* Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Check-Ins Today</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-xs text-muted-foreground mt-1">+100% from start of shift</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <BarChart2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.length > 0
                ? `${Math.round(
                    (records.filter((r) => r.status === "PRESENT").length / records.length) * 100
                  )}%`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: &gt;95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Policy</CardTitle>
            <CalendarDays className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Flexible 8h</Badge>
              <Badge variant="secondary">09:00 - 17:00</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Timezone: Asia/Riyadh</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Log</CardTitle>
          <CardDescription>
            Live list of employee check-ins and timestamps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceTable records={records} />
        </CardContent>
      </Card>
    </div>
  );
}
