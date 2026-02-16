import React from "react";
import Link from "next/link";
import BlurFade from "@/components/UI/BlurFade";

type HeroProps = {
  title: string;
  subtitle: string;
};

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="rounded-3xl border border-primary/10 bg-base-100 p-6 shadow-sm md:p-10">
      <div className="text-center">
        <BlurFade>
          <h1 className="pt-4 text-4xl font-heading font-bold text-primary duration-200 hover:scale-105 md:text-center md:text-6xl lg:pt-0">
            {title}
          </h1>
        </BlurFade>

        <BlurFade delay={0.25}>
          <p className="mt-2 text-lg font-body text-base-content/80 md:text-xl">{subtitle}</p>
        </BlurFade>

        <BlurFade delay={0.5}>
          <p className="py-4 text-center text-lg font-body md:text-xl">
            O believers! Fasting is prescribed for you as it was for those before you so perhaps you will become mindful of Allah. (Quran, 2:183)
          </p>
        </BlurFade>

        <BlurFade delay={0.75}>
          <div className="my-6 flex flex-wrap justify-center gap-3">
            <button className="btn btn-primary btn-sm text-secondary duration-200 md:btn-md hover:scale-105">
              <Link
                href="https://fundraise.islamicreliefcanada.org/campaign/wlu-msa-x-irc-ramadan-campaign-2025-1446-ah-2625#attr=2858"
                target="_blank"
              >
                Donate now!
              </Link>
            </button>
            <button className="btn btn-secondary btn-sm text-primary duration-200 md:btn-md hover:scale-105">
              <Link href="/forms/iftars">Register for iftar</Link>
            </button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
