"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { checkIn } from "../server/attendance.service";

export interface CheckInButtonProps {
  userId: string;
  onSuccess?: () => void;
}

export function CheckInButton({ userId, onSuccess }: CheckInButtonProps) {
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await checkIn({ userId });
      if (res.success) {
        setIsCheckedIn(true);
        if (onSuccess) onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        onClick={handleCheckIn}
        disabled={loading || isCheckedIn}
        className={isCheckedIn ? "bg-emerald-600 hover:bg-emerald-700" : ""}
      >
        {isCheckedIn ? (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Checked In
          </>
        ) : (
          <>
            <Clock className="w-4 h-4 mr-2" />
            {loading ? "Recording..." : "Check In Now"}
          </>
        )}
      </Button>
    </motion.div>
  );
}
