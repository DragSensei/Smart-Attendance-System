"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Mail, Building, Shield, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { formatDate } from "@/shared/lib/utils";
import type { User } from "../schemas/user.schema";

export interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-base">{user.name}</CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </CardDescription>
          </div>
          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
            <Shield className="w-3 h-3 mr-1" />
            {user.role}
          </Badge>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-1.5 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5" />
            <span>Department: {user.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Joined: {formatDate(user.createdAt)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
