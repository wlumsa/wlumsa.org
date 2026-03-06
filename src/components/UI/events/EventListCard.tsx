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
  tone?: Tone;
}

type Tone = "upcoming" | "recurring" | "past";

const DESCRIPTION_PREVIEW_CHARS = 150;
const BASE_TONE_CLASSES = {
  card: "border-base-content/15 bg-base-100 ring-1 ring-base-content/10",
  date: "rounded-md border border-base-300 bg-base-100 px-2 py-0.5 text-base-content/80",
  badge: "border border-base-300 bg-base-100 text-base-content/70",
  cta: "bg-primary text-primary-content shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100",
  secondaryCta: "border border-base-300 bg-base-100 text-base-content shadow-sm shadow-base-content/10 hover:bg-base-200 hover:shadow-md hover:shadow-base-content/20 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content/20 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100",
  readMore: "text-base-content/80 hover:text-base-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content/20 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100",
} as const;

const TONE_CLASSES: Record<Tone, typeof BASE_TONE_CLASSES> = {
  upcoming: BASE_TONE_CLASSES,
  recurring: BASE_TONE_CLASSES,
  past: BASE_TONE_CLASSES,
};

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

  const isDescriptionLong = description.length > DESCRIPTION_PREVIEW_CHARS;
  const previewDescription = description.length > DESCRIPTION_PREVIEW_CHARS
    ? `${description.slice(0, DESCRIPTION_PREVIEW_CHARS).trimEnd()}…`
    : description;
  const descriptionToShow = isDescriptionExpanded || !isDescriptionLong
    ? description
    : previewDescription;
  const dateLabelParts = dateLabel
    .split(/\n|\s\|\s/)
    .map((part) => part.trim())
    .filter(Boolean);
  const primaryDateLabel = dateLabelParts[0] ?? "Date TBD";
  const secondaryDateLabel = dateLabelParts.slice(1).join(" · ");
  const normalizedLocationLink = locationLink?.trim()
    ? (locationLink.startsWith("http://") || locationLink.startsWith("https://")
      ? locationLink
      : `https://${locationLink}`)
    : null;
  const hasActions = Boolean(normalizedLocationLink || link);
  const toneClasses = TONE_CLASSES[tone];

  return (
    <article className={`group relative overflow-hidden rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow,border-color,ring-color] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-0.5 hover:border-base-content/20 hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)] hover:ring-base-content/15 ${toneClasses.card}`}>
      <div className={`grid gap-0 ${imageUrl ? "md:grid-cols-[1fr_16rem] lg:grid-cols-[1fr_18rem]" : ""}`}>
        <div className="relative flex h-full min-w-0 flex-col p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                {categoryLabel ? (
                  <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium tracking-[0.08em] ${toneClasses.badge}`}>
                    {categoryLabel}
                  </span>
                ) : null}
                <p className={`inline-flex max-w-full flex-col items-start gap-0.5 whitespace-normal text-xs font-medium tracking-[0.04em] sm:flex-row sm:items-center sm:gap-1 sm:whitespace-nowrap ${toneClasses.date}`}>
                  <span className="leading-tight">{primaryDateLabel}</span>
                  {secondaryDateLabel ? (
                    <>
                      <span aria-hidden="true" className="hidden sm:inline">|</span>
                      <span className="leading-tight">{secondaryDateLabel}</span>
                    </>
                  ) : null}
                </p>
              </div>

              <h3 className="mt-3 min-w-0 text-balance text-lg font-semibold leading-snug text-base-content sm:text-xl">
                {title}
              </h3>
            </div>

            {imageUrl ? (
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-base-300 bg-base-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:h-32 sm:w-32 md:hidden">
                <Image
                  src={imageUrl}
                  alt={imageAlt ?? `${title} image`}
                  width={128}
                  height={128}
                  sizes="(max-width: 640px) 112px, 128px"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ) : null}
          </div>

          <p id={descriptionId} className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-base-content/80 sm:mt-4">
            {descriptionToShow}
          </p>
          {isDescriptionLong ? (
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              aria-expanded={isDescriptionExpanded}
              aria-controls={descriptionId}
              className={`mt-2 inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium underline underline-offset-4 transition-colors ${toneClasses.readMore}`}
            >
              {isDescriptionExpanded ? "Show Less" : "Read More"}
            </button>
          ) : null}

          <div className="mt-auto grid gap-3 border-t border-base-300 pt-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            {location ? (
              <p className="inline-flex items-start gap-1.5 text-sm text-base-content/75">
                <svg className="h-3.5 w-3.5 text-base-content/60" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9.69 18.933a.75.75 0 0 0 .62 0C13.645 17.46 17 13.937 17 10A7 7 0 1 0 3 10c0 3.937 3.355 7.46 6.69 8.933ZM10 11.5A2.5 2.5 0 1 0 10 6a2.5 2.5 0 0 0 0 5.5Z" clipRule="evenodd" />
                </svg>
                <span className="max-w-full break-words">{location}</span>
              </p>
            ) : <span className="text-sm text-base-content/45">Location TBD</span>}

            {hasActions ? (
              <div className="flex flex-wrap items-center gap-2">
                {normalizedLocationLink ? (
                  <a
                    href={normalizedLocationLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:w-fit ${toneClasses.secondaryCta}`}
                  >
                    Get Directions
                  </a>
                ) : null}
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:w-fit ${toneClasses.cta}`}
                  >
                    View Event
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
          <div className={`relative hidden overflow-hidden border-l border-base-300 bg-base-100 md:block ${
            isDescriptionExpanded ? "md:h-56 md:self-start lg:h-64" : "md:h-auto md:self-stretch"
          }`}>
            <Image
              src={imageUrl}
              alt={imageAlt ?? `${title} image`}
              width={288}
              height={288}
              sizes="(min-width: 1024px) 288px, 256px"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
