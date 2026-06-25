type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  chapter: string;
  onChapterChange: (c: string) => void;
  chapters: string[];
};

export function SearchBar({
  query,
  onQueryChange,
  chapter,
  onChapterChange,
  chapters,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      <div className="flex-1">
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-bold uppercase tracking-wide text-ink"
        >
          검색
        </label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="장, 바로 번호, 제목, 프롬프트 내용…"
          className="min-h-[48px] w-full border border-border bg-surface px-4 py-3 text-base font-semibold leading-[1.5] text-ink outline-none rounded-[var(--radius-soft)] focus:ring-2 focus:ring-gpt-green"
        />
      </div>
      <div className="w-full md:max-w-xs">
        <label
          htmlFor="chapter"
          className="mb-2 block text-sm font-bold uppercase tracking-wide text-ink"
        >
          장 필터
        </label>
        <select
          id="chapter"
          value={chapter}
          onChange={(e) => onChapterChange(e.target.value)}
          className="min-h-[48px] w-full border border-border bg-surface px-4 py-3 text-base font-semibold leading-[1.5] text-ink outline-none rounded-[var(--radius-soft)] focus:ring-2 focus:ring-gpt-green"
        >
          <option value="">전체</option>
          {chapters.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
