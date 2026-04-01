"use client";

import * as React from "react";

export function CursorSpotlight() {
  const elRef = React.useRef<HTMLDivElement | null>(null);
  const target = React.useRef({ x: 0, y: 0 });
  const current = React.useRef({ x: 0, y: 0 });
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const tick = () => {
      // low-pass filter for a smoother “lens”
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,.22),rgba(59,130,246,0)_62%)] opacity-90 mix-blend-screen blur-2xl transition-opacity"
    />
  );
}

