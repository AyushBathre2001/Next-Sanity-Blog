"use client";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 z-50 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"} p-4 shadow-lg transition-all duration-100 hover:scale-110 hover:shadow-xl`}
      aria-label="Toggle theme">
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-black" />
      ) : (
        <MoonIcon className="h-6 w-6 text-white" />
      )}
    </button>
  );
};

export default ThemeSwitch;
