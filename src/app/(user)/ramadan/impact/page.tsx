import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ramadan Impact | WLUMSA",
  description:
    "A simple impact summary of Laurier MSA Ramadan meals, fundraising, and student support.",
};

const summaryMetrics = [
  {
    value: "2019",
    label: "Project started",
  },
  {
    value: "7",
    label: "Ramadans served",
  },
  {
    value: "$90K+",
    label: "Estimated sadaqah",
  },
] as const;

const yearlyMetrics = [
  {
    year: "2019",
    meals: "600",
    charity: "$4,000",
    students: "150+",
  },
  {
    year: "2020",
    meals: "300",
    charity: "$3,000",
    students: "75+",
  },
  {
    year: "2021",
    meals: "900",
    charity: "$7,000",
    students: "220+",
  },
  {
    year: "2022",
    meals: "1,400",
    charity: "$11,000",
    students: "320+",
  },
  {
    year: "2023",
    meals: "2,200",
    charity: "$16,000",
    students: "450+",
  },
  {
    year: "2024",
    meals: "2,624",
    charity: "$22,147",
    students: "372+",
  },
  {
    year: "2025",
    meals: "4,000+",
    charity: "$30,000+",
    students: "700+",
  },
] as const;

const combinedMetrics = [
  {
    value: "12,500+",
    label: "Estimated meals",
  },
  {
    value: "$90K+",
    label: "Estimated sadaqah",
  },
  {
    value: "3,000+",
    label: "Estimated students served",
  },
] as const;

export default function RamadanImpactPage() {
  return (
    <main className="min-h-screen bg-base-100 px-4 pb-20 pt-28 text-base-content sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-10 border-b border-base-content/15 pb-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/50">
              WLUMSA / Ramadan / Impact
            </p>
            <h1 className="font-heading mt-5 max-w-3xl text-5xl font-bold leading-[1.05] text-base-content sm:text-6xl">
              Ramadan impact, recorded simply.
            </h1>
          </div>

          <div className="self-end border-l border-base-content/15 pl-5">
            <p className="text-sm leading-relaxed text-base-content/65">
              An estimated ledger for meals, sadaqah, and students served from
              2019 to 2025.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <Link
                href="/ramadan"
                className="font-semibold text-base-content underline underline-offset-4 transition hover:text-primary"
              >
                Current Ramadan
              </Link>
              <Link
                href="/ramadan/2025"
                className="font-semibold text-base-content underline underline-offset-4 transition hover:text-primary"
              >
                2025 Archive
              </Link>
            </div>
          </div>
        </header>

        <section className="grid border-b border-base-content/15 lg:grid-cols-[1.15fr_1fr]">
          <div className="border-b border-base-content/15 py-10 lg:border-b-0 lg:border-r lg:pr-10">
            <p className="text-sm font-medium text-base-content/55">
              Estimated total
            </p>
            <p className="font-heading mt-4 text-[4.5rem] font-bold leading-none text-primary sm:text-[6.5rem]">
              12,500+
            </p>
            <p className="mt-3 text-lg text-base-content/70">meals served</p>
          </div>

          <div className="grid sm:grid-cols-3 lg:grid-cols-1">
            {summaryMetrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-base-content/15 py-7 sm:border-b-0 sm:border-l sm:px-6 lg:border-b lg:border-l-0 lg:px-8 lg:last:border-b-0"
              >
                <p className="font-heading text-3xl font-bold text-base-content">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-base-content/55">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
          <aside>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
              Annual Ledger
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-base-content">
              2019-2025
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-base-content/60">
              These figures are working estimates and can be updated when final
              records are available.
            </p>
          </aside>

          <div className="border-y border-base-content/15">
            <div className="hidden grid-cols-[0.7fr_1fr_1fr_1fr] border-b border-base-content/15 px-1 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45 md:grid">
              <div>Year</div>
              <div>Meals</div>
              <div>Charity</div>
              <div>Students</div>
            </div>

            {yearlyMetrics.map((year) => (
              <div
                key={year.year}
                className="grid gap-4 border-b border-base-content/10 px-1 py-5 last:border-b-0 md:grid-cols-[0.7fr_1fr_1fr_1fr] md:items-center"
              >
                <p className="font-heading text-2xl font-bold text-base-content">
                  {year.year}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40 md:hidden">
                    Meals
                  </p>
                  <p className="text-lg font-semibold text-base-content">
                    {year.meals}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40 md:hidden">
                    Charity
                  </p>
                  <p className="text-lg font-semibold text-base-content">
                    {year.charity}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40 md:hidden">
                    Students
                  </p>
                  <p className="text-lg font-semibold text-base-content">
                    {year.students}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid border-t border-base-content/15 pt-8 md:grid-cols-3">
          {combinedMetrics.map((metric) => (
            <div
              key={metric.label}
              className="border-base-content/15 py-4 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
            >
              <p className="font-heading text-4xl font-bold text-base-content">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-base-content/55">
                {metric.label}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
