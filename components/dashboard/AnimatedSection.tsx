"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  observeVisibility = false,
  onVisible,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  observeVisibility?: boolean;
  onVisible?: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observeVisibility) {
      const timer = setTimeout(() => {
        setVisible(true);
        setTimeout(() => setReady(true), 700);
      }, delay);
      return () => clearTimeout(timer);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const timer = setTimeout(() => {
            setVisible(true);
            onVisible?.();
            setTimeout(() => setReady(true), 700);
          }, delay);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [observeVisibility, delay, onVisible]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${className} ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}
