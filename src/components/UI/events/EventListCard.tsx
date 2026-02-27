"use client";

import { useId, useState } from "react";
import Image from "next/image";

interface EventListCardProps {
  title: string;
  dateLabel: string;
  description: string;
  location?: string | null;
  locationLink?: string | null;
  imageUrl?: string | null;
  imageAlt?: string;
  link?: string | null;
  categoryLabel?: string;
  tone?: "upcoming" | "recurring" | "past";
}

const DESCRIPTION_PREVIEW_CHARS = 150;
const TITLE_PREVIEW_CHARS = 72;

export default function EventListCard({
  title,
  dateLabel,
  description,
  location,
  locationLink,
  imageUrl,
  imageAlt,
  link,
  categoryLabel,
  tone = "upcoming",
}: EventListCardProps) {
  const descriptionId = useId();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const previewTitle = title.length > TITLE_PREVIEW_CHARS
    ? `${title.slice(0, TITLE_PREVIEW_CHARS).trimEnd()}…`
    : title;

  const isDescriptionLong = description.length > DESCRIPTION_PREVIEW_CHARS;
  const previewDescription = description.length > DESCRIPTION_PREVIEW_CHARS
    ? `${description.slice(0, DESCRIPTION_PREVIEW_CHARS).trimEnd()}…`
    : description;
  const descriptionToShow = isDescriptionExpanded || !isDescriptionLong
    ? description
    : previewDescription;
  const normalizedLocationLink = locationLink?.trim()
    ? (locationLink.startsWith("http://") || locationLink.startsWith("https://")
      ? locationLink
      : `https://${locationLink}`)
    : null;

  const toneClasses = {
    upcoming: {
      card: "border-primary/25 bg-primary/5 ring-1 ring-primary/15",
      date: "rounded-md border border-primary/45 bg-primary/10 px-2 py-0.5 text-base-content",
      badge: "border border-primary/45 bg-primary/10 text-base-content",
      cta: "border border-primary/40 bg-base-100 text-base-content hover:bg-base-200",
      readMore: "text-base-content/80 hover:text-base-content",
    },
    recurring: {
      card: "border-secondary/25 bg-secondary/5 ring-1 ring-secondary/15",
      date: "rounded-md border border-secondary/45 bg-secondary/10 px-2 py-0.5 text-base-content",
      badge: "border border-secondary/45 bg-secondary/10 text-base-content",
      cta: "border border-secondary/40 bg-base-100 text-base-content hover:bg-base-200",
      readMore: "text-base-content/80 hover:text-base-content",
    },
    past: {
      card: "border-base-content/30 bg-base-200 ring-1 ring-base-content/15",
      date: "rounded-md border border-base-content/30 bg-base-200 px-2 py-0.5 text-base-content",
      badge: "border border-base-content/30 bg-base-200 text-base-content",
      cta: "border border-base-content/25 bg-base-100 text-base-content hover:bg-base-200",
      readMore: "text-base-content/80 hover:text-base-content",
    },
  }[tone];

  return (
    <article className={`group overflow-hidden rounded-2xl border transition-colors duration-200 ease-out hover:bg-base-100 ${toneClasses.card}`}>
      <div className={`grid gap-0 ${imageUrl ? "md:grid-cols-[1fr_13rem]" : ""}`}>
        <div className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {categoryLabel ? (
              <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${toneClasses.badge}`}>
                {categoryLabel}
              </span>
            ) : null}
            <p className={`inline-flex max-w-full items-center text-xs font-medium uppercase tracking-[0.08em] sm:tracking-[0.12em] ${toneClasses.date}`}>
              {dateLabel}
            </p>
          </div>

          <h3 className="mt-3 text-balance text-lg font-semibold leading-snug text-base-content sm:text-xl">
            {previewTitle}
          </h3>

          <p id={descriptionId} className="mt-3 whitespace-pre-line text-sm leading-relaxed text-base-content/80">
            {descriptionToShow}
          </p>
          {isDescriptionLong ? (
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              aria-expanded={isDescriptionExpanded}
              aria-controls={descriptionId}
              className={`mt-2 text-xs font-medium underline underline-offset-4 transition-colors ${toneClasses.readMore}`}
            >
              {isDescriptionExpanded ? "Show less" : "Read more"}
            </button>
          ) : null}

          <div className="mt-5 grid gap-3 border-t border-base-300 pt-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            {location ? (
              <p className="inline-flex items-center gap-1.5 text-sm text-base-content/75">
                <svg className="h-3.5 w-3.5 text-base-content/60" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9.69 18.933a.75.75 0 0 0 .62 0C13.645 17.46 17 13.937 17 10A7 7 0 1 0 3 10c0 3.937 3.355 7.46 6.69 8.933ZM10 11.5A2.5 2.5 0 1 0 10 6a2.5 2.5 0 0 0 0 5.5Z" clipRule="evenodd" />
                </svg>
                <span className="max-w-full break-words">{location}</span>
              </p>
            ) : <span className="text-sm text-base-content/45">Location TBD</span>}

            {(normalizedLocationLink || link) ? (
              <div className="flex flex-wrap items-center gap-2">
                {normalizedLocationLink ? (
                  <a
                    href={normalizedLocationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center justify-center gap-1 rounded-full border border-base-content/25 bg-base-100 px-3 py-2 text-sm font-medium text-base-content transition-colors hover:bg-base-200"
                  >
                    Get Directions
                  </a>
                ) : null}
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex w-fit items-center justify-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${toneClasses.cta}`}
                  >
                    See Details
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.69l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                    </svg>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {imageUrl ? (
          <div className="relative h-36 overflow-hidden border-t border-base-300 md:h-auto md:border-t-0 md:border-l">
            <Image
              src={imageUrl}
              alt={imageAlt ?? `${title} image`}
              fill
              sizes="(min-width: 768px) 208px, 100vw"
              className="object-contain object-center p-3"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
