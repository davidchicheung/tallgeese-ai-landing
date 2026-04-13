"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1">
        <div className="h-8 w-8" />
        <div className="h-8 w-8" />
        <div className="h-8 w-8" />
      </div>
    );
  }

  const options = [
    { value: "system", icon: Monitor, label: "System mode" },
    { value: "light", icon: Sun, label: "Light mode" },
    { value: "dark", icon: Moon, label: "Dark mode" },
  ] as const;

  return (
    <div className="flex items-center gap-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={label}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors",
            theme === value
              ? "text-foreground"
              : "text-muted-foreground/50 hover:text-muted-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
