"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "@/components/ThemeProvider";
import * as React from "react";
import Link from "next/link";
import { Github, Sun, Moon } from "lucide-react";
// Import preview content from the blog page
import SmartphoneBlog from "./blogs/smartphone-vs-ai-era/page";

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

  // BlogPreview component for consistent styling
  function BlogPreview({ title, date, tags, excerpt, href }) {
    return (
      <Link
        href={href}
        className="w-full max-w-xl sm:max-w-lg md:max-w-xl rounded-2xl border border-retroborder bg-retrobg/90 p-4 sm:p-6 md:p-7 transition-shadow duration-300 group cursor-pointer block no-underline hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.2),_15px_15px_rgba(0,_98,_90,_0.05)] dark:hover:shadow-[5px_5px_rgba(60,_120,_255,_0.4),_10px_10px_rgba(60,_120,_255,_0.2),_15px_15px_rgba(60,_120,_255,_0.05)] theme-retro:hover:shadow-[5px_5px_rgba(247,_155,_114,_0.4),_10px_10px_rgba(247,_155,_114,_0.2),_15px_15px_rgba(247,_155,_114,_0.05)]"
      >
        <h2 className="text-xl sm:text-2xl font-extrabold text-retroaccent mb-2">{title}</h2>
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map((tag, i) => (
            <span key={i} className="bg-retroaccent/10 text-retroaccent px-2 py-0.5 rounded text-xs sm:text-sm font-mono border border-retroborder">{tag}</span>
          ))}
        </div>
        <div className="text-xs sm:text-sm text-retroblue font-mono mb-3">{date}</div>
        <div className="text-retrotext/80 text-sm sm:text-base mb-2 line-clamp-3">{excerpt}</div>
      </Link>
    );
  }

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
            <span className="block md:hidden">{theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}</span>
            <span className="hidden md:block">Theme</span>
          </span>
        </button>
        {themeMenuOpen && (
          <div ref={dropdownRef} className="w-32 flex flex-col items-end mt-1">
            <button
              onClick={() => handleThemeSelect('light')}
              style={{ background: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif', opacity: theme === 'light' ? 1 : 0.5, fontWeight: theme === 'light' ? 'bold' : 'normal', border: 'none' }}
              className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none mb-1"
            >
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
                Light
              </span>
            </button>
            <button
              onClick={() => handleThemeSelect('retro')}
              style={{ background: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif', opacity: theme === 'retro' ? 1 : 0.5, fontWeight: theme === 'retro' ? 'bold' : 'normal', border: 'none' }}
              className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none mb-1"
            >
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
                Retro
              </span>
            </button>
            <button
              onClick={() => handleThemeSelect('dark')}
              style={{ background: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif', opacity: theme === 'dark' ? 1 : 0.5, fontWeight: theme === 'dark' ? 'bold' : 'normal' }}
              className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none hover:border-slate-300"
            >
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
            className="relative inline-flex h-8 w-24 overflow-hidden rounded-full p-[1px] focus:outline-none"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#f1f1ff_50%,#000000_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
              <Github size={18} color={githubIconColor} />
              Star
            </span>
          </button>
        </Link>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 w-full pt-6 md:pt-0">
        <section ref={headerRef} className="w-full max-w-3xl text-center mb-4 md:mb-8 px-2 sm:px-0">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-retrotext drop-shadow-sm">
              <span className="text-retroaccent">blog</span> | <span className="text-retroblue">hyper</span>
            </h1>
          </div>
        </section>
        <section ref={postsRef} className="w-full max-w-4xl mb-8 sm:mb-10 px-1 sm:px-0">
          <div className="flex flex-col items-center gap-6">
            <BlogPreview
              title="Smartphone era v/s AI era"
              date="July 2025"
              tags={['AI', 'Technology', 'Trends']}
              excerpt="Remember when smartphones first took over? One day you were flipping a Nokia brick, and the next, you’re arguing with Siri about the weather. Now, AI’s doing the same—whispering sweet nothings like: “Here’s a poem about your cat in the style of Shakespeare”—and we’re all just along for the ride."
              href="/blogs/smartphone-vs-ai-era"
            />
          </div>
        </section>
      </main>
      <footer ref={footerRef} className="w-full py-6 border-t border-retroborder text-center text-retrotext/60 text-base flex items-center justify-center bg-retrobg font-mono">
        <span className="w-full">© {new Date().getFullYear()} blog | hyper. All rights reserved.</span>
      </footer>
    </div>
  );
}
