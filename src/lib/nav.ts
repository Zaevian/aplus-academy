import {
  BookMarked,
  BookOpen,
  ClipboardList,
  Gauge,
  GraduationCap,
  Compass,
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
  shortLabel: string;
  icon: LucideIcon;
};

export const PRIMARY_NAV: NavItem[] = [
  { href: "/start", label: "Start here", shortLabel: "Start", icon: Compass },
  { href: "/course", label: "Full course map", shortLabel: "Map", icon: BookOpen },
  { href: "/course/core-1", label: "Core 1", shortLabel: "Core 1", icon: GraduationCap },
  { href: "/course/core-2", label: "Core 2", shortLabel: "Core 2", icon: GraduationCap },
  { href: "/labs", label: "Labs", shortLabel: "Labs", icon: Wrench },
  { href: "/practice", label: "Practice", shortLabel: "Practice", icon: ListChecks },
  { href: "/review", label: "Review Queue", shortLabel: "Review", icon: Repeat },
  { href: "/exam", label: "Exam Simulator", shortLabel: "Exam", icon: MonitorPlay },
  { href: "/search", label: "Search", shortLabel: "Search", icon: Search },
  { href: "/glossary", label: "Glossary", shortLabel: "Glossary", icon: Library },
  { href: "/progress", label: "Progress / overview", shortLabel: "Progress", icon: Gauge },
  { href: "/notes", label: "Notes", shortLabel: "Notes", icon: BookMarked },
  { href: "/objectives", label: "Objectives", shortLabel: "Objectives", icon: ClipboardList },
  { href: "/settings", label: "Settings", shortLabel: "Settings", icon: Settings },
];

export const MOBILE_TAB_HREFS = [
  "/start",
  "/course/core-1",
  "/course/core-2",
  "/labs",
  "/search",
] as const;
