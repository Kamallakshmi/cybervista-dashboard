import DashboardSection from "@/components/widgets/DashboardSection";
import DeviceDashboard from "./DeviceDashboard";
import EmailDashboard from "./EmailDashboard";
import GeneralDashboard from "./GeneralDashboard";
import MFADashboard from "./MfaDashboard";
import LoginFailureTable from "./LoginFailureTable";
import { WorldMapDemo } from "@/components/widgets/WorldMapDemo";
import { AuroraText } from "@/components/magicui/aurora-text";
import {
  MailCheck,
  MonitorSmartphone,
  ShieldCheck,
  ShieldAlert,
  LogIn,
} from "lucide-react";

const gradientIconStyle = {
  background: "linear-gradient(135deg, #ff1f6d, #9b2eff, #007cf0, #00f5d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const DashboardScreen = () => {
  return (
    <>
      <section className="py-8 px-4 max-w-7xl mx-auto grid grid-cols-1 items-center gap-10">
        <div className="flex flex-col space-y-4 items-center justify-center text-center md:text-left">
          <h2 className="flex items-center gap-2 text-balance text-center text-3xl font-semibold tracking-tight text-black md:text-5xl dark:text-neutral-300">
            <span>
              <ShieldCheck size={28} className="mt-1" stroke="url(#gradient)" />
              <svg width="0" height="0">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff1f6d" />
                    <stop offset="30%" stopColor="#9b2eff" />
                    <stop offset="60%" stopColor="#007cf0" />
                    <stop offset="100%" stopColor="#00f5d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span>
              <AuroraText className="">MFA</AuroraText> Usage
            </span>
          </h2>
          <p className="text-center text-base/6 text-gray-700 dark:text-gray-200">
            Breakdown of multi-factor authentication methods used across the
            system, including push notifications, phone calls, and text-based
            verifications.
          </p>
        </div>
        <div className="w-full p-4">
          <MFADashboard />
        </div>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto grid grid-cols-1 items-center gap-10">
        <div className="flex flex-col space-y-4 items-center justify-center text-center md:text-left">
          <h2 className="flex items-center gap-2 text-balance text-center text-3xl font-semibold tracking-tight text-black md:text-5xl dark:text-neutral-300">
            <span>
              <LogIn size={28} className="mt-1" stroke="url(#gradient)" />
              <svg width="0" height="0">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff1f6d" />
                    <stop offset="30%" stopColor="#9b2eff" />
                    <stop offset="60%" stopColor="#007cf0" />
                    <stop offset="100%" stopColor="#00f5d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span>
              <AuroraText className="">Login</AuroraText> Failures
            </span>
          </h2>
          <p className="text-center text-base/6 text-gray-700 dark:text-gray-200">
            Monthly breakdown of failed login attempts by device, showing
            user-specific trends from January to May.
          </p>
        </div>
        <div className="w-full p-4">
          <LoginFailureTable />
        </div>
      </section>

      <DashboardSection
        title="Email Threats"
        description="Visual breakdown of email threats, including spam, malware, and phishing attempts targeting systems."
        icon={MailCheck}
      >
        <EmailDashboard />
      </DashboardSection>
      <DashboardSection
        title="Malware Devices"
        description="Tracks the spread of malware across devices, including desktops, mobile phones, and servers, to help identify vulnerable endpoints and threat patterns."
        icon={MonitorSmartphone}
      >
        <DeviceDashboard />
      </DashboardSection>
      <DashboardSection
        title="General Overview"
        description="Summary of system-level security indicators, including missing patches, recent login activity, and blocked firewall events."
        icon={ShieldAlert}
      >
        <GeneralDashboard />
      </DashboardSection>

      <WorldMapDemo />
    </>
  );
};

export default DashboardScreen;
