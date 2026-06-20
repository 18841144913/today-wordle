import { useEffect, useState } from "react";
import { loadTheme, saveTheme, type ThemePref } from "../repositories/storageRepository";

export function useTheme() {
  // Deterministic initial render for hydration: always start "light" on the
  // server and first client paint, then restore the saved/system preference
  // after mount. The theme is applied to the game container only (see App),
  // so it never affects the rest of the site.
  const [theme, setTheme] = useState<ThemePref>("light");

  useEffect(() => {
    const saved = loadTheme();
    if (saved) {
      setTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    if (prefersDark) setTheme("dark");
  }, []);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}
