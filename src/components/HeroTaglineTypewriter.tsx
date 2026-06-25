"use client";

import { useEffect, useState } from "react";

const TAGLINE = "프롬프트 이지 Copy&Paste";
const GRAPHEMES = Array.from(TAGLINE);

const INITIAL_DELAY_MS = 380;
const CHAR_MS = 52;

export function HeroTaglineTypewriter() {
  const [shown, setShown] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rafId = requestAnimationFrame(() => {
      setPrefersReducedMotion(mq.matches);
    });
    const onChange = () => {
      requestAnimationFrame(() => setPrefersReducedMotion(mq.matches));
    };
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(rafId);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const id = requestAnimationFrame(() => setShown(GRAPHEMES.length));
      return () => cancelAnimationFrame(id);
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const step = (nextCount: number) => {
      if (cancelled) return;
      setShown(nextCount);
      if (nextCount >= GRAPHEMES.length) return;
      timeoutId = setTimeout(() => step(nextCount + 1), CHAR_MS);
    };

    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;
      setShown(0);
      timeoutId = setTimeout(() => step(1), INITIAL_DELAY_MS);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  const visible = GRAPHEMES.slice(0, shown).join("");
  const typing = shown < GRAPHEMES.length;

  return (
    <p className="min-h-[1.35em] text-lg font-bold tracking-[-0.02em] text-ink sm:min-h-[1.3em] sm:text-xl md:text-2xl lg:min-h-[1.25em] lg:text-[1.75rem] lg:leading-snug">
      <span className="sr-only">{TAGLINE}</span>
      <span aria-hidden="true" className="inline-flex max-w-full items-baseline gap-0">
        <span className="whitespace-pre-wrap break-words">{visible}</span>
        {typing ? (
          <span
            className="ms-px inline-block h-[0.9em] w-0.5 shrink-0 animate-pulse bg-gpt-green motion-reduce:animate-none"
            aria-hidden
          />
        ) : null}
      </span>
    </p>
  );
}
