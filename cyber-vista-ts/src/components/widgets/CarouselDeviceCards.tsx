"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Monitor, Smartphone, Server } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

type MalwareDataType = {
  id: number;
  category: string;
  threat_count: number;
};

export default function CarouselDeviceCards({
  malwareData,
}: {
  malwareData: MalwareDataType[];
}) {
  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full overflow-hidden"
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <CarouselContent className="flex justify-center gap-4 px-1 mt-8 items-center">
        {malwareData?.map((device, index) => (
          <CarouselItem
            key={index}
            className="min-w-[80%] sm:min-w-[30%] transition-transform"
          >
            <Card
              className={cn(`rounded-xl bg-gradient-to-b shadow-sm`, {
                "from-blue-100 to-white": device.category === "pc",
                "from-green-100 to-white": device.category === "mobile",
                "from-purple-100 to-white": device.category === "server",
              })}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-2 mt-4">
                {device.category === "pc" && (
                  <Monitor className="w-8 h-8 text-blue-600" />
                )}
                {device.category === "mobile" && (
                  <Smartphone className="w-8 h-8 text-green-600" />
                )}
                {device.category === "server" && (
                  <Server className="w-8 h-8 text-purple-600" />
                )}
                <span className="text-sm font-medium">{device.category}</span>
                <span
                  className={cn(`text-xl font-bold`, {
                    "text-blue-600": device.category === "pc",
                    "text-green-600": device.category === "mobile",
                    "text-purple-600": device.category === "server",
                  })}
                >
                  {device.threat_count}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
