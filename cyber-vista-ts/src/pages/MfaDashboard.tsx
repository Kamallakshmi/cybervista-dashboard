"use client";

import { useFetcher } from "@/lib/api";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type CustomTooltipProps,
} from "../components/ui/chart";
import { generateMfaHistory } from "../lib/utils";
import Loader from "@/components/widgets/Loader";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <Card className="pt-0 mx-6">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b py-5">
        <div className="grid gap-1">
          <CardTitle>Users with MFA</CardTitle>
          <CardDescription>{25} Users Enabled MFA</CardDescription>
        </div>

        <select
          className="border rounded-md px-2 py-1 text-sm bg-white text-gray-700 shadow-sm"
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
                  <stop offset="5%" stopColor="yellow" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="yellow" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillPhone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="lime" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="lime" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillText" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="red" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#d1d5db" // Tailwind gray-300 (or any lighter gray you want)
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={20}
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
                // content={ChartTooltipContent({
                //   labelFormatter: (value) =>
                //     new Date(value).toLocaleDateString("en-US", {
                //       month: "short",
                //       day: "numeric",
                //     }),
                //   indicator: "dot",
                // })}
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
              {/* <ChartLegend content={<ChartLegendContent />} /> */}
            </AreaChart>
          </ChartContainer>
          <div className="mt-4 flex justify-center gap-4 text-sm">
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
