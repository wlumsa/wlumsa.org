import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/UI/button";

export const metadata: Metadata = {
  title: "Housing Resources | WLU MSA",
  description:
    "Housing, renting, and move-in resources for Muslim students moving to Waterloo and Wilfrid Laurier University.",
};

type ExternalResource = {
  title: string;
  url: string;
};

const housingSites: ExternalResource[] = [
  {
    title: "Laurier Off-Campus Housing",
    url: "https://students.wlu.ca/campus-services/residence-and-off-campus-housing/off-campus-initiatives/off-campus-housing/index.html",
  },
  {
    title: "Places4Students",
    url: "https://www.places4students.com",
  },
  {
    title: "Facebook Marketplace",
    url: "https://www.facebook.com/marketplace",
  },
];

const communityGroups: ExternalResource[] = [
  {
    title: "Kitchener & Waterloo Muslim Housing",
    url: "https://www.facebook.com/groups/343339742457048/",
  },
  {
    title: "Waterloo Sisterhood",
    url: "https://www.facebook.com/groups/249281311781393/",
  },
  {
    title: "Student Off-Campus Housing in Waterloo Region",
    url: "https://www.facebook.com/groups/1747962682281809/",
  },
];

const officialLinks: ExternalResource[] = [
  {
    title: "Renting in Ontario: Your Rights",
    url: "https://www.ontario.ca/page/renting-ontario-your-rights",
  },
  {
    title: "Ontario Standard Lease Guide",
    url: "https://www.ontario.ca/page/guide-ontarios-standard-lease",
  },
  {
    title: "Landlord and Tenant Board",
    url: "https://tribunalsontario.ca/ltb/",
  },
  {
    title: "Laurier Rental Fraud",
    url: "https://students.wlu.ca/campus-services/residence-and-off-campus-housing/off-campus-initiatives/off-campus-housing/rental-fraud.html",
  },
  {
    title: "Laurier Tenant Resources",
    url: "https://students.wlu.ca/campus-services/residence-and-off-campus-housing/off-campus-initiatives/off-campus-housing/tenant-resources.html",
  },
  {
    title: "City of Waterloo Rental Housing Support",
    url: "https://www.waterloo.ca/community-support/get-rental-housing-support/",
  },
  {
    title: "Waterloo Region Community Legal Services",
    url: "https://www.wrcls.ca/",
  },
  {
    title: "Grand River Transit",
    url: "https://www.grt.ca",
  },
  {
    title: "Enova Power",
    url: "https://www.enovapower.com",
  },
];

const safetyChecklist = [
  "See the unit in person. If you cannot, ask someone you trust to see it for you.",
  "Look up the address and confirm who owns or manages the property.",
  "Read the full lease, including utilities, deposits, and extra fees.",
  "Do not send money because someone is rushing you.",
  "Save the listing, lease, receipts, and written conversations.",
];

const studentResources = [
  {
    title: "Prayer Information",
    href: "/prayerinfo",
  },
  {
    title: "Halal Food",
    href: "/halalfood",
  },
  {
    title: "MSA Resources",
    href: "/resources",
  },
];

export default function HousingPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
        <header className="mx-auto max-w-3xl text-center">
          <blockquote>
            <p
              lang="ar"
              dir="rtl"
              className="text-center text-2xl font-semibold leading-loose text-primary sm:text-3xl"
            >
              وَٱللَّهُ جَعَلَ لَكُم مِّنۢ بُيُوتِكُمْ سَكَنًۭا
            </p>
            <p className="mt-3 text-base leading-relaxed text-base-content/75 sm:text-lg">
              “And Allah has made your homes a place to rest.”
            </p>
            <cite className="mt-2 block text-sm not-italic text-base-content/55">
              Qur’an 16:80
            </cite>
          </blockquote>
        </header>

        <section id="find-housing" className="mt-14 scroll-mt-24 sm:mt-16">
          <SectionHeading
            title="Housing Guide"
            description="Use listing sites for a broad search, then check local groups for rooms shared directly by community members."
            level="h1"
          />

          <div className="mt-7 grid items-start gap-9 md:grid-cols-2 md:gap-8">
            <SearchLinkGroup title="Housing Sites" resources={housingSites} />
            <SearchLinkGroup
              title="Community Groups"
              resources={communityGroups}
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-base-content/60">
            Facebook listings and groups are not verified. Check the listing and
            landlord before sending money.
          </p>
        </section>

        <section id="before-you-pay" className="mt-14 scroll-mt-24 sm:mt-16">
          <SectionHeading
            title="Check the Listing First"
            description="Take a few minutes to confirm that the place and the person renting it are real."
          />

          <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-base-content/80 marker:font-semibold marker:text-primary sm:text-base">
            {safetyChecklist.map((item) => (
              <li key={item} className="pl-2">
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 sm:mt-16">
          <SectionHeading
            title="Rights, Transit & Utilities"
            description="Use official sources for lease rules, disputes, transit, and electricity."
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {officialLinks.map((resource) => (
              <ResourceButton
                key={resource.url}
                href={resource.url}
                title={resource.title}
                external
              />
            ))}
          </div>
        </section>

        <section className="mt-14 sm:mt-16">
          <SectionHeading
            title="Plan Around Your Routine"
            description="Before choosing an address, check how easily you can get to campus, prayer spaces, groceries, and the places you use every week."
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {studentResources.map((resource) => (
              <ResourceButton
                key={resource.href}
                href={resource.href}
                title={resource.title}
              />
            ))}
          </div>
        </section>

        <aside className="mt-14 border-t border-base-300 pt-6 text-sm leading-relaxed text-base-content/60 sm:mt-16">
          <p>
            WLU MSA does not verify external listings, landlords, leases, or
            housing providers. This guide is general information, not legal
            advice. For legal help, contact a qualified legal clinic or
            professional.
          </p>
        </aside>
      </div>
    </main>
  );
}

function SectionHeading({
  title,
  description,
  level = "h2",
}: {
  title: string;
  description: string;
  level?: "h1" | "h2";
}) {
  const Heading = level;

  return (
    <div className="max-w-2xl">
      <Heading className="font-heading text-2xl font-bold text-primary sm:text-3xl">
        {title}
      </Heading>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-base-content/70 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function SearchLinkGroup({
  title,
  resources,
}: {
  title: string;
  resources: ExternalResource[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-base-content">{title}</h3>
      <div className="mt-3 space-y-3">
        {resources.map((resource) => (
          <ResourceButton
            key={resource.url}
            href={resource.url}
            title={resource.title}
            external
          />
        ))}
      </div>
    </div>
  );
}

function ResourceButton({
  href,
  title,
  external = false,
}: {
  href: string;
  title: string;
  external?: boolean;
}) {
  const Icon = external ? ExternalLink : ArrowUpRight;
  const content = (
    <>
      <span className="min-w-0">{title}</span>
      <Icon className="h-4 w-4 flex-none" aria-hidden="true" />
    </>
  );
  const className =
    "h-auto min-h-12 w-full touch-manipulation flex-nowrap gap-2 whitespace-normal border-0 py-3 text-center text-secondary shadow-sm transition duration-200 hover:scale-105 hover:bg-secondary hover:text-primary motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <Button asChild className={className}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </Button>
  );
}
