import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./studentResources.module.css";

export const metadata: Metadata = {
  title: "Student Resources | WLU MSA",
  description:
    "A curated guide to essential academic, career, wellness, and Muslim student resources at Wilfrid Laurier University.",
};

type Resource = {
  title: string;
  question: string;
  description: string;
  href: string;
  external?: boolean;
};

const sections = [
  {
    id: "academics",
    title: "Academic Essentials",
    description: "The four tools you will use to plan and manage your degree.",
    resources: [
      {
        title: "MyLearningSpace",
        question: "What is happening in my courses?",
        description:
          "Open course content, announcements, assignments, quizzes, and grades in Laurier’s learning platform.",
        href: "https://mylearningspace.wlu.ca/",
        external: true,
      },
      {
        title: "LORIS",
        question: "Where do I manage my student record?",
        description:
          "Register for courses, review your account, check grades, and access funding information.",
        href: "https://loris.wlu.ca/",
        external: true,
      },
      {
        title: "Visual Schedule Builder",
        question: "Which timetable works for me?",
        description:
          "Compare conflict-free schedules before registering. Always confirm restrictions and availability in LORIS.",
        href: "https://scheduleme.wlu.ca/",
        external: true,
      },
      {
        title: "Academic Calendar",
        question: "What does my program require?",
        description:
          "Find official program requirements, course descriptions, academic rules, and important dates.",
        href: "https://academic-calendar.wlu.ca/",
        external: true,
      },
    ] satisfies Resource[],
  },
  {
    id: "career",
    title: "Career & Experience",
    description:
      "Practical places to find work, build skills, and plan what comes next.",
    resources: [
      {
        title: "Navigator",
        question: "Where can I find experience?",
        description:
          "Browse student jobs, Laurier Work-Study roles, workshops, appointments, and volunteer opportunities.",
        href: "https://navigator.wlu.ca/",
        external: true,
      },
      {
        title: "Career Centre",
        question: "Can someone help with my next step?",
        description:
          "Get support with career planning, résumés, interviews, job searches, and further education.",
        href: "https://students.wlu.ca/career-and-experiential-learning/career-and-employment-support/index.html",
        external: true,
      },
      {
        title: "Forage",
        question: "How can I try a role before applying?",
        description:
          "Complete free, self-paced job simulations designed by employers across a range of industries.",
        href: "https://www.theforage.com/",
        external: true,
      },
      {
        title: "FSWEP",
        question: "Interested in federal public service?",
        description:
          "Explore paid student employment opportunities across Government of Canada organizations.",
        href: "https://www.canada.ca/en/government/publicservice/workforce/staffing/mobility/student-employment-programs-federal-government/federal-student-work-experience-program.html",
        external: true,
      },
    ] satisfies Resource[],
  },
  {
    id: "support",
    title: "Support & Wellbeing",
    description:
      "People and services to turn to when university feels difficult to navigate.",
    resources: [
      {
        title: "Academic Advising",
        question: "Am I on the right academic path?",
        description:
          "Connect with advising and student success services for program planning and study support.",
        href: "https://students.wlu.ca/academics/support-and-advising/index.html",
        external: true,
      },
      {
        title: "Student Wellness Centre",
        question: "Where can I get health support?",
        description:
          "Access confidential physical, emotional, and mental health services on Laurier campuses.",
        href: "https://students.wlu.ca/support-and-wellness/student-wellness-centre/index.html",
        external: true,
      },
      {
        title: "Accessible Learning",
        question: "Do I need academic accommodations?",
        description:
          "Learn about accommodations and support for students with disabilities or suspected disabilities.",
        href: "https://students.wlu.ca/academics/support-and-advising/accessible-learning/index.html",
        external: true,
      },
      {
        title: "Financial Aid",
        question: "What help is available for school costs?",
        description:
          "Find information about OSAP, out-of-province funding, disability funding, and other financial assistance.",
        href: "https://students.wlu.ca/finances/financial-aid/index.html",
        external: true,
      },
    ] satisfies Resource[],
  },
  {
    id: "muslim-life",
    title: "Muslim Student Life",
    description:
      "WLU MSA guides for the everyday questions that matter to our community.",
    resources: [
      {
        title: "Prayer Information",
        question: "Where and when can I pray?",
        description:
          "Find campus prayer spaces, Jumu’ah details, and current prayer-time information.",
        href: "/prayerinfo",
      },
      {
        title: "Halal Food Directory",
        question: "Where can I find halal food?",
        description:
          "Browse nearby restaurants and food options collected for Muslim students in Waterloo.",
        href: "/halalfood",
      },
      {
        title: "Housing Guide",
        question: "How do I find a place to live?",
        description:
          "Start with trusted housing sites, local community groups, rental safety tips, and tenant resources.",
        href: "/housing",
      },
      {
        title: "MSA Events",
        question: "How can I meet the community?",
        description:
          "See upcoming gatherings, programs, and opportunities to connect with Muslim students at Laurier.",
        href: "/events",
      },
    ] satisfies Resource[],
  },
];

export default function StudentResourcesPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <header className="border-b border-base-300 pb-6 text-center sm:pb-8">
          <h1
            className={`font-heading mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-5xl ${styles.brandText}`}
          >
            Student Resources
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-base-content/75 sm:text-lg">
            Essential Laurier and <span translate="no">WLU MSA</span> links for
            academics, work, wellbeing, and campus life.
          </p>

          <nav
            aria-labelledby="resource-categories-heading"
            className="mt-7 text-center sm:mt-8"
          >
            <h2
              id="resource-categories-heading"
              className="font-heading text-sm font-bold text-base-content"
            >
              Browse by Category
            </h2>

            <ul className="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-2 lg:hidden">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`flex min-h-14 touch-manipulation items-center justify-center rounded-md border border-base-300 bg-base-100 px-4 py-2 text-center text-sm font-semibold leading-snug text-base-content transition-[background-color,border-color,color] hover:border-primary/30 hover:bg-base-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 ${styles.categoryAction}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mx-auto mt-3 hidden w-fit max-w-full flex-wrap justify-center gap-1 rounded-md border border-base-300 bg-base-200/70 p-1 lg:flex">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`flex min-h-10 touch-manipulation items-center justify-center rounded px-4 py-2 text-center text-sm font-semibold text-base-content/70 transition-[background-color,box-shadow,color] hover:bg-base-100 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content focus-visible:ring-offset-2 ${styles.categoryAction}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
          <div className="space-y-8 sm:space-y-10">
            {sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-20 border-b border-base-300 pb-8 last:border-b-0 last:pb-0 sm:scroll-mt-24 sm:pb-10"
              >
                <div>
                  <div className="sticky top-16 z-20 -mx-4 border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur-sm sm:static sm:z-auto sm:mx-0 sm:border-b-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
                    <h2
                      id={`${section.id}-heading`}
                      className={`font-heading text-balance text-xl font-bold sm:text-3xl ${styles.brandText}`}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-base-content/75 sm:mt-3 sm:text-base">
                    {section.description}
                  </p>
                </div>

                <div className="mt-6 grid gap-x-12 gap-y-7 sm:mt-8 sm:gap-y-8 md:grid-cols-2">
                  {section.resources.map((resource) => (
                    <ResourceItem key={resource.title} resource={resource} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-start justify-between gap-4 border-t border-base-300 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:pt-8">
          <p className="text-sm text-base-content/70">
            Looking for forms, local organizations, or religious material?
          </p>
          <Link
            href="/resources"
            className={`decoration-current/30 group inline-flex min-h-10 touch-manipulation items-center gap-2 text-sm font-semibold underline underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 ${styles.textAction}`}
          >
            Browse All Resources
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

function ResourceItem({ resource }: { resource: Resource }) {
  const Arrow = resource.external ? ArrowUpRight : ArrowRight;
  const actionLabel = resource.external
    ? `Open ${resource.title}`
    : `View ${resource.title}`;

  return (
    <article className="flex h-full min-w-0 flex-col border-t border-base-300 pt-5">
      <h3
        translate="no"
        className="font-heading text-balance text-xl font-bold text-base-content"
      >
        {resource.title}
      </h3>
      <p className="mt-3 text-sm font-semibold leading-snug text-base-content/85">
        {resource.question}
      </p>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-base-content/75">
        {resource.description}
      </p>

      <div className="mt-auto pt-5">
        {resource.external ? (
          <a
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${actionLabel} (opens in a new tab)`}
            className="group inline-flex min-h-11 w-full touch-manipulation items-center justify-between gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-secondary transition-[box-shadow,transform] hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 motion-reduce:transform-none sm:w-auto sm:justify-start sm:px-3.5"
          >
            {actionLabel}
            <Arrow
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </a>
        ) : (
          <Link
            href={resource.href}
            className="group inline-flex min-h-11 w-full touch-manipulation items-center justify-between gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-secondary transition-[box-shadow,transform] hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 motion-reduce:transform-none sm:w-auto sm:justify-start sm:px-3.5"
          >
            {actionLabel}
            <Arrow
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
