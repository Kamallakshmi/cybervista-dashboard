import CarouselDeviceCards from "@/components/widgets/CarouselDeviceCards";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "../components/ui/card";
import { useFetcher } from "@/lib/api";
import Loader from "@/components/widgets/Loader";

const COLORS = ["#FF6B6B", "#FFA07A", "#87CEEB"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: { name: string; value: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-white px-3 py-2 shadow-sm text-sm text-gray-700">
        <p>
          {payload[0].name}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLegend = ({ payload }: { payload?: any }) => (
  <div className="flex justify-center gap-6 mt-4 text-sm">
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    {payload.map((entry: any, index: number) => (
      <div key={index} className="flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-gray-600">{entry.value}</span>
      </div>
    ))}
  </div>
);

type EmailDashboardDataType = {
  id: number;
  name: string;
  value: number;
};

const EmailDashboard = () => {
  const {
    data: malwareData,
    loading: malwareLoading,
    error: malwareError,
  } = useFetcher("/malware");
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
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 p-6">
      {/* ✅ Email Threats Pie Chart */}
      <Card className="shadow-sm">
        <CardContent>
          <h2 className="text-lg font-semibold mt-4">Email</h2>
          {emailLoading && <Loader />}
          {!emailLoading && !emailError && transformed && (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={transformed}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey={"value"}
                  label
                >
                  {transformed.map((_: EmailDashboardDataType, idx: number) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={
                    <CustomTooltip active={true} payload={transformed} />
                  }
                />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* ✅ Devices List (unchanged) */}
      <Card className="shadow-sm">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4 mt-4">Devices Used</h2>
          {malwareLoading && <Loader />}
          {!malwareLoading && !malwareError && malwareData && transformed && (
            <CarouselDeviceCards malwareData={malwareData.message} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailDashboard;
