"use client";

import { useFetcher } from "@/lib/api";
import Loader from "@/components/widgets/Loader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { RadialBarChart, RadialBar, PolarGrid } from "recharts";
import { TrendingUp } from "lucide-react";

const DeviceDashboard = () => {
  const {
    data: malwareData,
    loading: malwareLoading,
    error: malwareError,
  } = useFetcher("/malware");

  const transformThreatData = (
    data: Array<{ category: string; threat_count: number }>
  ) => {
    return data.map(({ category, threat_count }) => ({
      name: category[0].toUpperCase() + category.slice(1),
      visitors: threat_count,
      fill: getColor(category.toLowerCase()),
    }));
  };

  const getColor = (category: string) => {
    switch (category) {
      case "pc":
        return "#4ade80"; // green
      case "mobile":
        return "#60a5fa"; // blue
      case "server":
        return "#f87171"; // red
      default:
        return "#d1d5db"; // gray
    }
  };

  const chartConfig = {
    visitors: {
      label: "Count",
    },
  };

  const transformed = malwareData && transformThreatData(malwareData.message);

  return (
    <Card className="flex flex-col h-full shadow-md bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-300 dark:border-neutral-700">
      <CardHeader className="items-center">
        <CardTitle className="text-balance text-xl font-semibold text-black md:text-2xl dark:text-black">
          Malware Devices
        </CardTitle>
        <CardDescription className="text-base/6 text-gray-700 dark:text-gray-700">
          Real-time data from SQL
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {malwareLoading && <Loader />}
        {!malwareLoading && !malwareError && transformed && (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={transformed}
              innerRadius={30}
              outerRadius={100}
              startAngle={90}
              endAngle={-270} // clockwise
            >
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) =>
                  active && payload && payload.length ? (
                    <div
                      className="rounded-md border px-3 py-2 shadow-sm text-sm text-white"
                      style={{
                        backgroundColor: payload[0].payload.fill || "#000",
                      }}
                    >
                      <p className="font-medium">
                        {payload[0].payload.name}: {payload[0].payload.visitors}
                      </p>
                    </div>
                  ) : null
                }
              />
              <PolarGrid gridType="circle" />

              <RadialBar
                dataKey="visitors"
                background
                fill="#E5E7EB"
                isAnimationActive={true}
                animationDuration={2000}
                animationEasing="ease-out"
              />
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 text-center text-base/6 dark:text-black font-medium text-black">
          Mobile threats lead in volume <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center text-base/6 text-gray-700">
          Based on live device threat data
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeviceDashboard;
