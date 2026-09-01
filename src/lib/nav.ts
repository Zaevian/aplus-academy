import {
  BookMarked,
  BookOpen,
  ClipboardList,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Library,
  Search,
  ListChecks,
  MonitorPlay,
  Repeat,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const PRIMARY_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/course", label: "Course", icon: BookOpen },
  { href: "/course/core-1", label: "Core 1", icon: GraduationCap },
  { href: "/course/core-2", label: "Core 2", icon: GraduationCap },
  { href: "/labs", label: "Labs", icon: Wrench },
  { href: "/practice", label: "Practice", icon: ListChecks },
  { href: "/review", label: "Review Queue", icon: Repeat },
  { href: "/exam", label: "Exam Simulator", icon: MonitorPlay },
  { href: "/search", label: "Search", icon: Search },
  { href: "/glossary", label: "Glossary", icon: Library },
  { href: "/progress", label: "Progress", icon: Gauge },
  { href: "/notes", label: "Notes", icon: BookMarked },
  { href: "/objectives", label: "Objectives", icon: ClipboardList },
  { href: "/settings", label: "Settings", icon: Settings },
];
