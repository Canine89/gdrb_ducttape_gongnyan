import type { ReactNode } from "react";
import { BlockGradient } from "./BlockGradient";
import { BuyLinks } from "./BuyLinks";
import { CoverImage } from "./CoverImage";
import { HeroTaglineTypewriter } from "./HeroTaglineTypewriter";

function Accent({ children }: { children: ReactNode }) {
  return <span className="font-extrabold text-gpt-green">{children}</span>;
}

export function HeroSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="group/cover w-full max-w-[240px] shrink-0 self-center rounded-[var(--radius-soft)] shadow-card transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:max-w-[300px] lg:w-[320px] lg:max-w-none lg:self-auto">
          <CoverImage />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-6 sm:gap-8">
          <BlockGradient />
          <div className="flex flex-col gap-3 md:gap-4">
            <h1 className="text-[34px] leading-[1.05] font-extrabold tracking-[-1.4px] text-ink sm:text-[44px] md:text-[56px] md:tracking-[-2.05px] lg:text-[82px]">
              <span className="inline">
                <Accent>이게</Accent> 되네?
                <br />
                <span className="text-gpt-green">GPT Image 2</span>
                <br />
                <span className="text-ink">미친 활용법 61제</span>
              </span>
            </h1>
            <HeroTaglineTypewriter />
          </div>
          <p className="max-w-xl text-base leading-[1.6] text-[hsl(0,0%,28%)]">
            프롬프트 입력하느라 고생하지 마세요, <Accent>바로</Accent> 붙여서{" "}
            <Accent>바로</Accent> GPT Image 2에 사용해보세요
          </p>
          <BuyLinks />
        </div>
      </div>
    </section>
  );
}
