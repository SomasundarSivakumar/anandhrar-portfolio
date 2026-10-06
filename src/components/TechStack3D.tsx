"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const technologies = [
  { name: "C#", gradient: "from-purple-500 to-violet-600", glow: "#9b59b6" },
  { name: ".NET 8", gradient: "from-indigo-500 to-purple-700", glow: "#6366f1" },
  { name: "WPF", gradient: "from-blue-500 to-indigo-600", glow: "#3b82f6" },
  { name: "SQL Server", gradient: "from-red-500 to-rose-600", glow: "#ef4444" },
  { name: "ASP.NET Core", gradient: "from-cyan-500 to-blue-600", glow: "#06b6d4" },
  { name: "EF Core", gradient: "from-green-500 to-emerald-600", glow: "#22c55e" },
  { name: "Azure", gradient: "from-sky-500 to-blue-600", glow: "#0ea5e9" },
  { name: "Docker", gradient: "from-blue-400 to-cyan-500", glow: "#2496ed" },
  { name: "Git", gradient: "from-orange-500 to-red-500", glow: "#f05033" },
  { name: "LINQ", gradient: "from-green-400 to-teal-500", glow: "#4ade80" },
  { name: "REST API", gradient: "from-teal-400 to-cyan-600", glow: "#2dd4bf" },
  { name: "SCADA", gradient: "from-amber-500 to-orange-600", glow: "#f59e0b" },
  { name: "MVVM", gradient: "from-pink-500 to-rose-600", glow: "#ec4899" },
  { name: "Agile", gradient: "from-violet-400 to-purple-600", glow: "#8b5cf6" },
  { name: "Visual Studio", gradient: "from-purple-600 to-indigo-600", glow: "#7c3aed" },
  { name: "MSSQL", gradient: "from-red-600 to-orange-500", glow: "#dc2626" },
  { name: "Blazor", gradient: "from-indigo-600 to-violet-700", glow: "#4f46e5" },
  { name: "SignalR", gradient: "from-sky-600 to-blue-700", glow: "#0284c7" },
  { name: "NUnit", gradient: "from-lime-500 to-green-600", glow: "#84cc16" },
  { name: "Dapper", gradient: "from-amber-600 to-yellow-600", glow: "#d97706" },
];

const RADIUS = 200;

export default function TechStack3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const rotY = useRef(0);
  const mouseBoost = useRef({ x: 0, y: 0 });
  const tickerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ── 1. Position items using Fibonacci sphere algorithm ── */
    const items = sphereRef.current?.querySelectorAll<HTMLElement>(".tech-tag");
    const n = technologies.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    items?.forEach((el, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r * RADIUS;
      const yPos = y * RADIUS;
      const z = Math.sin(theta) * r * RADIUS;
      el.style.transform = `translate3d(${x}px, ${yPos}px, ${z}px)`;
    });

    /* ── 2. Continuous auto-rotation via GSAP ticker ── */
    tickerRef.current = () => {
      rotY.current += 0.35;
      if (sphereRef.current) {
        sphereRef.current.style.transform =
          `rotateX(${12 + mouseBoost.current.y}deg) rotateY(${rotY.current + mouseBoost.current.x}deg)`;
      }
    };
    gsap.ticker.add(tickerRef.current);

    /* ── 3. Scroll-triggered entrance ── */
    const ctx = gsap.context(() => {
      const targetScale = typeof window !== 'undefined' && window.innerWidth < 640 ? 0.75 : 1;
      gsap.fromTo(
        ".sphere-wrapper",
        { opacity: 0, scale: 0.2, filter: "blur(40px)" },
        {
          opacity: 1, scale: targetScale, filter: "blur(0px)",
          duration: 2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".tech3d-header",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
      /* Stagger the legend chips */
      gsap.fromTo(
        ".legend-chip",
        { opacity: 0, y: 20, scale: 0.85 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".legend-row",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    /* ── 4. Mouse tilt tracking ── */
    const section = sectionRef.current;
    const onMouseMove = (e: MouseEvent) => {
      const rect = section?.getBoundingClientRect();
      if (!rect) return;
      const mx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const my = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      gsap.to(mouseBoost.current, {
        x: mx * 35, y: -my * 20,
        duration: 0.8, ease: "power2.out", overwrite: true,
      });
    };
    const onMouseLeave = () => {
      gsap.to(mouseBoost.current, {
        x: 0, y: 0,
        duration: 1.8, ease: "power3.out", overwrite: true,
      });
    };
    section?.addEventListener("mousemove", onMouseMove);
    section?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
      ctx.revert();
      section?.removeEventListener("mousemove", onMouseMove);
      section?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      id="tech-stack-3d"
      ref={sectionRef}
      className="py-16 md:py-28 px-4 relative overflow-hidden bg-zinc-950"
    >
      {/* ── Ambient radial glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[100vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* ── Section Header ── */}
      <div className="tech3d-header text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-950/50 px-3 py-1 rounded-full border border-purple-500/20 inline-block mb-3">
          Technology Stack
        </span>
        {/* <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Skills
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">

          </span>
        </h2> */}
        {/* <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Move your mouse over the sphere to tilt it. Every glowing node represents a technology from 4+ years of professional .NET engineering.
        </p> */}
      </div>

      {/* ── 3D Sphere ── */}
      <div
        className="sphere-wrapper relative mx-auto"
        style={{
          width: "min(520px, 90vw)",
          height: "min(520px, 90vw)",
          perspective: "900px",
        }}
      >
        {/* Pulsing core glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full blur-3xl animate-pulse"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)" }} />
          <div className="absolute w-20 h-20 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)" }} />
        </div>

        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[260, 320, 380].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/5"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        {/* The rotating sphere container */}
        <div
          ref={sphereRef}
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(12deg) rotateY(0deg)",
          }}
        >
          {/* CSS Wireframe Globe */}
          <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
            {/* Longitudes */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`lon-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full border border-purple-500/20"
                style={{
                  width: `${RADIUS * 2}px`,
                  height: `${RADIUS * 2}px`,
                  marginLeft: `-${RADIUS}px`,
                  marginTop: `-${RADIUS}px`,
                  transform: `rotateY(${i * 30}deg)`,
                }}
              />
            ))}
            {/* Latitudes */}
            {[...Array(9)].map((_, i) => {
              const phi = ((i - 4) * Math.PI) / 10;
              const y = Math.sin(phi) * RADIUS;
              const r = Math.cos(phi) * RADIUS;
              return (
                <div
                  key={`lat-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full border border-purple-500/20"
                  style={{
                    width: `${r * 2}px`,
                    height: `${r * 2}px`,
                    marginLeft: `-${r}px`,
                    marginTop: `-${r}px`,
                    transform: `translateY(${y}px) rotateX(90deg)`,
                  }}
                />
              );
            })}
          </div>
          {technologies.map((tech, i) => (
            <div
              key={i}
              className="tech-tag absolute"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-55px",
                marginTop: "-16px",
              }}
            >
              <div
                className={`bg-gradient-to-r ${tech.gradient} px-3 py-1.5 rounded-lg text-white text-[11px] font-bold whitespace-nowrap cursor-pointer select-none hover:scale-125 active:scale-95 transition-transform duration-150`}
                style={{
                  width: "110px",
                  textAlign: "center",
                  boxShadow: `0 0 18px ${tech.glow}55, 0 2px 12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)`,
                  border: `1px solid ${tech.glow}55`,
                  textShadow: `0 1px 4px rgba(0,0,0,0.6)`,
                }}
              >
                {tech.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Legend chips below sphere ── */}
      <div className="legend-row flex flex-wrap justify-center gap-2 mt-10 max-w-3xl mx-auto px-4">
        {technologies.map((tech, i) => (
          <div
            key={i}
            className="legend-chip flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/10 text-xs text-zinc-300 font-medium backdrop-blur-sm hover:bg-zinc-800 transition-colors cursor-default"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: tech.glow, boxShadow: `0 0 6px ${tech.glow}` }}
            />
            {tech.name}
          </div>
        ))}
      </div>

      {/* ── Interaction hint ── */}
      <p className="text-center text-xs text-zinc-600 font-mono mt-6 animate-pulse">
        ↔ Move mouse to tilt the sphere
      </p>
    </section>
  );
}
