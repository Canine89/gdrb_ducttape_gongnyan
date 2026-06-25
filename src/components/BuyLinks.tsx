import { BUY_LINKS } from "@/lib/links";
import type { CSSProperties } from "react";

const items = [
  {
    key: "yes24",
    label: "YES24",
    href: BUY_LINKS.yes24,
    color: "#0080FF",
    hoverColor: "#0043FF",
    shadow: "rgba(0, 128, 255, 0.32)",
    delay: "0s",
  },
  {
    key: "kyobo",
    label: "교보문고",
    href: BUY_LINKS.kyobo,
    color: "#4DAC27",
    hoverColor: "#3f911f",
    shadow: "rgba(77, 172, 39, 0.3)",
    delay: "0.18s",
  },
  {
    key: "aladin",
    label: "알라딘",
    href: BUY_LINKS.aladin,
    color: "#1D80C3",
    hoverColor: "#156ca8",
    shadow: "rgba(29, 128, 195, 0.32)",
    delay: "0.36s",
  },
];

export function BuyLinks() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={
            {
              "--buy-color": item.color,
              "--buy-hover-color": item.hoverColor,
              "--buy-shadow": item.shadow,
              animationDelay: item.delay,
            } as CSSProperties
          }
          className="purchase-button-float inline-flex min-h-[48px] w-full items-center justify-center rounded-[var(--radius-soft)] bg-[var(--buy-color)] px-4 py-3 text-base leading-[1.5] font-bold tracking-wide text-white uppercase shadow-[0_10px_24px_var(--buy-shadow)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:bg-[var(--buy-hover-color)] hover:shadow-[0_14px_30px_var(--buy-shadow)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gpt-green motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:w-auto sm:min-w-[104px]"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
