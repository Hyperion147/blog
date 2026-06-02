// @ts-nocheck
"use client";

import { cn } from "@/lib/utils";
import {
 LazyMotion,
 domMin,
 m,
 useAnimation,
 useReducedMotion,
} from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const PortfolioIcon = forwardRef((
 {
  onMouseEnter,
  onMouseLeave,
  className,
  size = 24,
  duration = 1,
  isAnimated = true,
  color,
  ...props
 },
 ref,
) => {
 const controls = useAnimation();
 const reduced = useReducedMotion();
 const isControlled = useRef(false);

 useImperativeHandle(ref, () => {
  isControlled.current = true;
  return {
   startAnimation: () =>
    reduced ? controls.start("normal") : controls.start("animate"),
   stopAnimation: () => controls.start("normal"),
  };
 });

 const handleEnter = useCallback((e) => {
  if (!isAnimated || reduced) return;
  if (!isControlled.current) controls.start("animate");
  else onMouseEnter?.(e);
 }, [controls, reduced, isAnimated, onMouseEnter]);

 const handleLeave = useCallback((e) => {
  if (!isControlled.current) controls.start("normal");
  else onMouseLeave?.(e);
 }, [controls, onMouseLeave]);

 const frameVariants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
   scale: [1, 1.04, 1],
   rotate: [0, -1.5, 0],
   transition: { duration: 0.8 * duration, ease: "easeInOut" },
  },
 };

 const sparkVariants = {
  normal: { y: 0, opacity: 1 },
  animate: {
   y: [-1, -3, -1],
   opacity: [0.7, 1, 0.7],
   transition: { duration: 0.9 * duration, ease: "easeInOut" },
  },
 };

 return (
  <LazyMotion features={domMin} strict>
   <m.div
    className={cn("inline-flex items-center justify-center", className)}
    onMouseEnter={handleEnter}
    onMouseLeave={handleLeave}
    {...props}
    style={{ color, ...props.style }}>
    <m.svg
     xmlns="http://www.w3.org/2000/svg"
     width={size}
     height={size}
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     strokeWidth="2"
     strokeLinecap="round"
     strokeLinejoin="round"
     animate={controls}
     initial="normal"
     variants={frameVariants}>
     <m.rect x="3" y="4" width="18" height="14" rx="2" />
     <m.path d="M8 20h8" />
     <m.path d="M12 18v2" />
     <m.path d="M7 8h4" />
     <m.path d="M7 11h6" />
     <m.path d="M16 8l1 1 2-2" variants={sparkVariants} />
    </m.svg>
   </m.div>
  </LazyMotion>
 );
});

PortfolioIcon.displayName = "PortfolioIcon";
export { PortfolioIcon };
