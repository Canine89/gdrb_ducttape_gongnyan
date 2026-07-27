"use client";

import { useMemo, useState } from "react";
import type { PromptRow } from "@/lib/types";
import { PromptTable } from "./PromptTable";
import { ScrollReveal } from "./ScrollReveal";
import { SearchBar } from "./SearchBar";

const PAGE_SIZE = 10;

type Props = {
  initialRows: PromptRow[];
};

function getVisiblePages(currentPage: number, pageCount: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(pageCount, start + 4);
  const adjustedStart = Math.max(1, end - 4);

  return Array.from(
    { length: end - adjustedStart + 1 },
    (_, index) => adjustedStart + index,
  );
}

export function PromptExplorer({ initialRows }: Props) {
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const chapters = useMemo(() => {
    const s = new Set<string>();
    initialRows.forEach((r) => {
      if (r.chapter) s.add(r.chapter);
    });
    return Array.from(s).sort((a, b) => a.localeCompare(b, "ko"));
  }, [initialRows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialRows.filter((r) => {
      const matchChapter = !chapter || r.chapter === chapter;
      const hay =
        `${r.chapter} ${r.number} ${r.title} ${r.prompt}`.toLowerCase();
      const matchQ = !q || hay.includes(q);
      return matchChapter && matchQ;
    });
  }, [initialRows, query, chapter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const visibleRows = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const visibleStart = filtered.length === 0 ? 0 : startIndex + 1;
  const visibleEnd = Math.min(startIndex + PAGE_SIZE, filtered.length);
  const visiblePages = getVisiblePages(safeCurrentPage, pageCount);
  const filterActive = query.trim().length > 0 || chapter.length > 0;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pt-20">
      <h2 className="text-[30px] leading-[1.15] font-bold text-ink sm:text-[36px] md:text-[48px] md:leading-[0.95]">
        프롬프트 찾기
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-[1.5] text-[hsl(0,0%,28%)]">
        검색하거나 장을 고른 뒤{" "}
        <span className="font-extrabold text-gpt-green-dark">복사</span> 버튼으로
        바로 붙여넣기
        하세요.
      </p>

      <ScrollReveal className="mt-8 w-full sm:mt-10">
        <div className="surface-tinted-pattern w-full border border-border-light bg-white/75 p-4 shadow-card backdrop-blur-sm sm:p-8 md:p-10 rounded-[var(--radius-soft)]">
          <SearchBar
            query={query}
            onQueryChange={(nextQuery) => {
              setQuery(nextQuery);
              setCurrentPage(1);
            }}
            chapter={chapter}
            onChapterChange={(nextChapter) => {
              setChapter(nextChapter);
              setCurrentPage(1);
            }}
            chapters={chapters}
          />
          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm leading-[1.43] text-[hsl(0,0%,28%)] sm:mt-6">
            <span>
              총 {initialRows.length}개 중{" "}
              <span className="font-extrabold text-gpt-green-dark">
                {filtered.length}
              </span>
              개
              {filtered.length > 0 ? ` · ${visibleStart}-${visibleEnd}번째 표시` : ""}
            </span>
            <span
              className={
                filterActive
                  ? "border-gpt-green bg-gpt-tint/90 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-gpt-green-dark border rounded-full"
                  : "border-border bg-surface px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[hsl(0,0%,32%)] border rounded-full"
              }
            >
              {filterActive ? "필터 적용 중" : "전체 보기"}
            </span>
          </p>

          <PromptTable rows={visibleRows} />

          {pageCount > 1 ? (
            <nav
              className="mt-8 flex flex-col gap-3 border-t border-border-light pt-5 sm:flex-row sm:items-center sm:justify-between"
              aria-label="프롬프트 페이지"
            >
              <p className="text-sm font-semibold text-[hsl(0,0%,32%)]">
                {safeCurrentPage} / {pageCount} 페이지
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safeCurrentPage === 1}
                  className="min-h-[40px] border border-border bg-surface px-3 py-2 text-sm font-bold text-ink transition-colors rounded-[var(--radius-soft)] hover:bg-gpt-tint/60 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-surface"
                >
                  이전
                </button>
                {visiblePages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={page === safeCurrentPage ? "page" : undefined}
                    className={
                      page === safeCurrentPage
                        ? "min-h-[40px] min-w-[40px] border border-gpt-green bg-gpt-green px-3 py-2 text-sm font-extrabold text-white rounded-[var(--radius-soft)]"
                        : "min-h-[40px] min-w-[40px] border border-border bg-surface px-3 py-2 text-sm font-bold text-ink transition-colors rounded-[var(--radius-soft)] hover:bg-gpt-tint/60"
                    }
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(pageCount, page + 1))
                  }
                  disabled={safeCurrentPage === pageCount}
                  className="min-h-[40px] border border-border bg-surface px-3 py-2 text-sm font-bold text-ink transition-colors rounded-[var(--radius-soft)] hover:bg-gpt-tint/60 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-surface"
                >
                  다음
                </button>
              </div>
            </nav>
          ) : null}
        </div>
      </ScrollReveal>
    </section>
  );
}
