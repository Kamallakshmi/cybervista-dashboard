import Loader from "@/components/widgets/Loader";
import { useFetcher } from "@/lib/api";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const COLORS = ["#FF6B6B", "#FFA07A", "#87CEEB"];

const CustomLegend = ({ payload }: { payload?: any }) => (
  <div className="flex justify-center gap-6 mt-4 text-sm">
    {payload.map((entry: any, index: number) => (
      <div key={index} className="flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-base/6 text-gray-700">{entry.value}</span>
      </div>
    ))}
  </div>
);

const EmailDashboard = () => {
  const {
    data: emailData,
    loading: emailLoading,
    error: emailError,
  } = useFetcher("/email");

  const transformThreatData = (
    data: Array<{ category: string; threat_count: number }>
  ) => {
    return data.map(({ category, threat_count }) => ({
      name: category[0].toUpperCase() + category.slice(1),
      value: threat_count,
    }));
  };

  const transformed = emailData && transformThreatData(emailData.message);

  return (
    <Card className="flex flex-col h-full shadow-md bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-300 dark:border-neutral-700">
      <CardHeader className="items-center">
        <CardTitle className="text-balance text-xl font-semibold text-black md:text-2xl dark:text-black">
          Email Threats
        </CardTitle>
        <CardDescription className="text-base/6 text-gray-700 dark:text-gray-700">
          Real-time data from SQL
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {emailLoading && <Loader />}
        {!emailLoading && !emailError && transformed && (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={transformed}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                label
              >
                {transformed.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) =>
                  active && payload && payload.length ? (
                    <div className="rounded-md border bg-white px-3 py-2 shadow text-base/6 text-gray-700">
                      <p>
                        {payload[0].name}: {payload[0].value}
                      </p>
                    </div>
                  ) : null
                }
              />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailDashboard;
