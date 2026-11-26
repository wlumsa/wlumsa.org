import type { Media, Social } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { GetStartedButton } from "./button";
import styles from "./Hero.module.css";

interface HeroProps {
  mediaDocs: Media[];
  socialLinks: Social[];
}

export default function Hero({ mediaDocs, socialLinks }: HeroProps) {
  const photo = mediaDocs[0];

  return (
    <section
      id="hero"
      aria-labelledby="hero-greeting"
      className="hero relative min-h-screen w-full overflow-hidden"
    >
      {photo?.url ? (
        <Image
          fill
          priority
          sizes="100vw"
          src={photo.url}
          alt=""
          className="scale-105 object-cover blur-sm"
        />
      ) : (
        <div className="absolute inset-0 bg-[#2e046d]" />
      )}
      <div className="absolute inset-0 bg-black/40" />

      <div className="hero-content relative text-center">
        <div className="max-w-lg">
          <h1 id="hero-greeting" className={styles.greeting}>
            <Image
              src="/Assalamu-aleykum.svg"
              alt="Assalamu alaikum"
              width={720}
              height={280}
              className="mx-auto mb-5 h-auto w-full max-w-sm"
            />
          </h1>
          <blockquote className={`mb-5 text-white ${styles.verse}`}>
            “The believers are but brothers, so make settlement between your
            brothers. And fear Allāh that you may receive mercy.” (Quran&nbsp;49:10)
          </blockquote>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfwn-5xuz58a9nzINqZoofyiMr-C7lphMs5KesnzVOB1jrXNg/viewform"
              className={`inline-flex h-12 items-center justify-center rounded-lg bg-[#2e046d] px-6 font-semibold text-[#e7ac3b] ${styles.action}`}
            >
              Donate
            </Link>
            <GetStartedButton
              href="/guidebook"
              variant="secondary"
              className="h-12 whitespace-nowrap rounded-lg px-6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none motion-reduce:[&_*]:transition-none"
              style={{
                backgroundColor: "#e7ac3b",
                color: "#1a1200",
                border: "none",
              }}
            >
              Become a Member
            </GetStartedButton>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {socialLinks.map(({ id, title, link, icon }) =>
              typeof link === "object" && link.url ? (
                <Link
                  key={id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className={`grid size-11 place-items-center rounded-lg text-[#e7ac3b] ${styles.action}`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 50 50"
                    className="size-8 fill-current stroke-gray-600"
                  >
                    <path d={icon} />
                  </svg>
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
