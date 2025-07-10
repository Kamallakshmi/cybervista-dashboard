import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BaseCountType = { push: number; phone: number; text: number };

export function generateMfaHistory(baseCounts: BaseCountType, days: number) {
  const history = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    history.push({
      date: date.toISOString().split("T")[0],
      push: Math.floor(Math.random() * baseCounts.push + 1),
      phone: Math.floor(Math.random() * baseCounts.phone + 1),
      text: Math.floor(Math.random() * baseCounts.text + 1),
    });
  }

  return history;
}
