import { Briefcase, Building, Clock, FileText, LayoutDashboard, Settings, TimerOff, User, UserCheck, Wallet } from "lucide-react";

import type { NavItem } from "@/types/nav";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    label: "Employees",
    icon: Building,
    path: "/employee-management/employee-details",
    sub: [
      { label: "Employee Details", icon: User, path: "/employee-management/employee-details" },
      { label: "Employment Details", icon: Briefcase, path: "/employee-management/employment-details" },
      { label: "Shift Schedule", icon: Clock, path: "/employee-management/shift-schedule" },
      { label: "201 Files", icon: FileText, path: "/employee-management/201-files" },
    ],
  },
  { label: "Time Off", icon: TimerOff, path: "/time-off" },
  { label: "Time & Attendance", icon: UserCheck, path: "/time-and-attendance" },
  { label: "Payroll", icon: Wallet, path: "/payroll" },
  { label: "Settings", icon: Settings, path: "/settings" },
];
