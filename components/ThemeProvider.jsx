"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("retro");

  // On mount, check for theme cookie
  useEffect(() => {
    const cookieTheme = getCookie("theme");
    if (cookieTheme) setTheme(cookieTheme);
  }, []);

  // Update theme class and cookie on change
  useEffect(() => {
    document.documentElement.classList.remove("theme-light", "theme-dark", "theme-retro");
    document.documentElement.classList.add(`theme-${theme}`);
    setCookie("theme", theme, 1); // 1 day
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 