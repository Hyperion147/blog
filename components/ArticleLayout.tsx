"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ArticleLayout({
  children,
  disableAnimation = false,
}: {
  children: React.ReactNode;
  disableAnimation?: boolean;
}) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (disableAnimation) {
      return;
    }

    if (contentRef.current) {
      // Animate paragraphs and headings as they come into view or just on load
      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }, [disableAnimation]);

  return (
    <div
      className="prose prose-lg prose-retro max-w-none opacity-90 transition-colors"
      ref={contentRef}
    >
      {children}
    </div>
  );
}
