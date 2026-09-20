import { useState, useEffect } from "react";

export function useTheme() {

  // create color state
  const [isDark, setIsDark] = useState(false);
  // () => {
  //   const saved = localStorage.getItem("theme");

  //   if (saved) return saved === "dark";

    // useEffect for when isDark changes -- take what's inside the applyTheme function 
    useEffect(() => {
      document.documentElement.classList.toggle("dark", isDark);
      // localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    // toggleTheme between light and dark
    function toggleTheme() {
      setIsDark((previous) => !previous);
    }
    return { isDark, toggleTheme };
}