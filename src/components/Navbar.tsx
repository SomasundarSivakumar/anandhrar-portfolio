"use client";

import React, { useState, useEffect } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { Layers, Sparkles, Menu, X, Smartphone, Monitor, ChevronUp } from "lucide-react";

const navLinks = [
  { label: "About", href: "#hero" },
  { label: "Skills", href: "#tech-stack-3d" },
  { label: "Expertise", href: "#parallax-grid" },
  { label: "Architecture", href: "#horizontal-section" },
  { label: "Impact", href: "#counter-stats" },
  { label: "Journey", href: "#scroll-timeline" },
  { label: "Tools", href: "#marquee" },
  { label: "Process", href: "#card-stack" },
  { label: "Contact", href: "#controls" },
];

export default function Navbar() {
  const { scrollTo, scrollProgress } = useSmoothScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      {/* Top Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-950 z-50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-75 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-3 bg-zinc-950/80 backdrop-blur-md border-b border-white/10 shadow-2xl" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            onClick={() => scrollTo(0)}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <span className="text-base font-black">AB</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Anantharaj B <Sparkles className="w-4 h-4 text-purple-400 inline" />
              </span>
              <span className="text-xs text-zinc-400 block -mt-1">
                .NET Developer · Hosur, Tamil Nadu
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-lg">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Viewport Indicator & Action Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
              {isMobileScreen ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-indigo-400 font-semibold">Mobile</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Desktop</span>
                </>
              )}
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">{Math.round(scrollProgress * 100)}%</span>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-4 duration-200 mt-3">
            <div className="flex flex-col gap-2 max-w-7xl mx-auto">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-1">
                Navigation Sections
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/60 hover:bg-purple-950/40 text-sm font-medium text-zinc-200 hover:text-purple-300 border border-white/5 transition-colors text-left"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-purple-400">{link.href}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => scrollTo(0)}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-900/40 border border-white/20 transition-all duration-300 ${
          scrolled ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        } hover:scale-110 active:scale-95`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
}
