import { useRef, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : e.clientX;
    const y = rect ? rect.top + rect.height / 2 : e.clientY;
    toggleTheme({ x, y });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      title={isDark ? "Tema terang" : "Tema gelap"}
      className="theme-toggle-btn"
    >
      <span className={`theme-toggle-icon ${isDark ? "is-dark" : "is-light"}`}>
        <Sun className="theme-toggle-sun" size={16} strokeWidth={2} />
        <Moon className="theme-toggle-moon" size={16} strokeWidth={2} />
      </span>
    </button>
  );
};

export default ThemeToggle;
