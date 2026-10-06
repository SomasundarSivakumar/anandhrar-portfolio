"use client";

import React, { useEffect, useRef } from "react";

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const numWaves = 3;
      for (let i = 0; i < numWaves; i++) {
        ctx.beginPath();
        const amplitude = 50 + i * 20;
        const frequency = 0.002 + i * 0.001;
        const speed = 0.01 + i * 0.005;
        const yOffset = height / 2 + (i - 1) * 30;

        for (let x = 0; x < width; x += 10) {
          const y = yOffset + Math.sin(x * frequency + time * speed) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 - i * 0.05})`; // Purple waves
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}
