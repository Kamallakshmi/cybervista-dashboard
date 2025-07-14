"use client";

import ThemeToggle from "@/components/widgets/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FlipWords } from "../ui/flip-words";
import { useLocation } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  // const isOnDashboard = location.pathname === "/dashboard";
  // const isOnPageView = location.pathname === "/";

  // const navigate = useNavigate();

  return (
    <header className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* 🚀 Text Logo */}
        <div className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Cyber
          <FlipWords words={["Vista", "View"]} />
        </div>

        {/* 🌙 Theme + Avatar */}
        <div className="flex items-center gap-4">
          {/* {isOnDashboard && (
            <button
              onClick={() => navigate("/")}
              className="rounded-md bg-transparent px-3 py-1.5 text-sm font-medium text-[#2B7FFF] hover:underline"
            >
              Page View
            </button>
          )} */}

          <ThemeToggle />
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/108535067?v=4"
              alt="Kamal"
            />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default MyNavbar;
