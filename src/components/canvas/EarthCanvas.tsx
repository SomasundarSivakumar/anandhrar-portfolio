"use client";

import React, { useEffect, useRef } from "react";

export default function EarthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;

    const nodes: { x: number; y: number; z: number }[] = [];
    const radius = Math.min(width, height) * 0.4; // Globe radius
    const latLines = 15;
    const lonLines = 30;

    // Generate points on the sphere
    for (let lat = 0; lat <= latLines; lat++) {
      const theta = (lat * Math.PI) / latLines;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= lonLines; lon++) {
        const phi = (lon * 2 * Math.PI) / lonLines;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        nodes.push({
          x: radius * sinTheta * cosPhi,
          y: radius * cosTheta,
          z: radius * sinTheta * sinPhi,
        });
      }
    }

    let angleX = 0;
    let angleY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotation angles
      angleY += 0.005;
      angleX = 0.2; // Slight tilt

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projectedNodes: { x: number; y: number; z: number }[] = [];

      // Rotate and project nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Rotate around Y axis
        let x = node.x * cosY - node.z * sinY;
        let z = node.z * cosY + node.x * sinY;
        let y = node.y;

        // Rotate around X axis
        const tempY = y;
        y = tempY * cosX - z * sinX;
        z = z * cosX + tempY * sinX;

        // Project to 2D
        const fov = 1000;
        const scale = fov / (fov + z);
        
        projectedNodes.push({
          x: x * scale + width / 2,
          y: y * scale + height / 2,
          z: z
        });
      }

      ctx.strokeStyle = "rgba(139, 92, 246, 0.25)"; // Purple wireframe
      ctx.lineWidth = 1;

      // Draw horizontal (latitude) lines
      let idx = 0;
      for (let lat = 0; lat <= latLines; lat++) {
        ctx.beginPath();
        for (let lon = 0; lon <= lonLines; lon++) {
          const p = projectedNodes[idx];
          if (lon === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
          idx++;
        }
        ctx.stroke();
      }

      // Draw vertical (longitude) lines
      for (let lon = 0; lon <= lonLines; lon++) {
        ctx.beginPath();
        for (let lat = 0; lat <= latLines; lat++) {
          const p = projectedNodes[lat * (lonLines + 1) + lon];
          if (lat === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

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
      style={{ opacity: 0.8 }}
    />
  );
}
