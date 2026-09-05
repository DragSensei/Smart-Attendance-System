"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";
import { APP_CONFIG } from "@/shared/data/constants";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { LoginForm } from "@/features/auth";
import { UserCard } from "@/features/users";
import { CheckInButton } from "@/features/attendance";

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState<"demo" | "login">("demo");

  const sampleUser = {
    id: "usr_wajha_01",
    name: "Ahmed Al-Mansoor",
    email: "ahmed.mansoor@wajha.com",
    department: "Engineering & AI Solutions",
    role: "manager" as const,
    createdAt: "2025-03-15T09:00:00Z",
  };

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="secondary" className="px-3 py-1 gap-1.5 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Next.js 15 • React 19 • Motion Dev • shadcn/ui
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Next-Gen Attendance System for{" "}
          <span className="text-primary">{APP_CONFIG.company}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-muted-foreground text-base sm:text-lg"
        >
          Engineered with a strict feature-based architecture, boundary enforcement,
          and dynamic micro-interactions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center gap-3 pt-2"
        >
          <Button
            variant={activeTab === "demo" ? "default" : "outline"}
            onClick={() => setActiveTab("demo")}
          >
            Live Feature Showcase
          </Button>
          <Button
            variant={activeTab === "login" ? "default" : "outline"}
            onClick={() => setActiveTab("login")}
          >
            Sign In Portal
          </Button>
        </motion.div>
      </section>

      {/* Dynamic Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-4xl mx-auto"
      >
        {activeTab === "demo" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Attendance Feature Demo Card */}
            <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950 text-primary rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Quick Attendance Action</h3>
                  <p className="text-xs text-muted-foreground">Feature: Attendance Domain</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                One-click check-in with animated feedback and instant state update.
              </p>
              <div className="pt-2">
                <CheckInButton userId={sampleUser.id} />
              </div>
            </div>

            {/* Users Feature Demo Card */}
            <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Active Profile View</h3>
                  <p className="text-xs text-muted-foreground">Feature: Users Domain</p>
                </div>
              </div>
              <UserCard user={sampleUser} />
            </div>

            {/* Architecture Highlights Banner */}
            <div className="md:col-span-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Boundary Enforced Architecture
                </h4>
                <p className="text-xs text-muted-foreground">
                  Shared utilities are cleanly isolated from business features, and features cannot import from each other.
                </p>
              </div>
              <a href="/attendance">
                <Button variant="outline" size="sm" className="gap-2">
                  View Attendance Page
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <LoginForm />
          </div>
        )}
      </motion.div>
    </div>
  );
}
