import Link from "next/link";
import Image from "next/image";
import BlurFade from "@/components/UI/BlurFade";

type HeroProps = {
  title: string;
  subtitle: string;
};

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="rounded-3xl border border-primary/20 bg-base-100 p-4 shadow-sm md:p-6">
      <div className="mx-auto max-w-4xl text-center">
        <BlurFade>
          <p className="text-xs font-body font-semibold uppercase tracking-[0.16em] text-primary/80 md:text-sm">{subtitle}</p>
          <h1 className="mt-1 text-3xl font-heading font-bold leading-tight text-primary md:text-4xl">{title}</h1>
        </BlurFade>

        <BlurFade delay={0.28}>
          <div className="mt-1.5 flex justify-center">
            <Image
              src="/ramadan.svg"
              alt="Ramadan Mubarak calligraphy"
              width={520}
              height={520}
              priority
              className="h-auto w-full max-w-[170px] md:max-w-[220px]"
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.35}>
          <div className="mx-auto mt-2.5 max-w-3xl rounded-2xl border border-base-300 bg-base-100 px-4 py-2.5 text-left md:px-6">
            <p className="text-[10px] font-body font-semibold uppercase tracking-[0.16em] text-base-content/70 md:text-[11px]">Quran 2:183</p>
            <p className="mt-2 text-sm font-body italic leading-relaxed text-base-content/85 md:text-base">
              “O believers! Fasting is prescribed for you as it was for those before you so perhaps you will become mindful of Allah.”
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.5}>
          <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row sm:gap-3">
            <Link href="/forms/iftars" className="btn btn-primary btn-sm text-primary-content md:btn-md">
              Register for iftar
            </Link>
            <Link
              href="https://fundraise.islamicreliefcanada.org/campaign/wlu-msa-x-irc-ramadan-campaign-2025-1446-ah-2625#attr=2858"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm text-secondary-content md:btn-md"
            >
              Donate now
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
