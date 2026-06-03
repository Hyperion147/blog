"use client";

import Link from "next/link";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { PortfolioIcon } from "@/components/ui/portfolio-icon";
import { TwitterIcon } from "@/components/ui/twitter-icon";

const socialLinks = [
  {
    href: "https://twitter.com/your-handle",
    label: "Twitter",
    icon: TwitterIcon,
  },
  {
    href: "https://github.com/your-username",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://www.linkedin.com/in/your-handle",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "https://your-portfolio.example.com",
    label: "Portfolio",
    icon: PortfolioIcon,
  },
];

export default function HomepageDock() {
  return (
    <div className="fixed bottom-2 right-2 md:bottom-8 md:right-17 z-50">
      <div className="flex items-center gap-2 border border-retroborder bg-[rgb(var(--theme-bg-rgb)/0.92)] px-2 py-2 backdrop-blur-xl">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex h-10 w-10 overflow-hidden p-px text-retrotext transition-transform duration-300 focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2.8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F79B72_0%,#393BB2_50%,#F79B72_100%)]" />
            <span className="relative inline-flex h-full w-full items-center justify-center bg-retrobg px-0 py-1 backdrop-blur-3xl transition-colors duration-300 hover:text-retroaccent">
              <Icon size={17} isAnimated={true} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
