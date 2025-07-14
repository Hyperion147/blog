"use client"
import { notFound } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { blogs } from "../blogData";
import { useTheme } from "@/components/ThemeProvider";

export default function BlogPage({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const themeButtonRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
    }
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
      );
    }
    if (themeButtonRef.current) {
      gsap.fromTo(
        themeButtonRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (themeMenuOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [themeMenuOpen]);

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

  if (!blog) return notFound();
  return (
    <>
      {/* Blogs button top left */}
      <div ref={buttonRef} className="absolute top-6 left-8 z-50">
        <Link href="/">
          <button
            className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
              Blogs
            </span>
          </button>
        </Link>
      </div>
      {/* Theme selector button top right */}
      <div ref={themeButtonRef} className="absolute top-6 right-8 z-50">
        <button
          onClick={() => setThemeMenuOpen((open) => !open)}
          className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
            Theme
          </span>
        </button>
        {themeMenuOpen && (
          <div ref={dropdownRef} className="w-32 flex flex-col items-end mt-1">
            {['light', 'retro', 'dark'].map((t) => (
              <button
                key={t}
                onClick={() => handleThemeSelect(t)}
                style={{
                  background: 'none',
                  color: 'inherit',
                  fontFamily: 'Roboto, sans-serif',
                  opacity: theme === t ? 1 : 0.5,
                  fontWeight: theme === t ? 'bold' : 'normal',
                  border: 'none',
                }}
                className="relative inline-flex h-8 w-32 overflow-hidden rounded-full p-[1px] focus:outline-none mb-1"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-4 py-1 text-sm font-medium text-retrotext backdrop-blur-3xl">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div ref={containerRef} className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-extrabold mb-2 text-retroaccent">{blog.title}</h1>
        <div className="flex gap-2 mb-4">
          {blog.tags.map((tag, i) => (
            <span key={i} className="bg-retroaccent/10 text-retroaccent px-2 py-0.5 rounded text-xs font-mono border border-retroborder">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-retroblue font-mono mb-6">{blog.date}</div>
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </>
  );
} 