"use client";

import { useCallback, useState } from "react";

type Props = {
  text: string;
  className?: string;
};

export function CopyButton({ text, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex min-h-[44px] min-w-[88px] shrink-0 items-center justify-center bg-gpt-green px-4 py-3 text-sm leading-[1.5] font-bold tracking-wide text-white uppercase transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-gpt-green-dark active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gpt-green motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 rounded-[var(--radius-soft)] ${copied ? "copy-button-success" : ""} ${className}`}
    >
      {copied ? (
        <span className="flex items-center gap-2">
          <CheckIcon />
          복사됨!
        </span>
      ) : (
        "복사"
      )}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
