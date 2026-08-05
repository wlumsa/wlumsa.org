"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  Beef,
  Clock3,
  Croissant,
  ExternalLink,
  Flame,
  Globe,
  MapPin,
  Phone,
  Search,
  ShoppingCart,
  Snowflake,
  Star,
  Store,
} from "lucide-react";
import styles from "@/styles/directory.module.css";

interface GroceryStore {
  id: number;
  name: string;
  category: string;
  halalCertification: string;
  shortDescription: string;
  location: string;
  googleMapsLink?: string | null;
  website?: string | null;
  phone?: string | null;
  hours?: string | null;
  specialties?: { specialty: string }[];
  image?: { url: string; alt?: string } | null;
  is_on_campus: boolean;
  priceRange?: string | null;
  updatedAt?: string;
  createdAt?: string;
}

interface GroceryStoresClientProps {
  groceryStores: GroceryStore[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "full-grocery": <ShoppingCart size={15} />,
  "halal-meat": <Beef size={15} />,
  international: <Globe size={15} />,
  specialty: <Star size={15} />,
  convenience: <Store size={15} />,
  bakery: <Croissant size={15} />,
  spice: <Flame size={15} />,
  frozen: <Snowflake size={15} />,
};

function toLabel(value: string) {
  if (!value) return "";

  const labels: Record<string, string> = {
    certified: "Halal certified",
    "muslim-owned": "Muslim owned",
    "halal-friendly": "Halal friendly",
    "not-specified": "Not specified",
  };

  return (
    labels[value] ??
    value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

function priceLabel(value?: string | null) {
  const price = value ? Number.parseInt(value, 10) : Number.NaN;
  return Number.isFinite(price) && price > 0
    ? "$".repeat(Math.min(price, 4))
    : null;
}

function useSlashToFocus(ref: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTyping
      ) {
        event.preventDefault();
        ref.current?.focus();
      }
    };

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, [ref]);
}

function StoreCard({
  store,
  prioritizeImage = false,
}: {
  store: GroceryStore;
  prioritizeImage?: boolean;
}) {
  const categoryIcon = CATEGORY_ICONS[store.category] ?? <Store size={15} />;
  const price = priceLabel(store.priceRange);
  const specialties = store.specialties
    ?.map(({ specialty }) => specialty.trim())
    .filter(Boolean);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition-[transform,box-shadow,border-color] duration-200 motion-reduce:transition-none md:hover:-translate-y-0.5 md:hover:border-base-content/25 md:hover:shadow-md ${styles.cardSurface}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-base-200">
        {store.image?.url ? (
          <Image
            src={store.image.url}
            alt={store.image.alt || `${store.name} storefront`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={prioritizeImage ? "eager" : "lazy"}
            className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none md:group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-base-content/45">
            <span className="rounded-full border border-base-content/10 bg-base-content/5 p-3">
              {categoryIcon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-base-content/40">
              {toLabel(store.category)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-base-content/65">
          <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
            {categoryIcon}
            {toLabel(store.category)}
          </span>
          <span aria-hidden="true">·</span>
          <span>{toLabel(store.halalCertification)}</span>
          {price && (
            <>
              <span aria-hidden="true">·</span>
              <span aria-label={`Price range: ${price.length} out of 4`}>
                {price}
              </span>
            </>
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold leading-snug text-base-content">
            {store.name}
          </h2>
          {store.is_on_campus && (
            <span className="mt-0.5 shrink-0 rounded-full border border-accent/40 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
              On campus
            </span>
          )}
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-base-content/70">
          {store.shortDescription}
        </p>

        {specialties && specialties.length > 0 && (
          <p className="mt-3 text-sm leading-5 text-base-content/60">
            <span className="font-semibold text-base-content/75">
              Known for:
            </span>{" "}
            {specialties.slice(0, 3).join(", ")}
            {specialties.length > 3 && ` +${specialties.length - 3} more`}
          </p>
        )}

        <dl className="mt-5 space-y-2 border-t border-base-300 pt-4 text-sm text-base-content/65">
          <div className="flex min-w-0 items-start gap-2.5">
            <MapPin
              size={15}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-base-content/45"
              aria-hidden="true"
            />
            <dt className="sr-only">Address</dt>
            <dd className="line-clamp-2">{store.location}</dd>
          </div>
          {store.hours && (
            <div className="flex min-w-0 items-start gap-2.5">
              <Clock3
                size={15}
                strokeWidth={1.75}
                className="mt-0.5 shrink-0 text-base-content/45"
                aria-hidden="true"
              />
              <dt className="sr-only">Hours</dt>
              <dd className="line-clamp-2" title={store.hours}>
                {store.hours}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-auto pt-5">
          {store.googleMapsLink && (
            <a
              href={store.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content ${styles.primaryAction}`}
              aria-label={`Get directions to ${store.name}`}
            >
              <MapPin size={15} aria-hidden="true" />
              Get directions
            </a>
          )}

          {(store.website || store.phone) && (
            <div className="mt-2.5 flex gap-2">
              {store.website && (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg border border-base-content/15 px-3 py-2 text-sm font-semibold text-base-content/75 transition-[color,background-color,border-color] hover:border-base-content/30 hover:bg-base-content/5 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"
                  aria-label={`Visit ${store.name}'s website`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Website
                </a>
              )}
              {store.phone && (
                <a
                  href={`tel:${store.phone}`}
                  className="inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg border border-base-content/15 px-3 py-2 text-sm font-semibold text-base-content/75 transition-[color,background-color,border-color] hover:border-base-content/30 hover:bg-base-content/5 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"
                  aria-label={`Call ${store.name} at ${store.phone}`}
                >
                  <Phone size={14} aria-hidden="true" />
                  Call
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function GroceryStoresClient({
  groceryStores,
}: GroceryStoresClientProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useSlashToFocus(inputRef);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return groceryStores;

    return groceryStores.filter((store) =>
      [
        store.name,
        store.shortDescription,
        store.category,
        store.halalCertification,
        store.location,
        store.specialties?.map(({ specialty }) => specialty).join(" ") ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [groceryStores, query]);

  return (
    <div className="min-h-screen bg-base-100 px-4 pb-16 pt-24 text-base-content sm:px-8">
      <section className="mx-auto max-w-6xl pb-7 pt-8 text-center sm:pb-9 sm:pt-10">
        <h1
          className={`font-serif text-3xl font-bold sm:text-4xl ${styles.brandText}`}
        >
          Halal Grocery Stores
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-base-content/70">
          Find halal grocery stores, meat shops, and specialty markets in KW
          Region.
        </p>

        <label className="sr-only" htmlFor="store-search">
          Search stores
        </label>
        <div
          className={`mx-auto mt-6 flex h-11 max-w-md items-center gap-2.5 rounded-xl border px-3.5 shadow-sm transition-[border-color,box-shadow] focus-within:border-base-content/45 focus-within:ring-2 focus-within:ring-base-content/10 ${styles.fieldSurface}`}
        >
          <Search
            size={17}
            strokeWidth={1.75}
            className="shrink-0 text-base-content/50"
            aria-hidden="true"
          />
          <input
            id="store-search"
            ref={inputRef}
            type="search"
            name="query"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search stores…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-base-content/45 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {!query && (
            <kbd className="hidden rounded border border-base-300 bg-base-200 px-1.5 py-0.5 text-[0.65rem] text-base-content/45 sm:inline">
              /
            </kbd>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl" aria-labelledby="results-heading">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="results-heading"
            className="text-sm font-medium text-base-content/60"
            aria-live="polite"
          >
            {query
              ? `${filtered.length} ${
                  filtered.length === 1 ? "result" : "results"
                }`
              : `${groceryStores.length} ${
                  groceryStores.length === 1 ? "store" : "stores"
                }`}
          </h2>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className={`text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-base-content ${styles.textAction}`}
            >
              Clear search
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((store, index) => (
              <StoreCard
                key={store.id}
                store={store}
                prioritizeImage={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-base-300 px-6 py-16 text-center">
            <Search
              size={30}
              strokeWidth={1.5}
              className="mx-auto text-base-content/30"
              aria-hidden="true"
            />
            <p className="mt-4 font-serif text-lg font-bold">No stores found</p>
            <p className="mt-1 text-sm text-base-content/60">
              Try a different store, location, or specialty.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
