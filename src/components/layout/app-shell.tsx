"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useAcademy } from "@/components/academy-provider";
import { MOBILE_TAB_HREFS, PRIMARY_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Main">
      {PRIMARY_NAV.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/start" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { ready, profile } = useAcademy();
  const pathname = usePathname();
  const router = useRouter();
  const isOnboarding = pathname.startsWith("/onboarding");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!profile?.onboardingComplete && !isOnboarding) {
      router.replace("/onboarding");
    }
  }, [ready, profile, isOnboarding, router]);

  if (isOnboarding) {
    return <div className="min-h-svh bg-background">{children}</div>;
  }

  const mobileTabs = MOBILE_TAB_HREFS.map(
    (href) => PRIMARY_NAV.find((item) => item.href === href)!,
  );

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="hidden w-56 shrink-0 border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <div className="px-3 py-3">
          <Link href="/start" className="block">
            <div className="text-sm font-semibold tracking-tight">A+ Academy</div>
            <div className="text-xs text-muted-foreground">Start here · A+ V15</div>
          </Link>
        </div>
        <Separator />
        <div className="flex-1 overflow-y-auto p-2">
          <NavLinks />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 items-center gap-2 border-b px-3 md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-sidebar p-0">
              <SheetTitle className="px-3 py-3 text-sm">A+ Academy</SheetTitle>
              <div className="p-2">
                <NavLinks onNavigate={() => setMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-sm font-medium">A+ Academy</span>
        </header>
        <main className="flex-1 overflow-x-hidden pb-16 md:pb-0">{children}</main>
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t bg-background/95 backdrop-blur md:hidden"
          aria-label="Mobile"
        >
          {mobileTabs.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/start" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-0.5 px-1 text-[10px] focus-visible:ring-3 focus-visible:ring-ring/50",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.shortLabel}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
