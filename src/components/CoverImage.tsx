"use client";

import Image from "next/image";
import { useState } from "react";
import { BOOK_TITLE } from "@/lib/links";

function CoverPlaceholder() {
  return (
    <div
      className="flex aspect-[2/3] w-full flex-col justify-between rounded-[var(--radius-soft)] bg-gradient-to-br from-ink via-[#1a1a1a] to-gpt-green-dark p-6 text-white shadow-card"
      aria-hidden
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gpt-green-muted">
        Golden Rabbit
      </p>
      <div className="space-y-2">
        <p className="text-2xl font-extrabold leading-tight tracking-tight">
          이게 되네?
        </p>
        <p className="text-lg font-bold leading-snug text-gpt-green">
          GPT Image 2
        </p>
        <p className="text-sm font-semibold leading-snug text-white/85">
          미친 활용법 61제
        </p>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-2/3 bg-gpt-green" />
      </div>
    </div>
  );
}

export function CoverImage() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <CoverPlaceholder />;
  }

  return (
    <Image
      src="/cover.jpeg"
      alt={`${BOOK_TITLE} 도서 표지`}
      width={640}
      height={960}
      priority
      className="h-auto w-full rounded-[var(--radius-soft)]"
      onError={() => setFailed(true)}
    />
  );
}
