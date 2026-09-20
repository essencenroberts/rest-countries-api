import { useTheme } from "../hooks/useTheme";

//the existing theme.ts will turn into a Recat button to toggle the light dark mode - import custom hook useTheme

//

// ThemeToggle component
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme(); //run useTheme and get what it retrins isDark and toggleTheme

  return(
    <button
      id="theme"
      type="button"
      onClick={toggleTheme}
      className="rounded-md px-4 py-2 font-semibold"
    >
      {isDark ? "Light" : "Dark" }
    </button>
  );

}

export default ThemeToggle;