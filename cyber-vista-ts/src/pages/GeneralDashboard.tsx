"use client";
import React from "react";

import Loader from "@/components/widgets/Loader";
import { useFetcher } from "@/lib/api";
import { Monitor, ServerIcon, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PinContainer } from "@/components/ui/3d-pin";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  "missing patches": <Monitor className="w-5 h-5 text-blue-600" />,
  "login 30 days": <Smartphone className="w-5 h-5 text-orange-600" />,
  "firewall blocks": <ServerIcon className="w-5 h-5 text-purple-600" />,
};

const textColorMap: Record<string, string> = {
  "missing patches": "text-blue-600",
  "login 30 days": "text-orange-600",
  "firewall blocks": "text-purple-600",
};

const GeneralDashboard = () => {
  const {
    data: generalData,
    loading: generalLoading,
    error: generalError,
  } = useFetcher("/general");

  const transformGeneralData = (
    data: Array<{ category: string; threat_count: number }>
  ) => {
    return data.map(({ category, threat_count }) => ({
      category: category.split("_").join(" "),
      threat_count,
    }));
  };

  const transformed = generalData && transformGeneralData(generalData.message);

  return (
    <Card className="flex flex-col h-full shadow-md bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-300 dark:border-neutral-700">
      <CardHeader className="items-start">
        <CardTitle className="text-balance text-xl font-semibold text-black md:text-2xl dark:text-black">
          General Overview
        </CardTitle>
        <CardDescription className="text-base/6 text-gray-700 dark:text-gray-700">
          Real-time data from SQL
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center min-h-[300px] pb-6 px-2">
        {generalLoading && <Loader />}
        {!generalLoading && !generalError && transformed && (
          <PinContainer
            title="Threat Overview"
            className="rounded-xl bg-gradient-to-b from-slate-100 to-white dark:from-zinc-200 dark:to-white w-full max-w-2xl min-h-56 flex items-center justify-center gap-x-3 px-6"
          >
            {transformed.map((item, idx) => {
              const icon = iconMap[item.category] || <Monitor />;
              const textColor = textColorMap[item.category] || "text-gray-600";

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-2 text-center"
                >
                  {icon}
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-sm font-medium capitalize text-black dark:text-black whitespace-nowrap">
                      {item.category}
                    </span>
                    <span className={cn("text-xl font-bold", textColor)}>
                      {item.threat_count}
                    </span>
                  </div>
                </div>
              );
            })}
          </PinContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralDashboard;
