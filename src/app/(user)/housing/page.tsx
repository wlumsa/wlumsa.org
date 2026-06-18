import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  MapPin,
  MoonStar,
  ShieldCheck,
  UtensilsCrossed,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

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
  note: string;
  label: string;
  icon: LucideIcon;
};

const housingLinks: ExternalResource[] = [
  {
    title: "Wilfrid Laurier University Off-Campus Housing",
    url: "https://students.wlu.ca/student-life/residence-and-off-campus-housing/off-campus-housing/index.html",
    note: "Laurier’s official off-campus housing starting point.",
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
    note: "Find daily prayer times, Jumu’ah details, and directions to campus prayer rooms.",
    label: "Pray",
    icon: MoonStar,
  },
  {
    title: "Halal Food Around Campus",
    href: "/halalfood",
    note: "Browse halal restaurants and food options close to Laurier.",
    label: "Eat",
    icon: UtensilsCrossed,
  },
  {
    title: "MSA Resources",
    href: "/resources",
    note: "Get to the forms, support, and campus links students use most.",
    label: "Connect",
    icon: UsersRound,
  },
];

const scamTips = [
  "View the unit or verify it through someone trusted before sending money.",
  "Use Ontario’s standard lease and read every fee before signing.",
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

const pageSections = [
  { number: "01", label: "Find Housing", href: "#find-housing" },
  { number: "02", label: "Avoid Scams", href: "#avoid-scams" },
  { number: "03", label: "Know Your Rights", href: "#know-your-rights" },
  { number: "04", label: "Set Up Life", href: "#set-up-life" },
  {
    number: "05",
    label: "Muslim Student Life",
    href: "#muslim-resources",
  },
];

export default function HousingPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <section className="relative overflow-hidden border-b border-base-300">
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_15rem] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Moving to Waterloo
                </span>
                <span className="text-xs font-medium text-base-content/50">
                  Housing guidance for students at Laurier
                </span>
              </div>
              <h1 className="font-heading mt-6 max-w-2xl text-balance text-5xl font-bold leading-[1.08] tracking-[-0.025em] text-primary sm:text-6xl">
                Find a place that fits your life.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-base-content/70 sm:text-lg">
                A practical guide to housing, leases, transit, and the weekly
                routines that help Waterloo feel like home.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#find-housing"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-content transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                >
                  Start Your Search
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#avoid-scams"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
                >
                  Check a Listing First
                </a>
              </div>
            </div>

            <div className="hidden border-l border-primary/20 pl-5 lg:block">
              <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
              <p className="font-heading mt-4 text-lg font-bold text-primary">
                Waterloo, Ontario
              </p>
              <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                Off-campus housing guidance for students at Wilfrid Laurier
                University.
              </p>
            </div>
          </div>

          <ol className="mt-14 grid border-y border-primary/15 sm:grid-cols-5">
            {moveInChecklist.map((item, index) => (
              <li
                key={item}
                className="flex min-h-20 items-center gap-3 border-b border-primary/15 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
              >
                <span className="text-xs font-semibold tabular-nums text-secondary">
                  0{index + 1}
                </span>
                <span className="text-sm font-medium leading-snug text-base-content/75">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav
        aria-label="Housing guide sections"
        className="border-b border-base-300 bg-base-200/50"
      >
        <div className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex min-w-max border-l border-base-300">
            {pageSections.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  className="group flex min-h-16 items-center gap-3 border-r border-base-300 px-5 text-sm font-medium text-base-content/65 transition-colors hover:bg-base-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary/70"
                >
                  <span className="text-xs tabular-nums text-secondary">
                    {section.number}
                  </span>
                  <span>{section.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="divide-y divide-base-300">
        <ContentSection
          id="find-housing"
          eyebrow="01"
          kicker="Begin Here"
          title="Find Housing"
          description="Start with official and commonly used student housing platforms. Compare the address, commute, and total monthly cost before committing."
          note="Open several listings at once. A good comparison is more useful than falling in love with the first room."
        >
          <ExternalResourceList resources={housingLinks} />
        </ContentSection>

        <ContentSection
          id="avoid-scams"
          eyebrow="02"
          kicker="Before You Pay"
          title="Avoid Scams"
          description="Before you send money or sign anything, slow down and verify the basics."
          tone="soft"
        >
          <ol className="border-t border-primary/20">
            {scamTips.map((tip, index) => (
              <li
                key={tip}
                className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-primary/20 py-4 sm:px-4"
              >
                <span className="font-heading text-lg font-bold tabular-nums text-secondary">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-base-content/75">
                  {tip}
                </span>
              </li>
            ))}
          </ol>
        </ContentSection>

        <ContentSection
          id="know-your-rights"
          eyebrow="03"
          kicker="Read the Fine Print"
          title="Know Your Rights"
          description="Use official Ontario resources for lease rules, rent questions, and disputes."
          note="Keep a copy of the listing, lease, payment records, and every written conversation."
        >
          <ExternalResourceList resources={rightsLinks} />
        </ContentSection>

        <ContentSection
          id="set-up-life"
          eyebrow="04"
          kicker="Before Move-in Day"
          title="Set Up Life"
          description="Utilities and transit are easier to plan before move-in week."
          tone="soft"
        >
          <ExternalResourceList resources={setupLinks} />
        </ContentSection>
      </div>

      <section
        id="muslim-resources"
        className="scroll-mt-24 border-y border-base-300 bg-base-200/60"
      >
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-9 md:grid-cols-[260px_1fr] md:gap-12">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-secondary">05</span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/55">
                  Your Weekly Radius
                </span>
              </div>
              <h2 className="font-heading mt-4 text-balance text-3xl font-bold leading-tight text-primary">
                Muslim Student Resources
              </h2>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-base-content/70">
                Connect housing decisions with the things you will use weekly:
                prayer spaces, halal food, and campus community resources.
              </p>
              <p className="mt-5 text-sm font-medium leading-relaxed text-base-content/80">
                A good address should work for your routine, not only your rent.
              </p>
            </div>

            <InternalResourceList resources={muslimResources} />
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-content">
        <div className="mx-auto grid max-w-5xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-[auto_1fr] md:items-start lg:px-8">
          <ShieldCheck className="h-6 w-6 text-secondary" aria-hidden="true" />
          <div>
            <h2 className="font-heading text-lg font-bold text-white">
              A Note Before You Sign
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              This page is for general student information only. WLU MSA does
              not verify external listings, landlords, leases, or housing
              providers. For legal advice, contact a qualified legal clinic or
              professional.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContentSection({
  id,
  eyebrow,
  kicker,
  title,
  description,
  note,
  tone = "default",
  children,
}: {
  id?: string;
  eyebrow: string;
  kicker: string;
  title: string;
  description: string;
  note?: string;
  tone?: "default" | "soft";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${
        tone === "soft" ? "bg-base-200/60" : "bg-base-100"
      }`}
    >
      <div className="mx-auto grid max-w-5xl gap-9 px-4 py-14 sm:px-6 md:grid-cols-[260px_1fr] md:gap-12 lg:px-8 lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-secondary">
              {eyebrow}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">
              {kicker}
            </span>
          </div>
          <h2 className="font-heading mt-4 text-balance text-3xl font-bold leading-tight text-primary">
            {title}
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-base-content/70">
            {description}
          </p>
          {note ? (
            <p className="mt-6 text-xs leading-relaxed text-base-content/60">
              {note}
            </p>
          ) : null}
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
    <div className="border-t border-primary/20">
      {resources.map((resource, index) => (
        <a
          key={resource.url}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid min-h-24 grid-cols-[2rem_1fr_auto] items-start gap-3 border-b border-primary/20 py-5 transition-colors hover:bg-base-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary/70 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:px-4"
        >
          <span className="text-xs font-medium tabular-nums text-base-content/35">
            0{index + 1}
          </span>
          <span className="min-w-0">
            <span className="font-heading block text-pretty text-lg font-bold leading-snug text-primary">
              {resource.title}
            </span>
            {resource.note ? (
              <span className="mt-1 block text-sm leading-relaxed text-base-content/60">
                {resource.note}
              </span>
            ) : null}
          </span>
          <span className="flex items-center gap-2 self-center text-xs font-medium text-base-content/45">
            <span className="hidden sm:inline">Open</span>
            <ExternalLink
              className="h-4 w-4 flex-none text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </a>
      ))}
    </div>
  );
}

function InternalResourceList({
  resources,
}: {
  resources: InternalResource[];
}) {
  return (
    <div className="border-t border-primary/20">
      {resources.map((resource, index) => {
        const Icon = resource.icon;

        return (
          <Link
            key={resource.href}
            href={resource.href}
            className="group grid min-h-28 grid-cols-[2.75rem_1fr_auto] items-start gap-4 border-b border-primary/20 py-5 transition-colors hover:bg-base-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary/70 sm:grid-cols-[3rem_5rem_1fr_auto] sm:items-center sm:px-4"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/35 bg-secondary/10 text-primary transition-colors group-hover:border-secondary group-hover:bg-secondary/20">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50 sm:block">
              {resource.label}
            </span>
            <span className="min-w-0">
              <span className="font-heading block text-pretty text-lg font-bold leading-snug text-primary">
                {resource.title}
              </span>
              <span className="mt-1.5 block text-pretty text-sm leading-relaxed text-base-content/65">
                {resource.note}
              </span>
            </span>
            <span className="flex items-center gap-2 self-center">
              <span className="hidden text-xs font-medium tabular-nums text-base-content/35 lg:block">
                0{index + 1}
              </span>
              <ArrowUpRight
                className="h-4 w-4 flex-none text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
