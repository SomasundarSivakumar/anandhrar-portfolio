"use client";

import React from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { Layers, ArrowUp, Globe, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <span className="text-sm font-black">AB</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Anantharaj B
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
            .NET Developer specializing in C#, WPF, and SQL. Building scalable Windows Applications and enterprise web solutions. Open to new opportunities.
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Hosur, Tamil Nadu, India</span>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md text-xs font-mono text-zinc-400">
          <span className="px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">C# .NET</span>
          <span className="px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">ASP.NET Core</span>
          <span className="px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">WPF</span>
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">SQL Server</span>
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">Azure</span>
        </div>

        {/* Scroll Back to Top Button */}
        <button
          onClick={() => scrollTo(0)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-white/10 transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <span>Scroll to top</span>
          <ArrowUp className="w-4 h-4 text-purple-400" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
        <span>&copy; {new Date().getFullYear()} Anantharaj B &bull; .NET Developer Portfolio</span>
        <span className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for enterprise solutions
        </span>
      </div>
    </footer>
  );
}
