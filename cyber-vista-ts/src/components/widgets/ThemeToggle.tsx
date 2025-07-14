"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button"; // 👈 your shared button

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";
  const bgColor = isLight ? "bg-white" : "bg-black";

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={`bg-white p-2 rounded-full transition-all duration-300 ${
          isLight ? "text-yellow-500 ring-1 ring-yellow-300" : "text-gray-500"
        }`}
        aria-label="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={`${bgColor} p-2 rounded-full transition-all duration-300 ${
          isDark ? "text-gray-200 ring-1 ring-gray-400" : "text-gray-500"
        }`}
        aria-label="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </Button>
    </div>
  );
}
