"use client";

import { useEffect, useRef, useState } from "react";
import { HalalDirectory } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  LayoutList,
  Columns2,
  Columns3,
  Columns4,
} from "lucide-react";

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

interface FilterComponentProps {
  halalDirectory: HalalDirectory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  initialFilters: {
    query: string;
    cuisine: string;
    method: string;
    location: string;
    page: number;
    layout: string;
  };
}

type LayoutMode = "list" | "g2" | "g3" | "g4";

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timeoutId = setTimeout(() => {
      setMounted(true);
      const mq = window.matchMedia("(max-width: 640px)");
      const update = () => setIsSmall(mq.matches);

      update();

      if (mq.addEventListener) {
        mq.addEventListener("change", update);
      } else {
        (mq as MediaQueryList & { addListener?: (fn: () => void) => void }).addListener?.(update);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return mounted ? isSmall : false;
}

export default function HalalFoodClient({
  halalDirectory,
  pagination,
  initialFilters,
}: FilterComponentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const didInitLayoutRef = useRef(false);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("list");
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(initialFilters.cuisine);
  const [selectedMethod, setSelectedMethod] = useState(initialFilters.method);
  const [selectedCampusLocation, setSelectedCampusLocation] = useState(initialFilters.location);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isSmall = useIsSmallScreen();
  const queryTerm = searchParams.get("query") || "";
  const totalPages = pagination.totalPages;
  const effectiveLayout: LayoutMode = isSmall ? "list" : layoutMode;
  const activeFilters = [
    ...(selectedCuisine !== "All Cuisines" ? [{ label: "Cuisine", key: "cuisine", value: selectedCuisine }] : []),
    ...(selectedMethod !== "All Methods" ? [{ label: "Method", key: "method", value: selectedMethod }] : []),
    ...(selectedCampusLocation !== "All Locations"
      ? [{ label: "Location", key: "location", value: selectedCampusLocation }]
      : []),
    ...(queryTerm ? [{ label: "Search", key: "query", value: queryTerm }] : []),
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsHydrated(true);

    const timeoutId = setTimeout(() => {
      if (didInitLayoutRef.current || isSmall) return;

      const params = new URLSearchParams(window.location.search);
      const urlLayout = params.get("layout") as LayoutMode | null;

      if (urlLayout && ["list", "g2", "g3", "g4"].includes(urlLayout)) {
        setLayoutMode(urlLayout);
        try {
          localStorage.setItem("halalLayout", urlLayout);
        } catch {}
        didInitLayoutRef.current = true;
        return;
      }

      if (initialFilters.layout && ["list", "g2", "g3", "g4"].includes(initialFilters.layout)) {
        setLayoutMode(initialFilters.layout as LayoutMode);
        try {
          localStorage.setItem("halalLayout", initialFilters.layout);
        } catch {}
        didInitLayoutRef.current = true;
        return;
      }

      try {
        const saved = localStorage.getItem("halalLayout") as LayoutMode | null;
        if (saved && ["list", "g2", "g3", "g4"].includes(saved)) {
          setLayoutMode(saved);
        }
      } catch {}

      didInitLayoutRef.current = true;
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [initialFilters.layout, isSmall]);

  useEffect(() => {
    if (typeof window === "undefined" || !isHydrated || isSmall) return;

    try {
      localStorage.setItem("halalLayout", layoutMode);
    } catch {}

    const params = new URLSearchParams(searchParams.toString());
    if (params.get("layout") !== layoutMode) {
      params.set("layout", layoutMode);
      router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, {
        scroll: false,
      });
    }
  }, [isHydrated, isSmall, layoutMode, pathname, router, searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (e: KeyboardEvent) => {
      if (e.repeat || isSmall) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if (e.key === "1") setLayoutMode("list");
      if (e.key === "2") setLayoutMode("g2");
      if (e.key === "3") setLayoutMode("g3");
      if (e.key === "4") setLayoutMode("g4");

      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        if (!showFilters) setShowFilters(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isSmall, showFilters]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getListWrapperClasses = () => {
    switch (effectiveLayout) {
      case "g2":
        return "grid grid-cols-1 gap-4 md:grid-cols-2";
      case "g3":
        return "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3";
      case "g4":
        return "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4";
      case "list":
      default:
        return "flex flex-col gap-4";
    }
  };

  const updateFilterParams = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "All Cuisines" || value === "All Methods" || value === "All Locations") {
      params.delete(filterType);
    } else {
      params.set(filterType, value);
    }

    params.delete("page");

    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  };

  const clearFilter = (filterType: string) => {
    const params = new URLSearchParams(searchParams);

    if (filterType === "cuisine") {
      setSelectedCuisine("All Cuisines");
      params.delete("cuisine");
    }
    if (filterType === "method") {
      setSelectedMethod("All Methods");
      params.delete("method");
    }
    if (filterType === "location") {
      setSelectedCampusLocation("All Locations");
      params.delete("location");
    }
    if (filterType === "query") {
      params.delete("query");
    }

    params.delete("page");

    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  };

  const clearAllFilters = () => {
    setSelectedCuisine("All Cuisines");
    setSelectedMethod("All Methods");
    setSelectedCampusLocation("All Locations");

    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("cuisine");
    params.delete("method");
    params.delete("location");
    params.delete("page");

    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  };

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const LayoutSwitcher = () => {
    if (isSmall) return null;

    const options: { key: LayoutMode; label: string; icon: typeof LayoutList }[] = [
      { key: "list", label: "List", icon: LayoutList },
      { key: "g2", label: "2", icon: Columns2 },
      { key: "g3", label: "3", icon: Columns3 },
      { key: "g4", label: "4", icon: Columns4 },
    ];

    return (
      <div
        className="inline-flex items-center gap-1 rounded-lg border border-base-300 bg-base-200 p-1"
        role="group"
        aria-label="Switch layout"
      >
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = effectiveLayout === option.key;

          return (
            <button
              key={option.key}
              type="button"
              aria-label={`Switch to ${option.label === "List" ? "list" : `${option.label} column`} view`}
              aria-pressed={isActive}
              onClick={() => setLayoutMode(option.key)}
              className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-primary text-primary-content"
                  : "text-base-content/75 hover:bg-base-100"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <main className="mt-20 bg-base-100 pb-10 sm:mt-24">
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="py-3 text-center sm:py-5">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Halal Food</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-base-content/80 sm:text-base">
            Find halal restaurants and food options near Wilfrid Laurier University.
          </p>
        </div>

        <div className="mt-8 border-t border-base-300 pt-6">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-2">
            <div className="pt-1 text-sm text-base-content/65">
              Filter by cuisine, slaughter method, and location.
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <LayoutSwitcher />
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                aria-controls="filters-panel"
                aria-expanded={showFilters}
                className="inline-flex items-center gap-2 rounded-lg border border-base-300 bg-base-200 px-3 py-2 text-sm text-base-content/80 transition hover:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Filter size={16} aria-hidden="true" />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {showFilters ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {showFilters && (
            <div id="filters-panel" className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  htmlFor="halal-directory-search"
                  className="mb-2 block text-sm font-medium text-base-content"
                >
                  Search
                </label>
                <SearchBar
                  ref={searchInputRef}
                  inputId="halal-directory-search"
                  label="Search restaurants or cuisine"
                  name="query"
                  autoComplete="off"
                  placeholder="Search name or cuisine…"
                  className="rounded-lg border border-base-300 bg-base-100 px-3 py-2"
                  inputClassName="flex items-center gap-2"
                  inputElementClassName="w-full bg-transparent text-sm text-base-content placeholder:text-base-content/40 focus:outline-none"
                  showIcon={false}
                />
              </div>

              <div>
                <label
                  htmlFor="halal-cuisine-filter"
                  className="mb-2 block text-sm font-medium text-base-content"
                >
                  Cuisine
                </label>
                <select
                  id="halal-cuisine-filter"
                  name="cuisine"
                  value={selectedCuisine}
                  onChange={(e) => {
                    setSelectedCuisine(e.target.value);
                    updateFilterParams("cuisine", e.target.value);
                  }}
                  className="w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {cuisineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="halal-method-filter"
                  className="mb-2 block text-sm font-medium text-base-content"
                >
                  Slaughter Method
                </label>
                <select
                  id="halal-method-filter"
                  name="method"
                  value={selectedMethod}
                  onChange={(e) => {
                    setSelectedMethod(e.target.value);
                    updateFilterParams("method", e.target.value);
                  }}
                  className="w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {slaughterMethodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="halal-location-filter"
                  className="mb-2 block text-sm font-medium text-base-content"
                >
                  Campus Location
                </label>
                <select
                  id="halal-location-filter"
                  name="location"
                  value={selectedCampusLocation}
                  onChange={(e) => {
                    setSelectedCampusLocation(e.target.value);
                    updateFilterParams("location", e.target.value);
                  }}
                  className="w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <option value="All Locations">All Locations</option>
                  <option value="On Campus">On Campus</option>
                  <option value="Off Campus">Off Campus</option>
                </select>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {activeFilters.length > 0 ? (
              <>
                {activeFilters.map((filter) => (
                  <button
                    key={`${filter.key}-${filter.value}`}
                    type="button"
                    onClick={() => clearFilter(filter.key)}
                    className="rounded-lg border border-base-300 bg-base-200 px-3 py-1.5 text-sm text-base-content/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition hover:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {filter.label}: {filter.value}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-md px-2 py-1 text-sm font-medium text-primary transition hover:bg-primary/10 hover:text-primary-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Clear all
                </button>
              </>
            ) : (
              <p className="text-sm text-base-content/60">No filters applied.</p>
            )}
          </div>
        </div>

        <div className="mt-7 border-t border-base-300 pt-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-base-content/70" aria-live="polite">
              {pagination.total > 0 ? (
                <span>
                  Showing {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)}-
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                </span>
              ) : (
                <span>0 results</span>
              )}
            </div>
            {!isSmall && <div className="text-xs text-base-content/50">Shortcuts: F search, 1-4 layout</div>}
          </div>

          {halalDirectory.length > 0 ? (
            <div className={getListWrapperClasses()}>
              {halalDirectory.map((item) => {
                const isList = effectiveLayout === "list";

                return (
                  <article
                    key={item.id}
                    className={`rounded-xl border border-base-300 bg-base-100 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_10px_24px_rgba(0,0,0,0.06)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_6px_14px_rgba(0,0,0,0.06),0_22px_48px_rgba(0,0,0,0.10)] ${
                      isList ? "flex flex-col gap-4 sm:flex-row" : "flex flex-col gap-4"
                    }`}
                  >
                    <div
                      className={`overflow-hidden rounded-lg bg-base-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] ${
                        isList ? "h-40 w-full sm:h-36 sm:w-44 sm:flex-shrink-0" : "aspect-[4/3] w-full"
                      }`}
                    >
                      {item.image && typeof item.image !== "number" && item.image.url ? (
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.name || "Restaurant image"}
                          width={480}
                          height={360}
                          sizes={
                            isList
                              ? "(max-width: 640px) 100vw, 176px"
                              : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                          }
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-base-content/40">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{item.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-base-content/70">
                          {item.shortDescription || "A halal option near Laurier."}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          {item.category && (
                            <span className="rounded-full border border-base-300 bg-base-200 px-2.5 py-1 font-medium text-base-content/75">
                              {item.category}
                            </span>
                          )}
                          {item.slaughtered && (
                            <span className="rounded-full border border-base-300 bg-base-200 px-2.5 py-1 font-medium text-base-content/75">
                              {item.slaughtered}
                            </span>
                          )}
                          {item.location && (
                            <span className="rounded-full border border-base-300 bg-base-200 px-2.5 py-1 font-medium text-base-content/75">
                              {item.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={item.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-content shadow-sm transition hover:bg-primary/90 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          aria-label={`Open Google Maps for ${item.name}`}
                        >
                          View on Google Maps
                        </a>
                        {item.website && (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-base-300 bg-base-100 px-3.5 py-2 text-sm font-medium text-base-content shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-primary/30 hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-base-200 dark:hover:bg-base-300"
                            aria-label={`Open website for ${item.name}`}
                          >
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-base-300 bg-base-200 px-4 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]">
              <p className="text-sm text-base-content/70">No results match your filters.</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-content transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-6 flex items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => pagination.hasPrevPage && goToPage(pagination.page - 1)}
              disabled={!pagination.hasPrevPage}
              className="rounded-lg border border-base-300 px-3 py-2 text-sm text-base-content/80 transition hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-base-content/60">
              Page {pagination.page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => pagination.hasNextPage && goToPage(pagination.page + 1)}
              disabled={!pagination.hasNextPage}
              className="rounded-lg border border-base-300 px-3 py-2 text-sm text-base-content/80 transition hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        )}
      </section>

      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-primary-content shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </main>
  );
}
