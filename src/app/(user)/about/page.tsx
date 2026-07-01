import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import Resource from "@/components/UI/Resource";
import logo from "../../../logo.png";

const constitutionUrl =
  "https://docs.google.com/document/d/e/2PACX-1vTv6tG1GpHwkZBaN5pt2Reo12Zfi5CSsA8ZQw6t_yy2oxZ9r27gaFbRY7aL9PCUNuScvZjfT56rrPpY/pub";

const values = [
  {
    title: "Faith",
    description:
      "Creating space for prayer, reflection, learning, and spiritual growth on campus.",
  },
  {
    title: "Community",
    description:
      "Helping Muslim students feel known, supported, and connected throughout the year.",
  },
  {
    title: "Service",
    description:
      "Serving students and the wider campus through events, resources, and outreach.",
  },
];

const services = [
  "Jummah prayers and daily jamaat",
  "Halaqas, tafsir, workshops, and Q&A sessions",
  "Ramadan iftars, taraweeh, qiyam nights, and suhoor support",
  "Sports drop-ins, socials, and community gatherings",
  "Mentorship, speaker panels, study sessions, and career support",
  "Dawah, charity projects, and campus awareness initiatives",
];

export default function About() {
  return (
    <main className="bg-base-100 text-base-content">
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
              Wilfrid Laurier University
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
              About Laurier MSA
            </h1>
            <p className="mt-5 text-base leading-relaxed text-base-content/80 sm:text-lg">
              The Laurier Muslim Students&apos; Association is a student-run
              organization founded in 2010. We support Muslim students at
              Laurier through prayer services, Islamic learning, community
              events, and opportunities to serve the campus around us.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/guidebook"
                className="btn btn-primary border-0 text-secondary shadow-sm transition duration-200 hover:scale-105 hover:bg-secondary hover:text-primary"
              >
                Become a Member
              </Link>
              <Link
                href="#constitution"
                className="btn border border-base-300 bg-base-100 text-base-content shadow-sm transition duration-200 hover:border-primary/40 hover:bg-base-200"
              >
                View Constitution
              </Link>
            </div>
          </div>

          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:h-40 sm:w-40 md:mx-0">
            <Image
              src={logo}
              alt="Laurier MSA logo"
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-base-300 bg-base-200/60">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {values.map((value) => (
            <article key={value.title} className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-primary">
                {value.title}
              </h2>
              <p className="text-sm leading-relaxed text-base-content/75 sm:text-base">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-base leading-relaxed text-base-content/80">
              Our work changes with the needs of students, but the goal stays
              the same: make it easier to practice, learn, gather, and grow at
              Laurier.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm leading-relaxed text-base-content/80 shadow-sm"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-content">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-center lg:px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
            <HeartHandshake className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Find your place in the community.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
              Join the MSA guidebook to get connected with events, prayer
              spaces, resources, and student updates.
            </p>
          </div>
          <Link
            href="/guidebook"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-primary transition duration-200 hover:scale-105"
          >
            Get Involved
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
        id="constitution"
      >
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Constitution
            </h2>
            <p className="mt-4 text-base leading-relaxed text-base-content/80">
              Our constitution outlines the principles, governance, and
              responsibilities that guide Laurier MSA.
            </p>
            <div className="mt-6">
              <Resource
                title="Open Laurier MSA Constitution"
                url={constitutionUrl}
              />
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm lg:block">
            <div className="border-b border-base-300 bg-base-200 px-5 py-3 text-sm font-medium text-base-content/75">
              Official Laurier MSA Constitution
            </div>
            <iframe
              width="100%"
              height="560"
              className="h-[560px] bg-base-100"
              src={`${constitutionUrl}?embedded=true`}
              allowFullScreen
              title="MSA Constitution"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
