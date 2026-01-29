"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { HalalDirectory } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  LayoutList,
  Columns2,
  Columns3,
  Columns4,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination";

// ------------------
// Filter Options
// ------------------
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

// Small helper: watch viewport <=640px (Tailwind sm)
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    // Small delay to ensure hydration is complete
    const timeoutId = setTimeout(() => {
      setMounted(true);
      const mq = window.matchMedia("(max-width: 640px)");
      const update = () => setIsSmall(mq.matches);
      update();

      // Safari fallback for older versions
      if (mq.addEventListener) {
        mq.addEventListener("change", update);
      } else {
        (mq as any).addListener?.(update);
      }

      return () => {
        if (mq.removeEventListener) {
          mq.removeEventListener("change", update);
        } else {
          (mq as any).removeListener?.(update);
        }
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Return false during SSR and initial hydration to prevent mismatch
  return mounted ? isSmall : false;
}

const HalalFoodClient: React.FC<FilterComponentProps> = ({
  halalDirectory,
  pagination,
  initialFilters,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const didInitLayoutRef = useRef<boolean>(false);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("list"); // Start with consistent default
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const [selectedCuisine, setSelectedCuisine] = useState(initialFilters.cuisine);
  const [selectedMethod, setSelectedMethod] = useState(initialFilters.method);
  const [selectedCampusLocation, setSelectedCampusLocation] = useState(initialFilters.location);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isSmall = useIsSmallScreen();
  const queryTerm = searchParams.get("query") || "";
  const activeFilters = [
    ...(selectedCuisine !== "All Cuisines" ? [`Cuisine: ${selectedCuisine}`] : []),
    ...(selectedMethod !== "All Methods" ? [`Method: ${selectedMethod}`] : []),
    ...(selectedCampusLocation !== "All Locations"
      ? [`Location: ${selectedCampusLocation}`]
      : []),
    ...(queryTerm ? [`Search: ${queryTerm}`] : []),
  ];
  // Force list presentation on small screens for better readability,
  // but keep the user's preference stored for when they go wider.
  const effectiveLayout: LayoutMode = isSmall ? "list" : layoutMode;

  // Initialize layout from URL or localStorage after hydration
  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    setIsHydrated(true);

    // Small delay to ensure hydration is complete
    const timeoutId = setTimeout(() => {
      // Skip initialization on small screens and ensure we only init once
      if (didInitLayoutRef.current) return;
      if (isSmall) return;
      const params = new URLSearchParams(window.location.search);
      const urlLayout = params.get("layout") as LayoutMode | null;
      const valid = urlLayout && ["list", "g2", "g3", "g4"].includes(urlLayout);

      if (valid && urlLayout) {
        setLayoutMode(urlLayout);
        try {
          localStorage.setItem("halalLayout", urlLayout);
        } catch {}
        didInitLayoutRef.current = true;
        return;
      }

      // Check initialFilters from server first
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

  // Persist layout to localStorage and URL (guard against needless replaces)
  useEffect(() => {
    // Guard against SSR and wait for hydration
    if (typeof window === "undefined" || !isHydrated) return;
    // Do not persist layout on small screens to avoid flicker with forced list view
    if (isSmall) return;

    try {
      localStorage.setItem("halalLayout", layoutMode);
    } catch {}

    const params = new URLSearchParams(searchParams.toString());
    if (params.get("layout") !== layoutMode) {
      params.set("layout", layoutMode);
      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
        { scroll: false }
      );
    }
  }, [layoutMode, pathname, router, searchParams, isHydrated, isSmall]);

  // Keyboard shortcuts: 1=list, 2=g2, 3=g3, 4=g4, F=search focus (disabled on small to avoid accidental toggles)
  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    const handler = (e: KeyboardEvent) => {
      // Prevent auto-repeat from holding keys causing rapid toggles
      if (e.repeat) return;
      if (isSmall) return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.isContentEditable
      )
        return;

      // Layout shortcuts
      if (e.key === "1") setLayoutMode("list");
      if (e.key === "2") setLayoutMode("g2");
      if (e.key === "3") setLayoutMode("g3");
      if (e.key === "4") setLayoutMode("g4");

      // Search focus shortcut
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();

        // If filters are collapsed, open them first
        if (!showFilters) {
          setShowFilters(true);
          // Small delay to ensure the search input is rendered before focusing
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
        } else {
          // If filters are already open, just focus the search input
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isSmall, showFilters]);

  const LayoutSwitcher = ({ compact = false }: { compact?: boolean }) => {
    // Don't render anything on mobile - force list view only
    if (isSmall) return null;

    const options: { key: LayoutMode; label: string; icon: any }[] = [
      { key: "list", label: "List", icon: LayoutList },
      { key: "g2", label: "2 Columns", icon: Columns2 },
      { key: "g3", label: "3 Columns", icon: Columns3 },
      { key: "g4", label: "4 Columns", icon: Columns4 },
    ];

    return (
      <div
        className={`inline-flex items-center gap-2 ${compact ? "" : "ml-2"}`}
        role="group"
        aria-label="Switch layout"
      >
        {options.map((opt) => {
          const isActive = effectiveLayout === opt.key;
          const IconComponent = opt.icon;
          return (
            <button
              key={opt.key}
              type="button"
              aria-label={
                opt.key === "list"
                  ? "Switch to list view"
                  : `Switch to ${opt.label} view`
              }
              aria-pressed={isActive}
              onClick={() => setLayoutMode(opt.key)}
              title={opt.key === "list" ? "List view" : `${opt.label} view`}
              className={
                isActive
                  ? "rounded-md bg-primary px-3 py-1.5 text-sm text-primary-content shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
                  : "dark:border-base-700 rounded-md border border-base-300 px-3 py-1.5 text-sm hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-base-300 flex items-center justify-center"
              }
            >
              <IconComponent size={18} />
            </button>
          );
        })}
      </div>
    );
  };

  const getListWrapperClasses = () => {
    // Always 1-col on xs; apply user grid from md/lg/xl up.
    switch (effectiveLayout) {
      case "g2":
        return "grid grid-cols-1 md:grid-cols-2 gap-6";
      case "g3":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      case "g4":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
      case "list":
      default:
        return "flex flex-col gap-6";
    }
  };

  const getCardClasses = () => {
    const base =
      "bg-base-100 border border-base-300 rounded-xl p-4 sm:p-5 transition-colors duration-200 hover:border-base-400";

    // On small screens, even for grid choices, show a tidy horizontal list-like card
    if (effectiveLayout === "list" || isSmall) {
      return `${base} flex flex-row gap-3 sm:gap-4`;
    }
    // Grid modes: stack vertically for a tidy grid
    return `${base} flex flex-col gap-4`;
  };

  const getImageWrapperClasses = () => {
    if (effectiveLayout === "list" || isSmall) {
      // Compact thumbnail on mobile / list
      return "w-28 h-28 sm:w-44 sm:h-44 bg-base-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center";
    }
    // Grid: full-width image area with consistent height across cards
    return "w-full h-40 md:h-44 aspect-[4/3] bg-base-200 rounded-lg overflow-hidden flex items-center justify-center";
  };

  // Scroll to top visibility
  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to map when toggled
  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    if (showMap) {
      const timeout = setTimeout(() => {
        const mapSection = document.getElementById("map-section");
        mapSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [showMap]);

  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Pagination navigation without scrolling to top
  const goToPage = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.replace(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false }
    );
  }, [searchParams, router, pathname]);

  // Function to update URL parameters when filters change
  const updateFilterParams = useCallback((filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "All Cuisines" || value === "All Methods" || value === "All Locations") {
      params.delete(filterType);
    } else {
      params.set(filterType, value);
    }

    // Reset to page 1 when filters change
    params.delete("page");

    router.replace(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false }
    );
  }, [searchParams, router, pathname]);

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

    // Reset to page 1 when clearing filters
    params.delete("page");
    router.replace(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false }
    );
  };

  const clearAllFilters = () => {
    setSelectedCuisine("All Cuisines");
    setSelectedMethod("All Methods");
    setSelectedCampusLocation("All Locations");

    // Clear all filters from URL (preserve layout)
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("cuisine");
    params.delete("method");
    params.delete("location");
    params.delete("page");
    router.replace(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false }
    );
  };

  // Use server-provided data directly (no client-side filtering needed)
  const paginatedData = halalDirectory;
  const totalPages = pagination.totalPages;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-base-100 px-3 pt-24 text-base-content sm:px-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-4 text-center sm:mb-8">
          <h1 className="font-serif text-2xl font-bold text-primary sm:text-4xl">
            Halal Eats Near You
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-base-content/70">
            Find halal restaurants and food options near Wilfrid Laurier
            University.
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="mb-4 w-full max-w-6xl rounded-xl border border-base-300 bg-base-100 p-4 sm:mb-6 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            aria-controls="filters-panel"
            aria-expanded={showFilters}
            className="flex items-center text-sm font-medium text-base-content transition-colors hover:text-base-content/80"
          >
            <Filter className="mr-2 text-base-content/70" size={16} />
            {showFilters ? "Hide filters" : "Show filters"}
            {showFilters ? (
              <ChevronUp className="ml-2 text-base-content/60" size={16} />
            ) : (
              <ChevronDown className="ml-2 text-base-content/60" size={16} />
            )}
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <LayoutSwitcher />
            {(selectedCuisine !== "All Cuisines" ||
              selectedMethod !== "All Methods" ||
              selectedCampusLocation !== "All Locations" ||
              queryTerm) && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-md border border-base-300 px-3 py-1 text-xs font-medium text-base-content/70 transition-colors hover:border-base-400 hover:text-base-content sm:text-sm"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {!showFilters && (
          <div className="mt-3 text-xs text-base-content/60">
            {activeFilters.length > 0 ? (
              <span>
                {activeFilters.length} active: {activeFilters.join(" · ")}
              </span>
            ) : (
              <span>No filters applied.</span>
            )}
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div
            id="filters-panel"
            className="mt-4 space-y-4"
          >
            <SearchBar
              ref={searchInputRef}
              className="rounded-md border border-base-300 bg-base-100 px-3 py-2"
              inputClassName="flex items-center gap-2"
              inputElementClassName="grow bg-transparent text-sm text-base-content placeholder:text-base-content/40 focus:outline-none"
              showIcon={false}
              placeholder="Search name or cuisine"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Cuisine Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-base-content">
                  Cuisine
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-base-300 bg-base-100">
                  <select
                    value={selectedCuisine}
                    onChange={(e) => {
                      setSelectedCuisine(e.target.value);
                      updateFilterParams("cuisine", e.target.value);
                    }}
                    className="w-full border-none bg-base-100 px-3 py-2 text-sm text-base-content focus:ring-0"
                  >
                    {cuisineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Method Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-base-content">
                  Slaughter Method
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-base-300 bg-base-100">
                  <select
                    value={selectedMethod}
                    onChange={(e) => {
                      setSelectedMethod(e.target.value);
                      updateFilterParams("method", e.target.value);
                    }}
                    className="w-full border-none bg-base-100 px-3 py-2 text-sm text-base-content focus:ring-0"
                  >
                    {slaughterMethodOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Campus Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-base-content">
                  Campus Location
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-base-300 bg-base-100">
                  <select
                    value={selectedCampusLocation}
                    onChange={(e) => {
                      setSelectedCampusLocation(e.target.value);
                      updateFilterParams("location", e.target.value);
                    }}
                    className="w-full border-none bg-base-100 px-3 py-2 text-sm text-base-content focus:ring-0"
                  >
                    <option value="All Locations">All Locations</option>
                    <option value="On Campus">On Campus</option>
                    <option value="Off Campus">Off Campus</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters */}
      <div className="mb-3 w-full max-w-6xl border-t border-base-300 pt-3 text-sm text-base-content/70 sm:mb-4">
        {selectedCuisine !== "All Cuisines" ||
        selectedMethod !== "All Methods" ||
        selectedCampusLocation !== "All Locations" ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-base-content/60">Active:</span>
            {selectedCuisine !== "All Cuisines" && (
              <span className="flex items-center gap-2">
                <span>Cuisine: {selectedCuisine}</span>
                <button
                  type="button"
                  onClick={() => clearFilter("cuisine")}
                  className="text-xs uppercase tracking-wide text-base-content/50 hover:text-base-content"
                >
                  Clear
                </button>
              </span>
            )}
            {selectedMethod !== "All Methods" && (
              <span className="flex items-center gap-2">
                <span>Method: {selectedMethod}</span>
                <button
                  type="button"
                  onClick={() => clearFilter("method")}
                  className="text-xs uppercase tracking-wide text-base-content/50 hover:text-base-content"
                >
                  Clear
                </button>
              </span>
            )}
            {selectedCampusLocation !== "All Locations" && (
              <span className="flex items-center gap-2">
                <span>Location: {selectedCampusLocation}</span>
                <button
                  type="button"
                  onClick={() => clearFilter("location")}
                  className="text-xs uppercase tracking-wide text-base-content/50 hover:text-base-content"
                >
                  Clear
                </button>
              </span>
            )}
          </div>
        ) : null}
      </div>

      {/* Listings Header */}
      <div className="sticky top-16 z-10 mb-1 flex w-full max-w-6xl items-center justify-between bg-base-100 py-1.5">
        <div className="flex items-center gap-4">
          <div className="text-sm text-base-content/70" aria-live="polite">
            {pagination.total > 0 ? (
              <span>
                Showing{" "}
                {Math.min(
                  (pagination.page - 1) * pagination.limit + 1,
                  pagination.total
                )}
                –{Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                {pagination.total}
              </span>
            ) : (
              <span>0 results</span>
            )}
          </div>
        </div>
        {!isSmall && (
          <div className="hidden md:block text-xs text-base-content/50">
            Shortcuts: F search, 1–4 layout
          </div>
        )}
      </div>

      {/* Listings */}
      <div className={`w-full max-w-6xl ${getListWrapperClasses()}`}>
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <div key={item.id} className={getCardClasses()}>
              <div className={getImageWrapperClasses()}>
                {item.image &&
                typeof item.image !== "number" &&
                item.image.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image?.alt || item.name || "Restaurant image"}
                    width={384}
                    height={384}
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 192px, 25vw"
                    decoding="async"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-200 hover:scale-105 motion-reduce:hover:scale-100"
                  />
                ) : (
                  <span className="text-base-content/40">No Image</span>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <h2
                    className={`mb-1 font-serif text-lg font-semibold tracking-tight text-base-content sm:text-xl ${
                      effectiveLayout === "list" ? "" : "line-clamp-2"
                    }`}
                  >
                    {item.name}
                  </h2>
                  <p
                    className={`mb-2 text-sm text-base-content/60 ${
                      effectiveLayout === "list" ? "" : "line-clamp-3"
                    }`}
                  >
                    {item.shortDescription}
                  </p>
                  {effectiveLayout === "list" ? (
                    <div className="space-y-1 text-xs text-base-content/60 sm:text-sm">
                      <p>
                        <strong>Category:</strong> {item.category}
                      </p>
                      <p>
                        <strong>Slaughter Method:</strong> {item.slaughtered}
                      </p>
                      <p>
                        <strong>Location:</strong> {item.location}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px] sm:text-xs">
                      {item.category && (
                        <span className="rounded-full border border-base-300 px-2 py-0.5 text-base-content/70">
                          {item.category}
                        </span>
                      )}
                      {item.slaughtered && (
                        <span className="rounded-full border border-base-300 px-2 py-0.5 text-base-content/70">
                          {item.slaughtered}
                        </span>
                      )}
                      {item.location && (
                        <span className="rounded-full border border-base-300 px-2 py-0.5 text-base-content/70">
                          {item.location}
                        </span>
                      )}
                  </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-4">
                  <a
                    href={item.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-base-content/70 transition-colors hover:text-base-content hover:underline"
                    aria-label="Open Google Maps for this restaurant"
                  >
                    Google Maps
                  </a>
                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content transition-colors hover:border-base-400 hover:bg-base-200 dark:border-base-600 dark:bg-base-200 dark:hover:bg-base-300 sm:px-4"
                      aria-label="Open restaurant website"
                    >
                      Book Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-base-content/60 dark:text-base-content/50">
            <p>No results match your filters.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 rounded-lg bg-primary px-6 py-2 text-primary-content shadow-lg transition-colors hover:bg-primary/90 dark:shadow-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Pagination - outside the grid/list container to avoid alignment shifts */}
      {totalPages > 1 && (
        <div className="w-full max-w-6xl mx-auto flex justify-center mt-6 sm:mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={pagination.hasPrevPage ? `?${new URLSearchParams({...Object.fromEntries(searchParams), page: String(pagination.page - 1)})}` : "#"}
                  size="default"
                  className={!pagination.hasPrevPage ? "pointer-events-none opacity-50" : ""}
                  onClick={(e: any) => { e.preventDefault(); if (pagination.hasPrevPage) goToPage(pagination.page - 1); }}
                />
              </PaginationItem>

              {totalPages <= 5 ? (
                Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`?${new URLSearchParams({...Object.fromEntries(searchParams), page: String(pageNum)})}`}
                        size="default"
                        isActive={pageNum === pagination.page}
                        aria-current={pageNum === pagination.page ? "page" : undefined}
                        className={pageNum === pagination.page ? "font-semibold underline" : ""}
                        onClick={(e: any) => { e.preventDefault(); goToPage(pageNum); }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })
              ) : (
                <>
                  {pagination.page > 3 && (
                    <PaginationItem>
                      <PaginationLink
                        href={`?${new URLSearchParams({...Object.fromEntries(searchParams), page: "1"})}`}
                        size="default"
                        aria-current={pagination.page === 1 ? "page" : undefined}
                        className={pagination.page === 1 ? "font-semibold underline" : ""}
                        onClick={(e: any) => { e.preventDefault(); goToPage(1); }}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {pagination.page > 4 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {Array.from({ length: 3 }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages, pagination.page - 1 + i));
                    if (pageNum > totalPages) return null;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href={`?${new URLSearchParams({...Object.fromEntries(searchParams), page: String(pageNum)})}`}
                          size="default"
                          isActive={pageNum === pagination.page}
                          aria-current={pageNum === pagination.page ? "page" : undefined}
                          className={pageNum === pagination.page ? "font-semibold underline" : ""}
                          onClick={(e: any) => { e.preventDefault(); goToPage(pageNum); }}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {pagination.page < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {pagination.page < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href={`?${new URLSearchParams({...Object.fromEntries(searchParams), page: String(totalPages)})}`}
                        size="default"
                        aria-current={pagination.page === totalPages ? "page" : undefined}
                        className={pagination.page === totalPages ? "font-semibold underline" : ""}
                        onClick={(e: any) => { e.preventDefault(); goToPage(totalPages); }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  href={pagination.hasNextPage ? `?${new URLSearchParams({...Object.fromEntries(searchParams), page: String(pagination.page + 1)})}` : "#"}
                  size="default"
                  className={!pagination.hasNextPage ? "pointer-events-none opacity-50" : ""}
                  onClick={(e: any) => { e.preventDefault(); if (pagination.hasNextPage) goToPage(pagination.page + 1); }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Toggle Map Button */}
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
        <button
          type="button"
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate(10);
            }
            setShowMap((prev) => !prev);
            setShowFilters(false);
          }}
          aria-pressed={showMap}
          className="rounded-full bg-primary px-6 py-2 text-primary-content shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary/90"
        >
          {showMap ? "Hide Map" : "📍 View Map"}
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-primary p-3 text-primary-content shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary/90"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      {/* Embedded Map (Toggle View) */}
      {showMap && (
        <div
          id="map-section"
          className="dark:border-base-700 mt-12 h-[400px] w-full max-w-6xl animate-fade-in overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg dark:bg-base-200 dark:shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw&usp=sharing"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0"
          ></iframe>
          <div className="mt-2 pb-2 text-center">
            <a
              href="https://www.google.com/maps/d/u/0/viewer?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-info hover:underline"
            >
              View Full Map
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HalalFoodClient;
