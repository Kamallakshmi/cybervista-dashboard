// DashboardSection.tsx
import React from "react";
import { AuroraText } from "@/components/magicui/aurora-text";

const gradientTextStyle = {
  background: "linear-gradient(135deg, #ff1f6d, #9b2eff, #007cf0, #00f5d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function DashboardSection({
  title,
  description,
  children,
  icon: Icon,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
      <div className="flex flex-col space-y-4 md:items-start items-center justify-center text-center md:text-left">
        <h2 className="flex items-center gap-2 text-balance text-center text-3xl font-semibold tracking-tight text-black md:text-4xl dark:text-neutral-300">
          <span className="inline-flex items-center" style={gradientTextStyle}>
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="iconGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff1f6d" />
                  <stop offset="30%" stopColor="#9b2eff" />
                  <stop offset="60%" stopColor="#007cf0" />
                  <stop offset="100%" stopColor="#00f5d4" />
                </linearGradient>
              </defs>
            </svg>

            <Icon size={26} className="mt-1" stroke="url(#iconGradient)" />
          </span>
          <span className="flex gap-1">
            {title
              .split(" ")
              .map((word, idx) =>
                idx === 0 ? (
                  <AuroraText key={idx}>{word}</AuroraText>
                ) : (
                  <span key={idx}>{word}</span>
                )
              )}
          </span>
        </h2>
        <p className="text-base/6 text-gray-700 dark:text-gray-200">
          {description}
        </p>
      </div>
      <div className="w-full p-4">{children}</div>
    </section>
  );
}
