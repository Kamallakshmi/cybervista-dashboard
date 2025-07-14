import React from "react";

const Footer = () => {
  return (
    <footer className="relative mt-auto text-sm text-white py-4 text-center bg-black dark:bg-zinc-900 transition-colors overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[0.75px] bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500" />
      © 2025 - Cyber Vista | Built with ❤️ by Kamal Ramesh
    </footer>
  );
};

export default Footer;
