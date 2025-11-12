"use client"

import { useEffect, useRef, useState } from 'react';

const ArtPlumCanvas = () => {
  const canvasRef = useRef(null);
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 400,
    height: typeof window !== 'undefined' ? window.innerHeight : 400
  });
  const stepsRef = useRef([]);
  const prevStepsRef = useRef([]);
  const frameIdRef = useRef(null);

  // Constants
  const r180 = Math.PI;
  const r90 = Math.PI / 2;
  const r15 = Math.PI / 12;
  const color = "#88888825";
  const MIN_BRANCH = 30;
  const len = 6;

  const randomMiddle = () => Math.random() * 0.6 + 0.2;

  const initCanvas = (canvas, width, height) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get canvas context");

    const dpr = window.devicePixelRatio || 1;
    const bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
    const dpi = dpr / bsr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = dpi * width;
    canvas.height = dpi * height;
    ctx.scale(dpi, dpi);

    return { ctx, dpi };
  };

  const polar2cart = (x = 0, y = 0, r = 0, theta = 0) => {
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    return [x + dx, y + dy];
  };

  const step = (ctx, x, y, rad, counter = { value: 0 }) => {
    const length = Math.random() * len;
    counter.value += 1;

    const [nx, ny] = polar2cart(x, y, length, rad);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    const rad1 = rad + Math.random() * r15;
    const rad2 = rad - Math.random() * r15;

    if (
      nx < -100 ||
      nx > size.width + 100 ||
      ny < -100 ||
      ny > size.height + 100
    )
      return;

    const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

    if (Math.random() < rate)
      stepsRef.current.push(() => step(ctx, nx, ny, rad1, counter));
    if (Math.random() < rate)
      stepsRef.current.push(() => step(ctx, nx, ny, rad2, counter));
  };

  const frame = (ctx) => {
    prevStepsRef.current = stepsRef.current;
    stepsRef.current = [];

    if (!prevStepsRef.current.length) return;

    prevStepsRef.current.forEach((i) => {
      if (Math.random() < 0.5) stepsRef.current.push(i);
      else i();
    });

    frameIdRef.current = requestAnimationFrame(() => frame(ctx));
  };

  const start = (canvas) => {
    const { ctx } = initCanvas(canvas, size.width, size.height);
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    prevStepsRef.current = [];
    stepsRef.current = [
      () => step(ctx, randomMiddle() * size.width, -5, r90),
      () => step(ctx, randomMiddle() * size.width, size.height + 5, -r90),
      () => step(ctx, -5, randomMiddle() * size.height, 0),
      () => step(ctx, size.width + 5, randomMiddle() * size.height, r180),
    ];

    if (size.width < 500) stepsRef.current = stepsRef.current.slice(0, 2);
    
    frameIdRef.current = requestAnimationFrame(() => frame(ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    start(canvas);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [size]);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 print:hidden"
      style={{
        maskImage: 'radial-gradient(circle, transparent, black)',
        WebkitMaskImage: 'radial-gradient(circle, transparent, black)'
      }}
    >
      <canvas ref={canvasRef} id="artPlumCanvas" width="400" height="400" />
    </div>
  );
};

export default ArtPlumCanvas;
