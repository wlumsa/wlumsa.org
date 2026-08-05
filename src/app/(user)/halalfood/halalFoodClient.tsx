"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  ChevronDown,
  ChevronUp,
  Columns2,
  Columns3,
  Columns4,
  ExternalLink,
  Filter,
  Info,
  LayoutList,
  MapPin,
  Search,
  Utensils,
  X,
} from "lucide-react";
import type { HalalDirectory } from "@/payload-types";
import styles from "@/styles/directory.module.css";

const cuisineOptions = [
  "All Cuisines",
  "Chinese",
  "Persian",
  "Shawarma",
  "Burgers",
  "Bangladeshi",
  "Chinese Indo Fusion",
  "Pakistani Food",
  "Chicken and Waffles",
  "Kabob",
  "Uyghur",
  "Chicken",
  "Indian Fusion Food",
  "Pizza",
];

const slaughterMethodOptions = [
  "All Methods",
  "Hand",
  "Machine",
  "Both",
  "N/A",
];

interface HalalFoodClientProps {
  halalDirectory: HalalDirectory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

type LayoutMode = "list" | "g2" | "g3" | "g4";

const numberFormatter = new Intl.NumberFormat("en-CA");

function humanize(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function methodLabel(value?: HalalDirectory["slaughtered"]) {
  const labels: Record<NonNullable<HalalDirectory["slaughtered"]>, string> = {
    hand: "Hand slaughtered",
    machine: "Machine slaughtered",
    both: "Hand & machine",
    "n/a": "Method not listed",
  };

  return value ? labels[value] : "Method not listed";
}

function RestaurantCard({
  restaurant,
  layoutMode,
  prioritizeImage = false,
}: {
  restaurant: HalalDirectory;
  layoutMode: LayoutMode;
  prioritizeImage?: boolean;
}) {
  const image =
    restaurant.image && typeof restaurant.image !== "number"
      ? restaurant.image
      : null;
  const isList = layoutMode === "list";
  const isCompact = layoutMode === "g4";

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border shadow-sm transition-[transform,box-shadow,border-color] duration-200 motion-reduce:transition-none md:hover:-translate-y-0.5 md:hover:border-base-content/25 md:hover:shadow-md ${
        styles.cardSurface
      } ${isList ? "sm:flex-row" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-base-200 ${
          isList
            ? "aspect-[16/10] sm:aspect-auto sm:min-h-44 sm:w-48 sm:shrink-0"
            : "aspect-[16/10]"
        }`}
      >
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || `${restaurant.name} restaurant`}
            fill
            sizes={
              isList
                ? "(max-width: 639px) 100vw, 192px"
                : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
            }
            priority={prioritizeImage}
            className="object-cover transition-transform duration-500 motion-reduce:transition-none md:group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-base-content/45">
            <span className="rounded-full border border-base-content/10 bg-base-content/5 p-3">
              <Utensils size={20} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-base-content/40">
              {humanize(restaurant.category)}
            </span>
          </div>
        )}

        {restaurant.is_on_campus && (
          <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-base-100/95 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-accent shadow-sm backdrop-blur-sm">
            On campus
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-base-content/65">
          <span className="font-semibold text-accent">
            {humanize(restaurant.category)}
          </span>
          <span aria-hidden="true">·</span>
          <span>{methodLabel(restaurant.slaughtered)}</span>
        </div>

        <h3 className="mt-1.5 text-pretty font-serif text-xl font-bold leading-snug text-base-content">
          {restaurant.name}
        </h3>
        <p
          className={`mt-1.5 text-sm leading-5 text-base-content/70 ${
            isList ? "" : "line-clamp-2"
          }`}
        >
          {restaurant.shortDescription}
        </p>

        <div className="mt-3 flex min-w-0 items-start gap-2.5 text-sm leading-5 text-base-content/60">
          <MapPin
            size={15}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <span className="line-clamp-2 break-words">
            {restaurant.location}
          </span>
        </div>

        <div
          className={`mt-auto gap-2 pt-4 ${
            isCompact ? "flex flex-col" : "flex"
          }`}
        >
          <a
            href={restaurant.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content ${styles.primaryAction}`}
            aria-label={`Get directions to ${restaurant.name}`}
          >
            <MapPin size={15} aria-hidden="true" />
            Directions
          </a>

          {restaurant.website && (
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg border border-base-content/15 px-3 py-2 text-sm font-semibold text-base-content/75 transition-[color,background-color,border-color] hover:border-base-content/30 hover:bg-base-content/5 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"
              aria-label={`Visit ${restaurant.name} website`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              Website
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function HalalFoodClient({
  halalDirectory,
  pagination,
}: HalalFoodClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const resultsRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const queryTerm = searchParams.get("query") || "";
  const selectedCuisine = searchParams.get("cuisine") || "All Cuisines";
  const selectedMethod = searchParams.get("method") || "All Methods";
  const selectedLocation = searchParams.get("location") || "All Locations";
  const requestedLayout = searchParams.get("layout");
  const layoutMode: LayoutMode = ["list", "g2", "g3", "g4"].includes(
    requestedLayout || ""
  )
    ? (requestedLayout as LayoutMode)
    : "list";

  const hasActiveFilters = Boolean(
    queryTerm ||
      selectedCuisine !== "All Cuisines" ||
      selectedMethod !== "All Methods" ||
      selectedLocation !== "All Locations"
  );
  const [showFilters, setShowFilters] = useState(hasActiveFilters);
  const activeFilters = [
    ...(queryTerm ? [{ key: "query", label: "Search", value: queryTerm }] : []),
    ...(selectedCuisine !== "All Cuisines"
      ? [{ key: "cuisine", label: "Cuisine", value: selectedCuisine }]
      : []),
    ...(selectedMethod !== "All Methods"
      ? [{ key: "method", label: "Method", value: selectedMethod }]
      : []),
    ...(selectedLocation !== "All Locations"
      ? [{ key: "location", label: "Location", value: selectedLocation }]
      : []),
  ];

  useEffect(() => {
    if (searchInputRef.current && searchInputRef.current.value !== queryTerm) {
      searchInputRef.current.value = queryTerm;
    }
  }, [queryTerm]);

  const replaceParams = (params: URLSearchParams) => {
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const updateFilter = (key: string, value: string, defaultValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");
    replaceParams(params);
  };

  const changeLayout = (layout: LayoutMode) => {
    const params = new URLSearchParams(searchParams.toString());
    if (layout === "list") {
      params.delete("layout");
    } else {
      params.set("layout", layout);
    }
    replaceParams(params);
  };

  const updateSearch = useDebouncedCallback((value: string) => {
    updateFilter("query", value.trim(), "");
  }, 300);

  const clearSearch = () => {
    updateSearch.cancel();
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
    updateFilter("query", "", "");
  };

  const clearAllFilters = () => {
    updateSearch.cancel();
    if (searchInputRef.current) searchInputRef.current.value = "";

    const params = new URLSearchParams(searchParams.toString());
    ["query", "cuisine", "method", "location", "page"].forEach((key) =>
      params.delete(key)
    );
    replaceParams(params);
  };

  const clearFilter = (key: string) => {
    if (key === "query") {
      clearSearch();
      return;
    }

    const defaults: Record<string, string> = {
      cuisine: "All Cuisines",
      method: "All Methods",
      location: "All Locations",
    };
    const defaultValue = defaults[key];
    if (!defaultValue) return;
    updateFilter(key, defaultValue, defaultValue);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    replaceParams(params);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    resultsRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const resultStart =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const resultEnd = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );
  const resultLayoutClasses = {
    list: "flex flex-col gap-3",
    g2: "grid grid-cols-1 gap-4 md:grid-cols-2",
    g3: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
    g4: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[layoutMode];

  return (
    <main className="min-h-screen bg-base-100 px-4 pb-16 pt-24 text-base-content sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl pb-6 pt-6 text-center sm:pb-8 sm:pt-8">
          <h1
            className={`text-balance font-serif text-3xl font-bold sm:text-4xl ${styles.brandText}`}
          >
            Halal Food
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-6 text-base-content/70 sm:text-base">
            Find halal restaurants and food options near Wilfrid Laurier
            University.
          </p>
        </header>

        <section aria-label="Directory controls" className="pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-base-content/60">
              Filter by cuisine, slaughter method, and location.
            </p>
            <div className="flex items-center gap-2">
              <LayoutSwitcher value={layoutMode} onChange={changeLayout} />
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                aria-controls="directory-filters"
                aria-expanded={showFilters}
                className={`inline-flex min-h-10 touch-manipulation items-center gap-2 rounded-lg border px-3 text-sm font-medium text-base-content/75 transition-[color,background-color,border-color] hover:border-base-content/25 hover:bg-base-content/5 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content ${styles.fieldSurface}`}
              >
                <Filter size={15} aria-hidden="true" />
                Filters
                {showFilters ? (
                  <ChevronUp size={15} aria-hidden="true" />
                ) : (
                  <ChevronDown size={15} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {showFilters && (
            <div
              id="directory-filters"
              className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="min-w-0">
                <label
                  htmlFor="restaurant-search"
                  className="mb-1.5 block text-sm font-semibold text-base-content/80"
                >
                  Search
                </label>
                <div
                  className={`flex min-h-11 items-center gap-2.5 rounded-lg border px-3 transition-[border-color,box-shadow] focus-within:border-base-content/45 focus-within:ring-2 focus-within:ring-base-content/10 ${styles.fieldSurface}`}
                >
                  <Search
                    size={17}
                    strokeWidth={1.75}
                    className="shrink-0 text-base-content/45"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    id="restaurant-search"
                    name="query"
                    type="search"
                    autoComplete="off"
                    spellCheck={false}
                    defaultValue={queryTerm}
                    onChange={(event) => updateSearch(event.target.value)}
                    placeholder="Restaurant name…"
                    className="peer min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-base-content/40 [&::-webkit-search-cancel-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="grid h-8 w-8 touch-manipulation place-items-center rounded-md text-base-content/45 transition-colors hover:bg-base-content/10 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content peer-placeholder-shown:pointer-events-none peer-placeholder-shown:invisible"
                    aria-label="Clear search"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <FilterSelect
                id="cuisine-filter"
                label="Cuisine"
                value={selectedCuisine}
                options={cuisineOptions}
                onChange={(value) =>
                  updateFilter("cuisine", value, "All Cuisines")
                }
              />
              <FilterSelect
                id="method-filter"
                label="Slaughter Method"
                value={selectedMethod}
                options={slaughterMethodOptions}
                onChange={(value) =>
                  updateFilter("method", value, "All Methods")
                }
              />
              <FilterSelect
                id="location-filter"
                label="Location"
                value={selectedLocation}
                options={["All Locations", "On Campus", "Off Campus"]}
                onChange={(value) =>
                  updateFilter("location", value, "All Locations")
                }
              />
            </div>
          )}

          {activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {activeFilters.map((filter) => (
                <button
                  key={`${filter.key}-${filter.value}`}
                  type="button"
                  onClick={() => clearFilter(filter.key)}
                  className="inline-flex min-h-9 touch-manipulation items-center gap-1.5 rounded-full border border-base-content/15 bg-base-200 px-3 text-xs font-medium text-base-content/75 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"
                  aria-label={`Remove ${filter.label.toLowerCase()} filter: ${
                    filter.value
                  }`}
                >
                  <span>
                    {filter.label}: {filter.value}
                  </span>
                  <X size={13} aria-hidden="true" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className={`min-h-9 touch-manipulation rounded-md px-2 text-xs font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content ${styles.textAction}`}
              >
                Clear All
              </button>
            </div>
          )}
        </section>

        <section
          ref={resultsRef}
          aria-labelledby="results-heading"
          className="mt-6 scroll-mt-24 border-t border-base-300 pt-4"
        >
          <div className="mb-3 flex min-h-8 items-center">
            <h2
              id="results-heading"
              className="text-sm font-medium tabular-nums text-base-content/60"
              aria-live="polite"
            >
              {pagination.total === 0
                ? "No restaurants found"
                : `${numberFormatter.format(
                    resultStart
                  )}–${numberFormatter.format(
                    resultEnd
                  )} of ${numberFormatter.format(
                    pagination.total
                  )} restaurants`}
            </h2>
          </div>

          {halalDirectory.length > 0 ? (
            <div className={resultLayoutClasses}>
              {halalDirectory.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  layoutMode={layoutMode}
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
              <h3 className="mt-4 font-serif text-lg font-bold">
                No Matches Found
              </h3>
              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-base-content/60">
                Try a different restaurant, cuisine, or location.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className={`mt-5 min-h-11 touch-manipulation rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content ${styles.primaryAction}`}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <nav
              aria-label="Directory pages"
              className="mt-7 flex items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => goToPage(pagination.page - 1)}
                disabled={!pagination.hasPrevPage}
                className="min-h-11 touch-manipulation rounded-lg border border-base-content/15 px-4 py-2 text-sm font-semibold text-base-content/75 transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-base-content/15 disabled:hover:bg-transparent disabled:hover:text-base-content/75"
              >
                Previous
              </button>
              <span className="text-sm tabular-nums text-base-content/60">
                Page {numberFormatter.format(pagination.page)} of{" "}
                {numberFormatter.format(pagination.totalPages)}
              </span>
              <button
                type="button"
                onClick={() => goToPage(pagination.page + 1)}
                disabled={!pagination.hasNextPage}
                className="min-h-11 touch-manipulation rounded-lg border border-base-content/15 px-4 py-2 text-sm font-semibold text-base-content/75 transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-base-content/15 disabled:hover:bg-transparent disabled:hover:text-base-content/75"
              >
                Next
              </button>
            </nav>
          )}

          <div className="mt-8 flex items-start gap-2.5 border-t border-base-300 pt-4 text-xs leading-5 text-base-content/65 sm:text-sm">
            <Info
              size={16}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <p>
              Halal practices and restaurant details can change. Confirm dietary
              requirements directly with the restaurant before ordering.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function LayoutSwitcher({
  value,
  onChange,
}: {
  value: LayoutMode;
  onChange: (layout: LayoutMode) => void;
}) {
  const options: {
    value: LayoutMode;
    label: string;
    icon: typeof LayoutList;
  }[] = [
    { value: "list", label: "List view", icon: LayoutList },
    { value: "g2", label: "2-column view", icon: Columns2 },
    { value: "g3", label: "3-column view", icon: Columns3 },
    { value: "g4", label: "4-column view", icon: Columns4 },
  ];

  return (
    <div
      className="hidden items-center rounded-lg border border-base-content/10 bg-base-200 p-1 sm:flex"
      role="group"
      aria-label="Results layout"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-label={option.label}
            aria-pressed={isActive}
            title={option.label}
            className={`grid h-8 w-9 touch-manipulation place-items-center rounded-md transition-[color,background-color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content ${
              isActive
                ? styles.activeControl
                : "text-base-content/60 hover:bg-base-content/10 hover:text-base-content"
            }`}
          >
            <Icon size={15} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-base-content/80"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-11 w-full rounded-lg border px-3 text-sm text-base-content transition-[border-color,box-shadow] focus-visible:border-base-content/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content/10 ${styles.fieldSurface}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
