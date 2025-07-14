"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import MFADashboard from "./MfaDashboard";
import LoginFailureTable from "./LoginFailureTable";
import EmailDashboard from "./EmailDashboard";
import DeviceDashboard from "./DeviceDashboard";
import GeneralDashboard from "./GeneralDashboard";
import { useLocation, Link } from "react-router-dom";
export function SidebarLayout() {
  const location = useLocation();
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler
          className={cn(
            "h-5 w-5 shrink-0",
            location.pathname === "/dashboard"
              ? "text-blue-500"
              : "text-neutral-700 dark:text-neutral-200"
          )}
        />
      ),
    },
    {
      label: "Home",
      href: "/",
      element: (
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md  py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
          <span className="text-neutral-700 dark:text-neutral-200">Home</span>
        </Link>
      ),
    },
    {
      label: "Settings",
      href: "#",
      element: (
        <Link
          to="#"
          className="flex items-center gap-2 rounded-md  py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
          <span className="text-neutral-700 dark:text-neutral-200">
            Settings
          </span>
        </Link>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "min-h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) =>
                link.element ? (
                  <React.Fragment key={idx}>{link.element}</React.Fragment>
                ) : (
                  <SidebarLink key={idx} link={link} />
                )
              )}
            </div>
          </div>
          <div></div>
        </SidebarBody>
      </Sidebar>

      <Dashboard />
    </div>
  );
}
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-1">
            <EmailDashboard />
          </div>
          <div className="md:col-span-2">
            <MFADashboard />
          </div>
          <div className="md:col-span-1">
            <LoginFailureTable showTable={false} />
          </div>
          <div className="md:col-span-1">
            <DeviceDashboard />
          </div>
          <div className="md:col-span-1 flex flex-col gap-3 w-full">
            <GeneralDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};
