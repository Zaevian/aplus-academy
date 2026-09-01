"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AcademyProvider } from "@/components/academy-provider";
import { VoiceProvider } from "@/components/voice/voice-provider";
import { VoiceNowPlaying } from "@/components/voice/listen-button";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AcademyProvider>
          <VoiceProvider>
            {children}
            <VoiceNowPlaying />
            <Toaster />
          </VoiceProvider>
        </AcademyProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
