"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "@/components/ThemeProvider";
import * as React from "react";
import BlogList from "@/components/BlogList";
import { blogs } from "./blogs/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Home({ params }) {
  const headerRef = useRef(null);
  const postsRef = useRef(null);
  const footerRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const closingTimeout = React.useRef();
  const githubButtonRef = useRef(null);

  // Determine icon color based on theme
  let githubIconColor = "#334155"; // slate-700 default
  if (theme === "dark") githubIconColor = "#60a5fa"; // blue-400
  if (theme === "retro") githubIconColor = "#F79B72"; // retroaccent

  // Animate dropdown in
  React.useEffect(() => {
    if (themeMenuOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [themeMenuOpen]);

  // Animate dropdown out and close after animation
  const handleThemeSelect = (selectedTheme) => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setTheme(selectedTheme);
          setThemeMenuOpen(false);
        },
      });
    } else {
      setTheme(selectedTheme);
      setThemeMenuOpen(false);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
    gsap.fromTo(
      postsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
    );
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
    );
    if (githubButtonRef.current) {
      gsap.fromTo(
        githubButtonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.3 }
      );
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-retrobg text-retrotext flex flex-col font-retro overflow-hidden scrollbar-hide relative font-bolder">
      {/* Theme Selector Button (top right) */}
      <div className="absolute top-6 right-8 z-50">
        <button
          onClick={() => setThemeMenuOpen((open) => !open)}
          className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
            Theme
          </span>
        </button>
        {themeMenuOpen && (
          <div ref={dropdownRef} className="w-32 flex flex-col items-end mt-1">
            <button
              onClick={() => handleThemeSelect('light')}
              style={{ background: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif', opacity: theme === 'light' ? 1 : 0.5, fontWeight: theme === 'light' ? 'bold' : 'normal', border: 'none' }}
              className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none mb-1"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
                Light
              </span>
            </button>
            <button
              onClick={() => handleThemeSelect('retro')}
              style={{ background: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif', opacity: theme === 'retro' ? 1 : 0.5, fontWeight: theme === 'retro' ? 'bold' : 'normal', border: 'none' }}
              className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none mb-1"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
                Retro
              </span>
            </button>
            <button
              onClick={() => handleThemeSelect('dark')}
              style={{ background: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif', opacity: theme === 'dark' ? 1 : 0.5, fontWeight: theme === 'dark' ? 'bold' : 'normal', border: 'none' }}
              className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-none"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
                Dark
              </span>
            </button>
          </div>
        )}
      </div>
      {/* GitHub button bottom right */}
      <div ref={githubButtonRef} className="fixed bottom-6 right-8 z-50">
        <Link href="https://github.com/Hyperion147/blog" target="_blank" rel="noopener noreferrer">
          <button
            className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
              <Github size={18} color={githubIconColor} />
              GitHub
            </span>
          </button>
        </Link>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        <section ref={headerRef} className="w-full max-w-3xl text-center mb-12">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-retrotext drop-shadow-sm">
              <span className="text-retroaccent">blog</span> | <span className="text-retroblue">hyper</span>
            </h1>
          </div>
        </section>
        <section ref={postsRef} className="w-full max-w-4xl mb-10">
          <BlogList blogs={blogs} />
        </section>
      </main>
      <footer ref={footerRef} className="w-full py-6 border-t border-retroborder text-center text-retrotext/60 text-base flex items-center justify-center bg-retrobg font-mono">
        <span className="w-full">© {new Date().getFullYear()} blog | hyper. All rights reserved.</span>
      </footer>
    </div>
  );
}
