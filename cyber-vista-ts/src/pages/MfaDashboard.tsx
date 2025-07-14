"use client";

import Loader from "@/components/widgets/Loader";
import Typewriterwidget from "@/components/widgets/TypeWriterwidget";
import { useFetcher } from "@/lib/api";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type CustomTooltipProps,
} from "../components/ui/chart";
import { generateMfaHistory } from "../lib/utils";

const chartConfig = {
  "Push Notifications": {
    label: "Push Notifications",
    color: "var(--chart-1)",
  },
  Phone: { label: "Phone", color: "var(--chart-2)" },
  Text: { label: "Text", color: "var(--chart-3)" },
};

type MFADataType = {
  phone: number;
  push: number;
  text: number;
};

const MFADashboard = () => {
  const {
    data: mfaData,
    loading: mfaLoading,
    error: mfaError,
  } = useFetcher("/users-mfa");

  const [range, setRange] = useState("90");
  const days = parseInt(range);

  const transformMFAData: MFADataType =
    !mfaLoading &&
    !mfaError &&
    mfaData &&
    mfaData?.message?.reduce((acc: any, item: any) => {
      acc[item.category] = item.threat_count;
      return acc;
    }, {});

  console.log(transformMFAData);
  const dynamicData = generateMfaHistory(transformMFAData, days);

  const formattedData = dynamicData.map((d) => ({
    date: d.date,
    "Push Notifications": d.push,
    Phone: d.phone,
    Text: d.text,
  }));

  return (
    <Card className="flex flex-col h-full shadow-md bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-300 dark:border-neutral-700">
      <CardHeader className="flex flex-col items-center justify-between gap-1 border-b py-5">
        <div className="grid gap-1">
          <Typewriterwidget />
        </div>

        <select
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-gradient-to-r from-white to-gray-100 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-150"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="90">Last 3 Months</option>
          <option value="30">Last 30 Days</option>
          <option value="7">Last 7 Days</option>
        </select>
      </CardHeader>
      {mfaLoading && <Loader />}
      {!mfaLoading && (
        <CardContent className="px-2 pt-6 sm:px-6 sm:pt-6 mt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={formattedData}>
              <defs>
                <linearGradient id="fillPush" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="yellow" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="yellow" stopOpacity={0.8} />
                </linearGradient>

                <linearGradient id="fillPhone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="lime" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="lime" stopOpacity={0.8} />
                </linearGradient>

                <linearGradient id="fillText" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="red" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="red" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#d1d5db"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={20}
                tick={{
                  fill: "#4B5563",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />

              <ChartTooltip
                cursor={false}
                content={(props: CustomTooltipProps) => (
                  <ChartTooltipContent {...props} hideIndicator hideLabel />
                )}
              />

              <Area
                dataKey="Push Notifications"
                type="monotone"
                fill="url(#fillPush)"
                stroke="yellow"
                stackId="a"
              />
              <Area
                dataKey="Phone"
                type="monotone"
                fill="url(#fillPhone)"
                stroke="lime"
                stackId="a"
              />
              <Area
                dataKey="Text"
                type="monotone"
                fill="url(#fillText)"
                stroke="red"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
          <div className="mt-4 flex justify-center gap-4 text-sm dark:text-black">
            <div className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "yellow" }}
              />
              <span>Push Notifications</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "lime" }}
              />
              <span>Phone</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "red" }}
              />
              <span>Text</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default MFADashboard;
