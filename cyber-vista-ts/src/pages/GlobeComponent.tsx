/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetcher } from "@/lib/api";
import { motion } from "motion/react";
import { World } from "../components/ui/globe";
import Loader from "../components/widgets/Loader";

const GlobeComponent = () => {
  const {
    data: attackData,
    loading: attackLoading,
    error: attackError,
  } = useFetcher("/attacks-by-country");

  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#3b82f6", "#ff0000", "#ff0000"];

  // Manual mapping of country to coordinates
  const countryCoords: Record<string, { lat: number; lng: number }> = {
    china: { lat: 35.8617, lng: 104.1954 },
    russia: { lat: 61.524, lng: 105.3188 },
    india: { lat: 20.5937, lng: 78.9629 },
    germany: { lat: 51.1657, lng: 10.4515 },
    pakistan: { lat: 30.3753, lng: 69.3451 },
  };

  // ✅ Dynamically get country list from backend
  const dynamicCountryList =
    attackData?.message?.map((item: any) => item.country.toLowerCase()) || [];

  // ✅ Generate arcs: country[i] → country[i+1] (last loops to first)
  const attackArcs = dynamicCountryList.flatMap((fromCountry, i) => {
    const fromCoords = countryCoords[fromCountry];
    if (!fromCoords) return [];

    return dynamicCountryList
      .filter((toCountry) => toCountry !== fromCountry)
      .map((toCountry, j) => {
        const toCoords = countryCoords[toCountry];
        if (!toCoords) return null;

        return {
          order: i * 10 + j,
          startLat: fromCoords.lat,
          startLng: fromCoords.lng,
          endLat: toCoords.lat,
          endLng: toCoords.lng,
          arcAlt: 0.3,
          color: colors[(i + j) % colors.length],
        };
      })
      .filter(Boolean);
  });

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            We sell soap worldwide
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            This globe is interactive and customizable. Have fun with it, and
            don&apos;t forget to share it.
          </p>
        </motion.div>

        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />

        {attackLoading && <Loader />}

        {!attackLoading && !attackError && attackData && (
          <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
            <World data={attackArcs} globeConfig={globeConfig} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobeComponent;
