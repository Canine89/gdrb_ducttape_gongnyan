"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rafId = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(rafId);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.06 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "scroll-reveal-ready" : "scroll-reveal-pending"} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
