"use client";

import { useFetcher } from "@/lib/api";
import { WorldMap } from "@/components/ui/world-map";
import { AuroraText } from "../magicui/aurora-text";
import { Globe } from "lucide-react";

export function WorldMapDemo() {
  const {
    data: attackData,
    loading,
    error,
  } = useFetcher("/attacks-by-country");

  const countryCoords: Record<string, { lat: number; lng: number }> = {
    china: { lat: 35.8617, lng: 104.1954 },
    russia: { lat: 61.524, lng: 105.3188 },
    india: { lat: 20.5937, lng: 78.9629 },
    germany: { lat: 51.1657, lng: 10.4515 },
    pakistan: { lat: 30.3753, lng: 69.3451 },
  };

  const countryList =
    attackData?.message?.map((d: any) => d.country.toLowerCase()) || [];

  const dots =
    attackData?.message?.length > 1
      ? attackData.message.flatMap((d: any) => {
          const from = d.country.toLowerCase();
          const fromCoords = countryCoords[from];
          if (!fromCoords) return [];

          return attackData.message
            .filter((t: any) => t.country.toLowerCase() !== from)
            .map((t: any) => {
              const to = t.country.toLowerCase();
              const toCoords = countryCoords[to];
              if (!toCoords) return null;
              return {
                start: {
                  ...fromCoords,
                  label: from,
                  hour: d.hour,
                  day: d.day,
                },
                end: { ...toCoords },
              };
            })
            .filter(Boolean);
        })
      : [];

  const labels =
    attackData?.message
      ?.map((d: any) => {
        const country = d.country.toLowerCase();
        const coords = countryCoords[country];
        if (!coords) return null;

        return {
          name: `${country.charAt(0).toUpperCase() + country.slice(1)} (${
            d.hour
          }h, ${d.day}d)`,
          lat: coords.lat,
          lng: coords.lng,
        };
      })
      .filter(Boolean) || [];

  return (
    <div className="pt-12 dark:bg-background bg-white w-full">
      <div className="flex flex-col space-y-4 items-center justify-center text-center md:text-left">
        <h2 className="flex items-center gap-2 text-balance text-center text-3xl font-semibold tracking-tight text-black md:text-5xl dark:text-neutral-300">
          <span>
            <Globe size={32} className="mt-1" stroke="url(#gradient)" />
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradient"
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
          </span>
          <span>
            <AuroraText className="">Attack</AuroraText> Insights
          </span>
        </h2>
        <p className="text-center text-base/6 text-gray-700 dark:text-gray-200 pb-12">
          Real-time view of global attack trends by location and time.
        </p>
      </div>

      {!loading && !error && (
        <WorldMap
          dots={dots}
          labels={[
            ...labels, // ← includes China, Russia, etc.
            { name: "Texas", lat: 32.7767, lng: -96.797 },
          ]}
        />
      )}
    </div>
  );
}
