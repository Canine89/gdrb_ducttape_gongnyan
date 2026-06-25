import { BOOK_TITLE } from "@/lib/links";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gpt-green/20 bg-gradient-to-b from-gpt-tint to-surface px-4 py-8 text-ink sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-base font-bold leading-[1.5] text-gpt-green-dark">
          {BOOK_TITLE}
        </p>
        <p className="mt-2 text-sm leading-[1.43] font-semibold text-[hsl(0,0%,28%)]">
          프롬프트 목록은 자동으로 갱신됩니다 (최대 약 60초).
        </p>
        <p className="mt-4 text-xs leading-[1.43] font-semibold text-[hsl(0,0%,36%)]">
          본 도서는 골든래빗 공식 도서이며, 본 사이트는 골든래빗에서 관리합니다.
        </p>
      </div>
    </footer>
  );
}
