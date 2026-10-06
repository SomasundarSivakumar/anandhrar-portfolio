"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Terminal, Cpu, Database, ChevronRight, Download } from "lucide-react";

export default function ProfileIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingBadge1 = useRef<HTMLDivElement>(null);
  const floatingBadge2 = useRef<HTMLDivElement>(null);
  const backgroundGlow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial clip-path / scale reveal for the image container
      gsap.fromTo(
        imageContainerRef.current,
        {
          clipPath: "inset(20% 20% 20% 20% round 30px)",
          scale: 0.8,
          opacity: 0
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 30px)",
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Subtle parallax on the image inside its container
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Text Reveal Timeline (Triggered when section comes into view)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "back.out(1.4)" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          bioRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          skillsRef.current?.children ? Array.from(skillsRef.current.children) : [],
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );

      // 3. Floating Badges Animation
      const badges = [floatingBadge1.current, floatingBadge2.current];
      badges.forEach((badge, i) => {
        gsap.fromTo(
          badge,
          { y: 50, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top 60%",
            },
            delay: i * 0.2 + 0.5,
          }
        );

        // Continuous floating effect
        gsap.to(badge, {
          y: i % 2 === 0 ? "-=15" : "+=15",
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      });

      // Background Glow pulsing
      gsap.to(backgroundGlow.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  // 3D Hover Effect for Image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(imageContainerRef.current, {
      rotateY: x * 15, // max 15 deg
      rotateX: -y * 15,
      ease: "power2.out",
      duration: 0.5,
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!imageContainerRef.current) return;
    gsap.to(imageContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power3.out",
      duration: 0.8,
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-32 bg-zinc-950 overflow-hidden flex items-center justify-center px-4 md:px-12 lg:px-24"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

        {/* Left Side: Image with 3D interact / Parallax */}
        <div className="relative group perspective-1000 flex justify-center lg:justify-end order-2 lg:order-1">
          {/* Animated Glow */}
          <div
            ref={backgroundGlow}
            className="absolute -inset-10 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-teal-500/20 blur-3xl rounded-full z-0 opacity-50"
          ></div>

          {/* Main Image Container */}
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-[30px] overflow-hidden z-10 shadow-2xl border border-zinc-800/50 bg-zinc-900 flex-shrink-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The Image itself with its own parallax on scroll */}
            <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <Image
                ref={imageRef}
                src="/profile.webp"
                alt="Developer Portrait"
                fill
                quality={100}
                className="object-cover filter brightness-[0.85] contrast-[1.1] grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>

            {/* Inner Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Floating Badge 1 */}
          <div
            ref={floatingBadge1}
            className="absolute top-10 lg:top-20 -left-6 md:-left-12 z-20 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-4 shadow-xl flex items-center gap-4"
          >
            <div className="bg-indigo-500/20 p-2 rounded-xl text-indigo-400">
              <Code2 size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-400 font-medium leading-none mb-1">Experience</p>
              <p className="text-zinc-100 font-semibold text-lg leading-none">4+ Years</p>
            </div>
          </div>

          {/* Floating Badge 2 */}
          {/* <div 
            ref={floatingBadge2}
            className="absolute bottom-10 lg:bottom-20 -right-6 md:-right-12 z-20 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-4 shadow-xl flex items-center gap-4"
          >
            <div className="bg-teal-500/20 p-2 rounded-xl text-teal-400">
              <Terminal size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-400 font-medium leading-none mb-1">Location</p>
              <p className="text-zinc-100 font-semibold text-lg leading-none">Hosur, TN</p>
            </div>
          </div> */}
        </div>

        {/* Right Side: Content */}
        <div ref={textContentRef} className="flex flex-col justify-center order-1 lg:order-2">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 w-fit">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-sm text-zinc-300 font-medium uppercase tracking-wider">About Me</span>
          </div>

          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600"
            style={{ perspective: 400 }}
          >
            Building Scalable <br /> .NET Applications
          </h2>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-zinc-300 font-medium mb-6"
          >
            .NET Developer &bull; C# &bull; WPF &bull; SQL &bull; SDLC
          </p>

          <p
            ref={bioRef}
            className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-xl"
          >
            Software Engineer with 4+ years of experience in developing scalable and high-performance applications using .NET technologies. Skilled in C#, WPF, and SQL, with a strong understanding of SDLC and Agile methodologies. Passionate about problem-solving and delivering robust solutions that drive business growth.
          </p>

          {/* Skills Grid */}
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-xl">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
              <div className="text-purple-400"><Code2 size={20} /></div>
              <span className="text-zinc-200 font-medium">C# &amp; .NET Framework</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
              <div className="text-teal-400"><Terminal size={20} /></div>
              <span className="text-zinc-200 font-medium">WPF &amp; Desktop Apps</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
              <div className="text-blue-400"><Cpu size={20} /></div>
              <span className="text-zinc-200 font-medium">SQL Server &amp; LINQ</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
              <div className="text-orange-400"><Database size={20} /></div>
              <span className="text-zinc-200 font-medium">Agile &amp; SDLC</span>
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
            <a
              href="/resume.pdf"
              download
              className="group relative px-8 py-4 bg-zinc-100 text-zinc-950 font-semibold rounded-full overflow-hidden flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Download Resume</span>
              <Download size={18} className="relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-300 to-zinc-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0"></div>
            </a>

            <a
              href="https://linkedin.com/in/anantharajb"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-4 text-zinc-300 font-medium flex items-center gap-2 hover:text-white transition-colors"
            >
              <span>LinkedIn Profile</span>
              <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 group-hover:ml-2">
                <ChevronRight size={16} />
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
