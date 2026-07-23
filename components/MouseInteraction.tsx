"use client";

import { useCallback, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function MouseInteraction({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const setTilt = useCallback((cx: number, cy: number) => {
    const el = containerRef.current;
    if (!el) return;
    const x = (cy - 0.5) * -12;
    const y = (cx - 0.5) * 12;
    el.style.setProperty("--tilt-x", `${x}deg`);
    el.style.setProperty("--tilt-y", `${y}deg`);
  }, []);

  const resetTilt = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }, []);

  const addRipple = useCallback((x: number, y: number) => {
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTilt(
        (e.clientX - rect.left) / rect.width,
        (e.clientY - rect.top) / rect.height,
      );
    },
    [setTilt],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    },
    [addRipple],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTilt(
        (touch.clientX - rect.left) / rect.width,
        (touch.clientY - rect.top) / rect.height,
      );
    },
    [setTilt],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      addRipple(touch.clientX - rect.left, touch.clientY - rect.top);
    },
    [addRipple],
  );

  return (
    <div
      className="relative"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={handleClick}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
      onTouchStart={handleTouchStart}
    >
      <div
        className="relative z-10"
        style={{
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(10px)",
          transition: "transform 0.12s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>

      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            left: r.x - 24,
            top: r.y - 24,
            width: 48,
            height: 48,
            border: "2px solid hsla(212, 75%, 55%, 0.5)",
            transform: "scale(0)",
            animation: "ripple-expand 0.7s ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
