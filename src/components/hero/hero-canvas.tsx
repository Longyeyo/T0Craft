"use client";

import * as React from "react";

type Point = { x: number; y: number; z: number; r: number };

function makeSpherePoints(count: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere
    const t = i / count;
    const inc = Math.PI * (3 - Math.sqrt(5));
    const y = 1 - 2 * t;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    pts.push({ x, y, z, r: 1 });
  }
  return pts;
}

export function HeroCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const pointsRef = React.useRef<Point[]>([]);
  const rafRef = React.useRef<number>(0);
  const mouseRef = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
    };
    resize();

    pointsRef.current = makeSpherePoints(900);

    let last = performance.now();
    let rot = 0;

    const loop = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      rot += dt * 0.00022;

      const w = canvas.width;
      const h = canvas.height;
      // “拖影”效果：用半透明填充代替全清屏
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const base = Math.min(w, h) * 0.35;

      // subtle fog
      const grad = ctx.createRadialGradient(cx, cy, base * 0.1, cx, cy, base * 1.35);
      grad.addColorStop(0, "rgba(255,255,255,0.10)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x; // -1..1
      const my = mouseRef.current.y; // -1..1

      const rotY = rot + mx * 0.65;
      const rotX = -my * 0.35;

      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);
      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);

      // project + draw
      const pts = pointsRef.current.map((p) => {
        // rotate around Y then X
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const depth = 1.6;
        const k = depth / (depth - z2);
        return { x: x1, y: y2, z: z2, k };
      });

      pts.sort((a, b) => a.z - b.z);

      for (const p of pts) {
        const x = cx + p.x * base * p.k;
        const y = cy + p.y * base * p.k;
        const alpha = 0.08 + Math.max(0, (p.z + 1) * 0.22);
        const radius = (0.65 + (p.k - 1) * 1.4) * dpr;
        ctx.beginPath();
        ctx.shadowBlur = 10 * dpr * (0.7 + p.k);
        ctx.shadowColor = `rgba(59,130,246,${alpha})`;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.x = (x - 0.5) * 2;
      mouseRef.current.y = (y - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)]"
      aria-hidden="true"
    />
  );
}

