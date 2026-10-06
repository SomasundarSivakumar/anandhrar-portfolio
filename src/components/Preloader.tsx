"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ""; // restore scrolling
        setIsComplete(true);
      },
    });

    const chars = textRef.current?.querySelectorAll(".char");

    if (chars) {
      // 1. Initial state: chars are hidden below and rotated
      gsap.set(chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        rotateY: 20,
        scale: 0.5,
      });

      // 2. Animate characters in (3D swing up)
      tl.to(chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)",
      })
        // 3. Add a cool floating / pulsating effect for a brief moment
        .to(chars, {
          y: -10,
          duration: 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          stagger: {
            each: 0.05,
            from: "center",
          },
        })
        // 4. Burst and fade out the letters
        .to(chars, {
          scale: 1.5,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.6,
          stagger: 0.03,
          ease: "power2.in",
        }, "+=0.2")
        // 5. Slide the entire preloader screen up
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        }, "-=0.2");
    }

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  const name = "ANANTHARAJ B";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Text Container */}
      <div
        ref={textRef}
        className="relative flex gap-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter"
        style={{ perspective: "1000px" }}
      >
        {name.split("").map((char, index) => (
          <span
            key={index}
            className="char inline-block"
            style={{
              // Custom 3D CSS effect using text-shadow
              textShadow: `
                1px 1px 0 #9333ea,
                2px 2px 0 #9333ea,
                3px 3px 0 #7e22ce,
                4px 4px 0 #7e22ce,
                5px 5px 0 #6b21a8,
                6px 6px 0 #6b21a8,
                7px 7px 15px rgba(0,0,0,0.8)
              `,
              color: "#ffffff",
              marginLeft: char === " " ? "1rem" : "0",
            }}
          >
            {char}
          </span>
        ))}
      </div>
      
      {/* Loading Progress Bar at bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full w-full origin-left"
          ref={(el) => {
            if (el) {
              gsap.fromTo(el, 
                { scaleX: 0 }, 
                { scaleX: 1, duration: 2.5, ease: "power2.inOut" }
              );
            }
          }}
        />
      </div>
    </div>
  );
}
