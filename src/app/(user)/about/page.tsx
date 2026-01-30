import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../../../logo.png";
import { fetchServices } from '@/Utils/datafetcher';
import type { Service } from '@/payload-types';

export default async function About() {
  let servicesInfo: Service[] = []

  try {
    servicesInfo = await fetchServices()
  } catch (error) {
    console.error('Error fetching services:', error)
  }

  return (
    <div className="bg-base-100">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-10">
        <section className="pt-24 sm:pt-28">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <Image
                src={logo}
                className="h-48 w-48 rounded-2xl sm:h-56 sm:w-56"
                alt="MSA Logo"
                priority
              />
            </div>
            <div className="space-y-5">
              
              <h1 className="text-5xl font-bold text-primary sm:text-6xl">
                About Us
              </h1>
              <p className="text-lg text-neutral/90">
                The <strong className="text-primary">Laurier Muslim Student Association (MSA)</strong> is a student-run organization at Laurier founded in 2010. We bring students together to practice faith, serve the community, and promote awareness and understanding of Islam on campus.
              </p>
              <div className="grid gap-4 pt-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-primary/40 bg-white p-5 shadow-sm dark:border-primary-700/50 dark:bg-base-200">
                  {/* <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div> */}
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Founded</p>
                  <p className="text-3xl font-bold text-secondary">2010</p>
                </div>
                <div className="rounded-2xl border border-primary/40 bg-white p-5 shadow-sm dark:border-primary-700/50 dark:bg-base-200">
                  {/* <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div> */}
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Members</p>
                  <p className="text-3xl font-bold text-secondary">250+</p>
                </div>
                <div className="rounded-2xl border border-primary/40 bg-white p-5 shadow-sm dark:border-primary-700/50 dark:bg-base-200">
                  {/* <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div> */}
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Focus</p>
                  <p className="text-3xl font-bold text-secondary">Community</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16" id="services">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Our Services</h2>
            <p className="max-w-2xl text-lg font-medium text-neutral/90">
              <span className="text-primary">Our Mission</span> is to nurture faith, knowledge, and community for students throughout their journey.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group card h-full rounded-2xl border-0 bg-white/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-base-200/80">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">Weekly Services</h3>
              <p className="text-sm leading-relaxed text-neutral/80 dark:text-neutral/70">
                Jummah Prayers, Halaqas, Daily Jamaat, Boothing (MSA, Dawah, Charity)
              </p>
            </div>

            <div className="group card h-full rounded-2xl border-0 bg-white/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-base-200/80">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">Speaker & Religious Events</h3>
              <p className="text-sm leading-relaxed text-neutral/80 dark:text-neutral/70">
                Workshops, Revert Support, Fiqh Q&A, Tafsir, Khateeb Training
              </p>
            </div>

            <div className="group card h-full rounded-2xl border-0 bg-white/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-base-200/80">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">Professional Development</h3>
              <p className="text-sm leading-relaxed text-neutral/80 dark:text-neutral/70">
                Mentorship Programs, Speaker Panels, Career Workshops, Study Sessions, Resume Critiques
              </p>
            </div>

            <div className="group card h-full rounded-2xl border-0 bg-white/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-base-200/80">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">Ramadan</h3>
              <p className="text-sm leading-relaxed text-neutral/80 dark:text-neutral/70">
                Taraweeh, Qiyam Nights, Suhoor Packages, Iftars, Fundraising Projects
              </p>
            </div>

            <div className="group card h-full rounded-2xl border-0 bg-white/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-base-200/80">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">Community Events</h3>
              <p className="text-sm leading-relaxed text-neutral/80 dark:text-neutral/70">
                Sisters' Nights, Sports Drop-Ins, Paint Night, Grand Iftar, Auction Night, One Ummah Bazaar
              </p>
            </div>
            <Link href="/guidebook">
              <div className="group relative overflow-hidden rounded-3xl bg-primary p-8 shadow-lg transition-all duration-200 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/30"></div>
                <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-purple-500/20"></div>
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Get Involved</h3>
                    <p className="mt-3 text-lg text-white">
                      Join our community and be part of something meaningful.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-primary  transition-all duration-200 group-hover:gap-3">
                    Learn More
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="pb-16" id="constitution">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Constitution</h2>
            <p className="max-w-2xl text-base text-neutral/80">
              Our guiding principles, governance, and member commitments.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg dark:border-base-700 dark:bg-base-200">
              <div className="border-b border-base-300/70 bg-base-100/80 px-6 py-4 text-sm text-neutral/70 dark:border-base-700/70 dark:bg-base-200/60">
                Official Laurier MSA Constitution
              </div>
              <iframe
                width="100%"
                height="600px"
                className="bg-base-100"
                src="https://docs.google.com/document/d/e/2PACX-1vTv6tG1GpHwkZBaN5pt2Reo12Zfi5CSsA8ZQw6t_yy2oxZ9r27gaFbRY7aL9PCUNuScvZjfT56rrPpY/pub?embedded=true"
                allowFullScreen
                title="MSA Constitution"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="https://docs.google.com/document/d/e/2PACX-1vTv6tG1GpHwkZBaN5pt2Reo12Zfi5CSsA8ZQw6t_yy2oxZ9r27gaFbRY7aL9PCUNuScvZjfT56rrPpY/pub"
              target="_blank"
              className="btn btn-primary border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary"
            >
              View on Google Docs
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

