"use client";

import { useEffect, useState } from "react";
import type { PromptRow } from "@/lib/types";
import { CopyButton } from "./CopyButton";

function preview(text: string, max = 200) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trimEnd()}…`;
}

type Props = {
  rows: PromptRow[];
};

const rowInteractive =
  "group border-b border-border-light transition-colors duration-200 ease-out hover:bg-[linear-gradient(90deg,rgba(16,163,127,0.10),rgba(16,163,127,0.035)_42%,transparent)] focus-within:bg-[linear-gradient(90deg,rgba(16,163,127,0.10),rgba(16,163,127,0.035)_42%,transparent)]";

export function PromptTable({ rows }: Props) {
  const [open, setOpen] = useState<PromptRow | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="mt-10 hidden overflow-x-auto md:block">
        <table className="w-full table-fixed border-collapse text-left text-base leading-[1.5]">
          <colgroup>
            <col className="w-[14%]" />
            <col className="w-[28%] lg:w-[30%]" />
            <col className="w-[46%] lg:w-[46%]" />
            <col className="w-[12%] lg:w-[10%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              <th className="pb-4 pr-4 text-sm font-bold uppercase tracking-wide text-ink">
                바로
              </th>
              <th className="pb-4 pr-4 text-sm font-bold uppercase tracking-wide text-ink">
                활용 주제
              </th>
              <th className="pb-4 pr-4 text-sm font-bold uppercase tracking-wide text-ink">
                프롬프트
              </th>
              <th className="pb-4 text-sm font-bold uppercase tracking-wide text-ink">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr className="border-b border-border-light">
                <td
                  colSpan={4}
                  className="py-12 text-center text-base font-semibold text-[hsl(0,0%,32%)]"
                >
                  조건에 맞는 프롬프트가 없습니다.
                </td>
              </tr>
            ) : null}
            {rows.map((r) => (
              <tr key={r.id} className={rowInteractive}>
                <td className="py-4 pr-4 align-top text-ink transition-colors duration-200 group-hover:text-gpt-green-dark group-focus-within:text-gpt-green-dark">
                  <span className="block font-extrabold">{r.number}</span>
                  <span className="mt-1 inline-flex border border-gpt-green/20 bg-gpt-tint/80 px-2 py-0.5 text-xs font-bold text-gpt-green-dark rounded-full">
                    {r.chapter}
                  </span>
                </td>
                <td className="py-4 pr-4 align-top text-ink">
                  {r.title}
                </td>
                <td className="py-4 pr-4 align-top text-[hsl(0,0%,28%)] transition-colors duration-200 group-hover:text-ink group-focus-within:text-ink">
                  <p className="line-clamp-3 whitespace-pre-wrap">{preview(r.prompt)}</p>
                  {r.prompt.length > 200 ? (
                    <button
                      type="button"
                      className="mt-2 text-sm font-semibold text-gpt-green-dark underline decoration-gpt-green underline-offset-4"
                      onClick={() => setOpen(r)}
                    >
                      더 보기
                    </button>
                  ) : null}
                </td>
                <td className="py-4 align-top transition-opacity duration-200 md:opacity-80 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                  <CopyButton text={r.prompt} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-6 flex flex-col gap-3 sm:mt-8 md:hidden">
        {rows.length === 0 ? (
          <li className="shadow-card border border-border-light bg-white/85 p-6 text-center text-base font-semibold text-[hsl(0,0%,32%)] backdrop-blur-sm rounded-[var(--radius-soft)]">
            조건에 맞는 프롬프트가 없습니다.
          </li>
        ) : null}
        {rows.map((r) => (
          <li
            key={r.id}
            className="group shadow-card border border-border-light bg-white/85 p-4 rounded-[var(--radius-soft)] backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-gpt-green/40 hover:bg-gpt-tint/40 hover:shadow-card-hover focus-within:border-gpt-green/40 focus-within:bg-gpt-tint/40 focus-within:shadow-card-hover sm:p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-extrabold uppercase tracking-wide text-ink transition-colors duration-200 group-hover:text-gpt-green-dark">
                {r.number}
              </p>
              <span className="border border-gpt-green/20 bg-gpt-tint/80 px-2 py-0.5 text-xs font-bold text-gpt-green-dark rounded-full">
                {r.chapter}
              </span>
            </div>
            <p className="mt-2 text-base font-bold leading-[1.45] text-ink">
              {r.title}
            </p>
            <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-base leading-[1.5] text-[hsl(0,0%,24%)]">
              {preview(r.prompt, 160)}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {r.prompt.length > 160 ? (
                <button
                  type="button"
                  className="w-fit text-sm font-semibold text-gpt-green-dark underline decoration-gpt-green underline-offset-4"
                  onClick={() => setOpen(r)}
                >
                  더 보기
                </button>
              ) : null}
              <CopyButton text={r.prompt} className="w-full sm:ml-auto sm:w-auto" />
            </div>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,15,15,0.52)] p-3 sm:p-4"
          role="presentation"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="prompt-dialog-title"
            className="shadow-card max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-border bg-surface p-5 rounded-[var(--radius-soft)] sm:p-8"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h3
              id="prompt-dialog-title"
              className="text-xl leading-[1.15] font-bold text-ink sm:text-2xl"
            >
              전체 프롬프트
            </h3>
            <p className="mt-2 text-sm text-[hsl(0,0%,24%)]">
              {open.chapter}
              {` · ${open.number}`}
              {` · ${open.title}`}
            </p>
            <pre className="mt-5 whitespace-pre-wrap font-sans text-base leading-[1.5] text-ink sm:mt-6">
              {open.prompt}
            </pre>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <CopyButton text={open.prompt} className="w-full sm:w-auto" />
              <button
                type="button"
                className="inline-flex min-h-[44px] w-full items-center justify-center border border-border bg-surface px-4 py-3 text-base font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gpt-green motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 rounded-[var(--radius-soft)] hover:bg-gpt-tint/60 sm:w-auto"
                onClick={() => setOpen(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
