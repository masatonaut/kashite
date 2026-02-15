"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { JA } from "@/constants/ja";

interface HeaderProps {
  activeCount: number;
}

export function Header({ activeCount }: HeaderProps) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-5 py-4">
        <h1
          className="font-heading text-xl font-bold text-text-primary"
          style={{ letterSpacing: "-0.03em" }}
        >
          {JA.HEADER_TITLE}
        </h1>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label={isDark ? JA.SETTINGS_THEME_LIGHT : JA.SETTINGS_THEME_DARK}
          >
            {isDark ? (
              <Sun size={20} strokeWidth={1.5} />
            ) : (
              <Moon size={20} strokeWidth={1.5} />
            )}
          </button>

          {/* Active count badge */}
          {activeCount > 0 && (
            <div className="flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-accent text-white text-xs font-medium">
              {activeCount}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
