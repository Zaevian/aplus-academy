"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AcademyProvider } from "@/components/academy-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AcademyProvider>
          {children}
          <Toaster />
        </AcademyProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
