

const THEME = "theme";
const themeToggleButton = document.getElementById("theme")!;

// apply theme choice
function applyTheme(isDark: boolean): void {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(THEME, isDark ? "dark" : "light");
}

// add event LIstender
themeToggleButton.addEventListener("click", () => {
  const isCurrentlyDark = document.documentElement.classList.contains("dark");
    applyTheme(!isCurrentlyDark);
});