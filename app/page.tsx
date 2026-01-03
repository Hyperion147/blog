"use client";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const headerRef = useRef(null);
  const postsRef = useRef(null);
  const footerRef = useRef(null);

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
  }, []);

  // BlogPreview component for consistent styling
  interface BlogPreviewProps {
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
    href: string;
  }

  function BlogPreview({ title, date, tags, excerpt, href }: BlogPreviewProps) {
    return (
      <Link
        href={href}
        className="w-full max-w-xl sm:max-w-lg md:max-w-xl rounded-md border p-4 sm:p-6 md:p-7 transition-shadow duration-300 group cursor-pointer block no-underline hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.2),_15px_15px_rgba(0,_98,_90,_0.05)] dark:hover:shadow-[5px_5px_rgba(60,_120,_255,_0.4),_10px_10px_rgba(60,_120,_255,_0.2),_15px_15px_rgba(60,_120,_255,_0.05)] theme-retro:hover:shadow-[5px_5px_rgba(247,_155,_114,_0.4),_10px_10px_rgba(247,_155,_114,_0.2),_15px_15px_rgba(247,_155,_114,_0.05)] backdrop-blur-lg"
      >
        <h2 className="text-xl sm:text-2xl font-extrabold text-retroaccent mb-2">
          {title}
        </h2>
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-retroaccent/10 text-retroaccent px-2 rounded-md text-xs sm:text-sm font-mono border border-retroaccent"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-xs sm:text-sm text-retroblue font-mono mb-3">
          {date}
        </div>
        <div className="text-retrotext/80 text-sm sm:text-base mb-2 line-clamp-3">
          {excerpt}
        </div>
      </Link>
    );
  }

  return (
    <div className="relative min-h-screen w-full text-retrotext flex flex-col font-retro overflow-hidden scrollbar-hide font-bolder">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:70px_70px] opacity-10",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_10px)]"
        )}
      />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white 
      [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-slate-300"
      ></div>

      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 w-full pt-6 md:pt-0">
        <section
          ref={headerRef}
          className="w-full max-w-3xl text-center mb-4 md:mb-8 px-2 sm:px-0"
        >
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-retrotext drop-shadow-sm">
              <span className="text-retroaccent">blog</span> |{" "}
              <span className="text-retroblue">suryansu</span>
            </h1>
          </div>
        </section>
        <section
          ref={postsRef}
          className="w-full max-w-4xl mb-8 sm:mb-10 px-1 sm:px-0"
        >
          <div className="flex flex-col items-center gap-6">
            <BlogPreview
              title="Smartphone era v/s AI era"
              date="July 2025"
              tags={["AI", "Technology", "Trends"]}
              excerpt="Remember when smartphones first took over? One day you were flipping a Nokia brick, and the next, you’re arguing with Siri about the weather. Now, AI’s doing the same—whispering sweet nothings like: “Here’s a poem about your cat in the style of Shakespeare”—and we’re all just along for the ride."
              href="/blogs/smartphone-vs-ai-era"
            />
          </div>
        </section>
      </main>
      <footer
        ref={footerRef}
        className="w-full py-6 border-t border-gray-300 text-center text-retrotext/60 text-base flex items-center justify-center font-mono"
      >
        <span className="w-full">
          © {new Date().getFullYear()} blog | suryansu. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
