"use client";

import React, { useState, useEffect } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sliders, RefreshCw, Play, Pause, ArrowDown, Activity, Monitor, Smartphone, Terminal } from "lucide-react";

export default function AnimationControlPanel() {
  const { lenis, scrollTo, isScrolling, scrollProgress } = useSmoothScroll();
  const [lenisPaused, setLenisPaused] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateStats = () => {
      setTriggerCount(ScrollTrigger.getAll().length);
      setScrollY(Math.round(window.scrollY));
      setViewportWidth(window.innerWidth);
    };

    updateStats();
    window.addEventListener("scroll", updateStats);
    window.addEventListener("resize", updateStats);

    return () => {
      window.removeEventListener("scroll", updateStats);
      window.removeEventListener("resize", updateStats);
    };
  }, []);

  const toggleLenis = () => {
    if (lenis) {
      if (lenisPaused) {
        lenis.start();
        setLenisPaused(false);
      } else {
        lenis.stop();
        setLenisPaused(true);
      }
    }
  };

  const handleRefresh = () => {
    ScrollTrigger.refresh();
    setTriggerCount(ScrollTrigger.getAll().length);
  };

  return (
    <section
      id="controls"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative"
    >
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-500/30 relative overflow-hidden shadow-2xl">
        {/* Glow Header Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-300 mb-2">
              <Sliders className="w-3.5 h-3.5" /> System Diagnostics
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Application Telemetry Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLenis}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 border transition-all ${
                lenisPaused
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
              }`}
            >
              {lenisPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span>Lenis: {lenisPaused ? "Paused" : "Running"}</span>
            </button>

            <button
              onClick={handleRefresh}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs flex items-center gap-2 border border-white/10 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-purple-400" />
              <span>Refresh ScrollTrigger</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900/80 p-4 rounded-2xl border border-white/5">
            <span className="text-xs font-mono text-zinc-500 block mb-1">Scroll Y Position</span>
            <span className="text-xl font-bold font-mono text-white">{scrollY}px</span>
          </div>

          <div className="bg-zinc-900/80 p-4 rounded-2xl border border-white/5">
            <span className="text-xs font-mono text-zinc-500 block mb-1">Scroll Progress</span>
            <span className="text-xl font-bold font-mono text-purple-400">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          <div className="bg-zinc-900/80 p-4 rounded-2xl border border-white/5">
            <span className="text-xs font-mono text-zinc-500 block mb-1">Active Triggers</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{triggerCount}</span>
          </div>

          <div className="bg-zinc-900/80 p-4 rounded-2xl border border-white/5">
            <span className="text-xs font-mono text-zinc-500 block mb-1">Breakpoint Mode</span>
            <span className="text-sm font-bold font-mono text-indigo-400 flex items-center gap-1 mt-1">
              {viewportWidth >= 1024 ? (
                <>
                  <Monitor className="w-4 h-4" /> Desktop ({viewportWidth}px)
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4" /> Mobile ({viewportWidth}px)
                </>
              )}
            </span>
          </div>
        </div>

        {/* Smooth Scroll Navigation Triggers */}
        <div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
            Quick Navigation (Simulated Route Jumps):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => scrollTo("#hero")}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-purple-950/60 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all text-left flex items-center justify-between"
            >
              <span>#hero</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-400 -rotate-90" />
            </button>
            <button
              onClick={() => scrollTo("#parallax-grid")}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-purple-950/60 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all text-left flex items-center justify-between"
            >
              <span>#parallax-grid</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-400 -rotate-90" />
            </button>
            <button
              onClick={() => scrollTo("#horizontal-section")}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-purple-950/60 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all text-left flex items-center justify-between"
            >
              <span>#horizontal-pin</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-400 -rotate-90" />
            </button>
            <button
              onClick={() => scrollTo("#card-stack")}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-purple-950/60 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all text-left flex items-center justify-between"
            >
              <span>#card-stack</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-400 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
