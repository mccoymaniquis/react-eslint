import type { LucideIcon } from "lucide-react";

export type SubChild = {
  label: string;
  icon: LucideIcon;
  path: string;
};

export type NavItem = {
  label: string;
  icon: LucideIcon;
  path: string;
  sub?: SubChild[];
};
