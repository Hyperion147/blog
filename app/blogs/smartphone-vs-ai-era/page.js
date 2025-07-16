"use client"
import * as React from "react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { Book, Sun, Moon } from "lucide-react";
import { Barlow } from "next/font/google";

const barlow = Barlow({ subsets: ["latin"], weight: ["700"] });

export default function BlogPage() {
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

  useEffect(() => {
    if (themeMenuOpen && themeButtonRef.current) {
      gsap.to(themeButtonRef.current.querySelector('button'), {
        width: '128px',
        duration: 0.35,
        ease: 'power2.out',
      });
    } else if (!themeMenuOpen && themeButtonRef.current) {
      gsap.to(themeButtonRef.current.querySelector('button'), {
        width: '32px',
        duration: 0.35,
        ease: 'power2.in',
      });
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

  // Blog content (personalized)
  const title = "Smartphone v/s AI -era-";
  const date = "July 2025";
  const tags = ["AI", "Technology", "Trends"];
  const contentStart = `<p>Remember when smartphones first took over? One day you were flipping a Nokia brick, and the next, you’re arguing with Siri about the weather. Now, AI’s doing the same—whispering sweet nothings like:</p>`;
  const contentPitch = `<em>“Here’s a poem about your cat in the style of Shakespeare”</em>— and we’re all just along for the ride. But will AI’s rise mirror the smartphone revolution, or are we in for a plot twist?`;
  const contentBold1 = `<br>The Smartphone Boom: A Quick Throwback`;
  const contentBody11 = `2007: iPhone drops. People lose their minds.<br><em>“It’s a phone, iPod, and internet device?”</em>`;
  const contentBody12 = `2010s: Smartphones become extensions of our hands (and souls).<br> <em>We date, bank, and cry over memes on them.</em>`;
  const contentBody13 = `Today: Try leaving home without your phone.<br><em>Panic. Sweating. Existential dread.</em>`;
  const contentBold2 = `How AI’s Path Could Mirror Smartphones`;
  const contentBody21 = `Then: “Why would I need apps?<b> I have a computer.</b>”`;
  const contentBody22 = `Now: “Alexa, add ‘existential crisis’ to my shopping list.”`;
  const contentBody23 = `AI is following the same hype-to-habit pipeline.`;
  const contentBody24 = `AI is already in your phone, your fridge, your car’s GPS.`;
  const contentBody25 = `AI’s spawning content farms, deepfake drama, and <em>“Did a bot just write my kid’s essay?”</em>`;
  const contentBold3 = `<b>Why AI Might Be Even Bigger</b> (or we!rder)`;
  const contentBody31 = `Smartphones sit in your pocket. <b>AI?</b> Knows you secretly love ~yodeling videos.`;
  const contentBody32 = `Your phone doesn’t evolve. <b>AI does.</b><br> Cue <em>“Wait, it’s getting smarter? Should we unplug it?”</em> debates.`;
  const contentBody33 = `Smartphones didn’t write novels or fake Drake songs.`;
  const contentBody34 = `AI’s out here generating stuff—art, code, conspiracy theories. What’s next, AI stand-up comedy?<br> <em>…Actually, we should try every idea.<em>`;
  const contentBold4 = `Final Verdict: Same Impact, Different Game`;
  const contentBody41 = `<b>Like smartphones?</b> Yes—AI will reshape jobs, habits, and how we (iota) procrastinate.`;
  const contentBody42 = `<b>Different?</b> Absolutely. Smartphones connected us. AI might replace us <em>kidding… mostly.</em>`;
  const contentBody43 = `One thing’s certain: In 10 years, we’ll laugh at how we once typed database queries instead of just thinking them into the AI hive mind.<br> Goodluck for the upcoming years. AI might not replace you <b><em>~someone using AI will.</em></b>`;
  const contentSign = `<em>Until we meet next time!</em>`;

  const tagDescriptions = {
    AI: "Artificial Intelligence",
    Technology: "Tools, devices, and innovations.",
    Trends: "What's popular!"
  };

  // TagWithTooltip component
  function TagWithTooltip({ tag, description }) {
    const [show, setShow] = useState(false);
    const tooltipRef = useRef(null);
    useEffect(() => {
      if (show && tooltipRef.current) {
        gsap.fromTo(
          tooltipRef.current,
          { opacity: 0, y: 8, pointerEvents: 'none' },
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.18, ease: 'power2.out' }
        );
      } else if (!show && tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          opacity: 0,
          y: 8,
          pointerEvents: 'none',
          duration: 0.12,
          ease: 'power2.in',
        });
      }
    }, [show]);
    return (
      <span
        className="relative bg-retroaccent/10 text-retroaccent px-2 py-0.5 rounded text-xs font-mono border border-retroborder transition-colors duration-200 hover:bg-retroaccent/20 hover:text-retroblue cursor-pointer"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        {tag}
        <span
          ref={tooltipRef}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-20 px-2 py-1 rounded bg-retrobg text-retrotext text-xs shadow-lg border border-retroborder whitespace-nowrap pointer-events-none select-none hidden md:flex"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          {description}
        </span>
      </span>
    );
  }

  return (
    <>
      {/* Blogs button top left */}
      <div ref={buttonRef} className="absolute top-6 left-6 z-50">
        <Link href="/">
          <button
            className="relative inline-flex h-8 w-8 overflow-hidden rounded-full p-[1px] focus:outline-none"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-0 py-1 text-xs font-medium text-retrotext backdrop-blur-3xl">
              <Book size={18} />
            </span>
          </button>
        </Link>
      </div>
      {/* Theme selector button top right */}
      <div ref={themeButtonRef} className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setThemeMenuOpen((open) => !open)}
          className="relative inline-flex h-8 w-8 overflow-hidden rounded-full p-[1px] focus:outline-none"
          style={{ fontFamily: 'Roboto, sans-serif', width: '32px', transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)' }}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-retrobg px-0 py-1 text-xs font-medium text-retrotext backdrop-blur-3xl">
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
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
      <div ref={containerRef} className="max-w-2xl mx-auto py-12 px-4 pt-16 md:pt-12">
        <h1 className={`text-3xl font-extrabold mb-2 text-retroaccent ${barlow.className}`}>{title}</h1>
        <div className="flex gap-2 mb-4">
          {tags.map((tag, i) => (
            <TagWithTooltip key={i} tag={tag} description={tagDescriptions[tag] || tag} />
          ))}
        </div>
        <div className="text-xs text-retroblue font-bold font-mono">{date}</div>
        <div className="prose prose-retro max-w-none opacity-70" dangerouslySetInnerHTML={{ __html: contentStart }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentPitch }} />
        <div className="prose prose-retro max-w-none font-bold" dangerouslySetInnerHTML={{ __html: contentBold1 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody11 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody12 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody13 }} />
        <div className="prose prose-retro max-w-none font-bold mt-4" dangerouslySetInnerHTML={{ __html: contentBold2 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody21 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody22 }} />
        <div className="prose prose-retro max-w-none font-semibold" dangerouslySetInnerHTML={{ __html: contentBody23 }} />
        <div className="prose prose-retro max-w-none font-semibold" dangerouslySetInnerHTML={{ __html: contentBody24 }} />
        <div className="prose prose-retro max-w-none font-semibold" dangerouslySetInnerHTML={{ __html: contentBody25 }} />
        <div className="prose prose-retro max-w-none mt-4" dangerouslySetInnerHTML={{ __html: contentBold3 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody31 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody32 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody33 }} />
        <div className="prose prose-retro max-w-none font-semibold" dangerouslySetInnerHTML={{ __html: contentBody34 }} />
        <div className="prose prose-retro max-w-none mt-4 font-bold" dangerouslySetInnerHTML={{ __html: contentBold4 }} />
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody41 }} />
        <p className="text-xs">iota in mathematics means "i" ~ me</p>
        <div className="prose prose-retro max-w-none" dangerouslySetInnerHTML={{ __html: contentBody42 }} />
        <div className="prose prose-retro max-w-none mt-4 font-medium text-center" dangerouslySetInnerHTML={{ __html: contentBody43 }} />
        <div className="prose prose-retro max-w-none mt-2 text-xs text-right" dangerouslySetInnerHTML={{ __html: contentSign }} />
      </div>
    </>
  );
} 