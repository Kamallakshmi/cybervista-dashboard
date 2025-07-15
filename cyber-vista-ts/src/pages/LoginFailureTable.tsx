"use client";

import { useFetcher } from "@/lib/api";
import { useState, useEffect, useRef } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "@/components/widgets/Loader";
import { ShieldAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation } from "react-router-dom";

type LoginType = {
  user: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
};

type Props = {
  showTable?: boolean;
};

const LoginFailureTable = ({ showTable = true }: Props) => {
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
  } = useFetcher("/user-fail-login");

  const [highlightUser, setHighlightUser] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setHighlightUser(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loginLoading) return <Loader />;
  if (loginError || !loginData?.message) return <div>Error loading data</div>;

  const rawData = loginData.message;
  const months = ["jan", "feb", "mar", "apr", "may"];

  const chartData = months.map((month) => {
    const entry: any = {
      month: month.charAt(0).toUpperCase() + month.slice(1),
    };
    rawData.forEach((user) => {
      entry[user.user] = user[month];
    });
    return entry;
  });

  const colors = ["#ff6b6b", "#4dabf7", "#38d9a9", "#f59f00"];

  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <Card className="flex flex-col h-full shadow-md bg-gray-50 dark:bg-gray-50 rounded-xl p-4 border border-gray-300 dark:border-neutral-700">
      <CardHeader className="relative pb-4">
        <ShieldAlert className="absolute top-4 right-4 w-6 h-6 text-red-500 dark:text-red-400" />
        <div>
          <CardTitle className="mt-3 text-balance text-xl font-semibold tracking-tight text-black md:text-2xl dark:text-black">
            Login Failures
          </CardTitle>
          <CardDescription className="mt-1.5 text-base/6 text-gray-700 dark:text-gray-700">
            Real-time data from SQL
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent
        ref={wrapperRef}
        className={`grid ${
          isDashboardPage
            ? "grid-cols-1 place-items-center"
            : "grid-cols-1 lg:grid-cols-2 items-start gap-6 lg:gap-0"
        } min-h-[22rem] px-6`}
      >
        {showTable && (
          <div className="overflow-auto text-sm rounded-lg shadow-md border border-gray-200 dark:border-gray-300">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white ">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900">
                <tr className="text-left text-gray-700 dark:text-gray-200 uppercase text-xs tracking-wide">
                  <th className="px-4 py-6">Username</th>
                  <th className="px-4 py-5">Jan</th>
                  <th className="px-4 py-5">Feb</th>
                  <th className="px-4 py-5">Mar</th>
                  <th className="px-4 py-5">Apr</th>
                  <th className="px-4 py-5">May</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-white">
                {rawData.map((entry, idx) => (
                  <tr
                    key={idx}
                    className={`border-b transition duration-150 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-100 ${
                      highlightUser === entry.user
                        ? "bg-blue-100 dark:bg-gray-300 font-semibold"
                        : ""
                    }`}
                    onClick={() =>
                      setHighlightUser(
                        highlightUser === entry.user ? null : entry.user
                      )
                    }
                  >
                    <td className="px-4 py-3 text-blue-600 font-medium">
                      {entry.user}
                    </td>
                    <td className="px-4 py-4 dark:text-black">{entry.jan}</td>
                    <td className="px-4 py-4 dark:text-black">{entry.feb}</td>
                    <td className="px-4 py-4 dark:text-black">{entry.mar}</td>
                    <td className="px-4 py-4 dark:text-black">{entry.apr}</td>
                    <td className="px-4 py-4 dark:text-black">{entry.may}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="w-full flex justify-center items-center">
          <div className="w-[280px] h-[280px] bg-white dark:from-zinc-200  dark:border-gray-300 shadow-md rounded-lg p-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid radialLines={false} />
                <PolarAngleAxis
                  dataKey="month"
                  tick={{ fill: "#000", fontSize: 12, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                />
                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload ? (
                      <div className="bg-white p-2 rounded shadow text-xs text-gray-600">
                        <p className="font-semibold">{label}</p>
                        {payload.map((entry, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: entry.color,
                                display: "inline-block",
                              }}
                            />
                            {entry.name}: {entry.value}
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
                />
                {rawData.map((user, index) => (
                  <Radar
                    key={user.user}
                    name={user.user}
                    dataKey={user.user}
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                    fillOpacity={
                      highlightUser && highlightUser !== user.user ? 0.05 : 0.4
                    }
                    strokeWidth={highlightUser === user.user ? 2 : 1}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginFailureTable;
