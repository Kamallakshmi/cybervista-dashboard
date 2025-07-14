"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export default function Typewriterwidget() {
  const words = [
    {
      text: "Analyze",
    },
    {
      text: "MFA",
    },
    {
      text: "authentication",
    },
    {
      text: "method",
    },
    {
      text: "patterns.",
      className: "text-[#2B7FFF] dark:text-[#2B7FFF]",
    },
  ];
  return <TypewriterEffectSmooth words={words} />;
}
