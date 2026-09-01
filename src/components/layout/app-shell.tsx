"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import { useAcademy } from "@/components/academy-provider";
import { PRIMARY_NAV } from "@/lib/nav";
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
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
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

  useEffect(() => {
    if (!ready) return;
    if (!profile?.onboardingComplete && !isOnboarding) {
      router.replace("/onboarding");
    }
  }, [ready, profile, isOnboarding, router]);

  if (isOnboarding) {
    return <div className="min-h-svh bg-background">{children}</div>;
  }

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="hidden w-56 shrink-0 border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <div className="px-3 py-3">
          <Link href="/dashboard" className="block">
            <div className="text-sm font-semibold tracking-tight">A+ Academy</div>
            <div className="text-xs text-muted-foreground">CompTIA A+ V15</div>
          </Link>
        </div>
        <Separator />
        <div className="flex-1 overflow-y-auto p-2">
          <NavLinks />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 items-center gap-2 border-b px-3 md:hidden">
          <Sheet>
            <SheetTrigger
              className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-sidebar p-0">
              <SheetTitle className="px-3 py-3 text-sm">A+ Academy</SheetTitle>
              <div className="p-2">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-sm font-medium">A+ Academy</span>
        </header>
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <nav
          className="grid grid-cols-5 border-t bg-background md:hidden"
          aria-label="Mobile"
        >
          {PRIMARY_NAV.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 text-[10px]",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
