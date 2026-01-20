"use client";

import { useState, useEffect } from "react";

export function GradientBackground() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 0.01), 16);
    return () => clearInterval(interval);
  }, []);

  const move1X = Math.sin(time * 0.3) * 10;
  const move1Y = Math.cos(time * 0.25) * 10;
  
  const move2X = Math.sin(time * 0.35 + 1) * 12;
  const move2Y = Math.cos(time * 0.28 + 1) * 12;
  
  const move3X = Math.sin(time * 0.32 + 2) * 11;
  const move3Y = Math.cos(time * 0.26 + 2) * 11;
  
  const move4X = Math.sin(time * 0.29 + 3) * 13;
  const move4Y = Math.cos(time * 0.31 + 3) * 13;
  
  const move5X = Math.sin(time * 0.34 + 4) * 10;
  const move5Y = Math.cos(time * 0.27 + 4) * 10;

  return (
    <div 
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${move1X}%), calc(-50% + ${move1Y}%))`,
          background: "radial-gradient(circle at center, rgba(204, 204, 255, 0.35) 0%, rgba(204, 204, 255, 0.25) 15%, rgba(204, 204, 255, 0.15) 30%, rgba(204, 204, 255, 0.08) 45%, transparent 60%)",
          filter: "blur(100px)",
          opacity: 1,
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%",
          transform: `translate(calc(-30% + ${move2X}%), calc(-30% + ${move2Y}%))`,
          background: "radial-gradient(circle at center, rgba(204, 204, 255, 0.30) 0%, rgba(204, 204, 255, 0.20) 20%, rgba(204, 204, 255, 0.10) 40%, transparent 60%)",
          filter: "blur(110px)",
          opacity: 0.95,
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0%",
          right: "0%",
          transform: `translate(calc(30% + ${move3X}%), calc(-30% + ${move3Y}%))`,
          background: "radial-gradient(circle at center, rgba(204, 204, 255, 0.28) 0%, rgba(204, 204, 255, 0.18) 25%, rgba(204, 204, 255, 0.08) 45%, transparent 60%)",
          filter: "blur(105px)",
          opacity: 0.9,
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          bottom: "0%",
          left: "0%",
          transform: `translate(calc(-30% + ${move4X}%), calc(30% + ${move4Y}%))`,
          background: "radial-gradient(circle at center, rgba(204, 204, 255, 0.32) 0%, rgba(204, 204, 255, 0.20) 25%, rgba(204, 204, 255, 0.10) 45%, transparent 60%)",
          filter: "blur(115px)",
          opacity: 0.95,
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          bottom: "0%",
          right: "0%",
          transform: `translate(calc(30% + ${move5X}%), calc(30% + ${move5Y}%))`,
          background: "radial-gradient(circle at center, rgba(204, 204, 255, 0.30) 0%, rgba(204, 204, 255, 0.18) 25%, rgba(204, 204, 255, 0.08) 45%, transparent 60%)",
          filter: "blur(108px)",
          opacity: 0.92,
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}
