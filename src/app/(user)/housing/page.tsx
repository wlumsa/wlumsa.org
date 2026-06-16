import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Housing Resources | WLU MSA",
  description:
    "A simple housing and move-in resource guide for Muslim students moving to Waterloo and Wilfrid Laurier University.",
};

type ExternalResource = {
  title: string;
  url: string;
  note?: string;
};

type InternalResource = {
  title: string;
  href: string;
  note?: string;
};

const housingLinks: ExternalResource[] = [
  {
    title: "Wilfrid Laurier University Off-Campus Housing",
    url: "https://students.wlu.ca/student-life/residence-and-off-campus-housing/off-campus-housing/index.html",
    note: "Laurier's official off-campus housing starting point.",
  },
  {
    title: "Places4Students Waterloo Region",
    url: "https://www.places4students.com",
    note: "A common platform for student rentals and rooms.",
  },
  {
    title: "Facebook Marketplace",
    url: "https://www.facebook.com/marketplace",
    note: "Useful, but verify listings carefully before paying.",
  },
];

const rightsLinks: ExternalResource[] = [
  {
    title: "Ontario Renting Rights",
    url: "https://www.ontario.ca/page/renting-ontario-your-rights",
  },
  {
    title: "Landlord and Tenant Board Ontario",
    url: "https://tribunalsontario.ca/ltb/",
  },
  {
    title: "Ontario Standard Lease Guide",
    url: "https://www.ontario.ca/page/guide-ontarios-standard-lease",
  },
];

const setupLinks: ExternalResource[] = [
  {
    title: "Enova Power Corporation",
    url: "https://www.enovapower.com",
    note: "Local electricity provider.",
  },
  {
    title: "Grand River Transit",
    url: "https://www.grt.ca",
    note: "Buses, fares, schedules, and trip planning.",
  },
  {
    title: "ION Light Rail Transit",
    url: "https://www.grt.ca/en/ion-light-rail.aspx",
    note: "Light rail route through Waterloo and Kitchener.",
  },
];

const muslimResources: InternalResource[] = [
  {
    title: "Laurier MSA Prayer Information",
    href: "/prayerinfo",
  },
  {
    title: "Halal Food Around Campus",
    href: "/halalfood",
  },
  {
    title: "MSA Resources",
    href: "/resources",
  },
];

const scamTips = [
  "View the unit or verify it through someone trusted before sending money.",
  "Use Ontario's standard lease and read every fee before signing.",
  "Confirm the landlord, property manager, and address independently.",
  "Avoid pressure tactics, unusually low rent, or cash-only requests.",
  "Reverse-search listing photos if something feels copied or suspicious.",
];

const moveInChecklist = [
  "Search early",
  "Check the commute",
  "Review the lease",
  "Plan utilities",
  "Find prayer and halal options nearby",
];

export default function HousingPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Moving to Waterloo
          </p>
          <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Housing Resources
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-base-content/75 sm:text-lg">
            A practical starting point for finding housing, avoiding scams,
            understanding leases, and settling into Waterloo as a Muslim
            student at Laurier.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#find-housing"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
            >
              Start with Housing
            </a>
            <a
              href="#avoid-scams"
              className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
            >
              Read Scam Checklist
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Move-in Basics
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
            {moveInChecklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm leading-relaxed text-base-content/70"
              >
                <CheckCircle2
                  className="h-4 w-4 flex-none text-secondary/80"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div>
        <ContentSection
          id="find-housing"
          eyebrow="01"
          title="Find Housing"
          description="Start with official and commonly used student housing platforms. Add trusted Facebook groups later only if the MSA is comfortable recommending them."
        >
          <ExternalResourceList resources={housingLinks} />
        </ContentSection>

        <ContentSection
          id="avoid-scams"
          eyebrow="02"
          title="Avoid Scams"
          description="Before you send money or sign anything, slow down and verify the basics."
        >
          <ul className="divide-y divide-base-300 rounded-xl border border-base-300 bg-base-100">
            {scamTips.map((tip) => (
              <li
                key={tip}
                className="flex gap-3 px-4 py-4 text-sm leading-relaxed text-base-content/75"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-none text-secondary"
                  aria-hidden="true"
                />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          eyebrow="03"
          title="Know Your Rights"
          description="Use official Ontario resources for lease rules, rent questions, and disputes."
        >
          <ExternalResourceList resources={rightsLinks} />
        </ContentSection>

        <ContentSection
          eyebrow="04"
          title="Set Up Life"
          description="Utilities and transit are easier to plan before move-in week."
        >
          <ExternalResourceList resources={setupLinks} />
        </ContentSection>

      </div>

      <section className="bg-primary text-primary-content">
        <div className="mx-auto grid max-w-5xl gap-7 px-4 py-10 sm:px-6 md:grid-cols-[260px_1fr] md:items-start lg:px-8">
          <div>
            <p className="text-sm font-semibold text-secondary">05</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white">
              Muslim Student Resources
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Connect housing decisions with the things you will use weekly:
              prayer spaces, halal food, and campus community resources.
            </p>
          </div>
          <InternalResourceList
            resources={muslimResources}
            variant="highlight"
          />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-sm leading-relaxed text-base-content/60">
            This page is for general student information only. WLU MSA does not
            verify external listings, landlords, leases, or housing providers.
            For legal advice, contact a qualified legal clinic or professional.
          </p>
        </div>
      </section>
    </main>
  );
}

function ContentSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto grid max-w-5xl gap-7 px-4 py-14 sm:px-6 md:grid-cols-[260px_1fr] lg:px-8 lg:py-16">
        <div>
          <p className="text-sm font-semibold text-secondary">{eyebrow}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-primary">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-base-content/70">
            {description}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function ExternalResourceList({
  resources,
}: {
  resources: ExternalResource[];
}) {
  return (
    <div className="divide-y divide-base-300 rounded-xl border border-base-300 bg-base-100">
      {resources.map((resource) => (
        <a
          key={resource.url}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start justify-between gap-4 px-4 py-4 transition hover:bg-base-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary/70"
        >
          <span>
            <span className="block font-semibold text-base-content">
              {resource.title}
            </span>
            {resource.note ? (
              <span className="mt-1 block text-sm leading-relaxed text-base-content/60">
                {resource.note}
              </span>
            ) : null}
          </span>
          <ExternalLink
            className="mt-1 h-4 w-4 flex-none text-secondary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}

function InternalResourceList({
  resources,
  variant = "default",
}: {
  resources: InternalResource[];
  variant?: "default" | "highlight";
}) {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={
        isHighlight
          ? "divide-y divide-white/10 rounded-xl border border-white/10 bg-white/10"
          : "divide-y divide-base-300 rounded-xl border border-base-300 bg-base-100"
      }
    >
      {resources.map((resource) => (
        <Link
          key={resource.href}
          href={resource.href}
          className={
            isHighlight
              ? "group flex items-start justify-between gap-4 px-4 py-4 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary/70"
              : "group flex items-start justify-between gap-4 px-4 py-4 transition hover:bg-base-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary/70"
          }
        >
          <span>
            <span
              className={
                isHighlight
                  ? "block font-semibold text-white"
                  : "block font-semibold text-base-content"
              }
            >
              {resource.title}
            </span>
            {resource.note ? (
              <span
                className={
                  isHighlight
                    ? "mt-1 block text-sm leading-relaxed text-white/70"
                    : "mt-1 block text-sm leading-relaxed text-base-content/60"
                }
              >
                {resource.note}
              </span>
            ) : null}
          </span>
          <ArrowUpRight
            className="mt-1 h-4 w-4 flex-none text-secondary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  );
}
