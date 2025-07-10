import Loader from "@/components/widgets/Loader";
import { useFetcher } from "@/lib/api";
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";
import { Monitor, ServerIcon, Smartphone } from "lucide-react";

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
      threat_count: threat_count,
    }));
  };
  const transformed = generalData && transformGeneralData(generalData.message);

  console.log(transformed);
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800">General Insights</h2>
      {generalLoading && <Loader />}
      {!generalLoading && !generalError && transformed && (
        <div className="flex md:flex-row justify-center items-center flex-col gap-4 scrollbar-hide px-1">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {transformed?.map((item: any, idx: any) => {
            return (
              <div
                key={idx}
                className={cn("transition-transform duration-300 inline-block")}
              >
                <Card
                  className={cn(`rounded-xl bg-gradient-to-b shadow-sm`, {
                    "from-blue-100 to-white":
                      item.category === "missing patches",
                    "from-orange-100 to-white":
                      item.category === "login 30 days",
                    "from-purple-100 to-white":
                      item.category === "firewall blocks",
                  })}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-2 mt-4">
                    {item.category === "missing patches" && (
                      <Monitor className="w-8 h-8 text-blue-600" />
                    )}
                    {item.category === "login 30 days" && (
                      <Smartphone className="w-8 h-8 text-orange-600" />
                    )}
                    {item.category === "firewall blocks" && (
                      <ServerIcon className="w-8 h-8 text-purple-600" />
                    )}
                    <span className="text-sm capitalize font-medium">
                      {item.category}
                    </span>
                    <span
                      className={cn(`text-xl font-bold`, {
                        "text-blue-600": item.category === "missing patches",
                        "text-orange-600": item.category === "login 30 days",
                        "text-purple-600": item.category === "firewall blocks",
                      })}
                    >
                      {item.threat_count}
                    </span>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GeneralDashboard;
