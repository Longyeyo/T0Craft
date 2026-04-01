"use client";

import * as React from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  colorHue: number;
};

type Mouse = {
  x: number | null;
  y: number | null;
  radius: number;
};

export function XiduCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const rafRef = React.useRef<number>(0);
  const mouseRef = React.useRef<Mouse>({ x: null, y: null, radius: 150 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particlesRef.current = [];
      // 限制最大粒子数量，避免大屏幕性能问题
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          colorHue: Math.random() * 360,
        });
      }
    };

    const connect = () => {
      const particles = particlesRef.current;
      const maxDistance = 120; // 减少连接距离，减少计算量
      
      for (let a = 0; a < particles.length; a++) {
        // 只检查附近的粒子，而不是所有粒子
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          // 先计算平方距离，避免平方根运算，提高性能
          const distanceSquared = dx * dx + dy * dy;
          
          if (distanceSquared < maxDistance * maxDistance) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = 1 - (distance / maxDistance);
            
            // 简化颜色，避免每次都创建渐变
            const color = `hsla(${(particles[a].colorHue + particles[b].colorHue) / 2}, 70%, 70%, ${opacity * 0.85})`;
            
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.colorHue += 0.1; // 减少颜色变化速度，降低计算量

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // 鼠标互动避让 - 优化计算
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          // 先计算平方距离
          const distanceSquared = dx * dx + dy * dy;
          const radiusSquared = mouse.radius * mouse.radius;
          
          if (distanceSquared < radiusSquared) {
            const distance = Math.sqrt(distanceSquared);
            const force = (mouse.radius - distance) / mouse.radius;
            particle.x -= (dx / distance) * force * 1.5; // 减少力的大小，提高性能
            particle.y -= (dy / distance) * force * 1.5;
          }
        }

        ctx.fillStyle = `hsla(${particle.colorHue}, 70%, 80%, 0.8)`; // 提高亮度和透明度
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      connect();
      rafRef.current = requestAnimationFrame(animate);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}