"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShoppingCart,
  Beef,
  Globe,
  Star,
  Store,
  Croissant,
  Flame,
  Snowflake,
  Search,
} from "lucide-react";

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

const CERT_COLORS: Record<string, string> = {
  certified: "bg-success text-success-content",
  "muslim-owned": "bg-info text-info-content",
  "halal-friendly": "bg-warning text-warning-content",
};

const CATEGORY_ICONS: Record<string, React.ReactElement> = {
  "full-grocery": <ShoppingCart size={16} />,
  "halal-meat": <Beef size={16} />,
  international: <Globe size={16} />,
  specialty: <Star size={16} />,
  convenience: <Store size={16} />,
  bakery: <Croissant size={16} />,
  spice: <Flame size={16} />,
  frozen: <Snowflake size={16} />,
};

function toLabel(s: string) {
  if (!s) return "";
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function priceLabel(p?: string | null) {
  const n = p ? parseInt(p, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? "$".repeat(Math.min(n, 4)) : null;
}

function useSlashToFocus(ref: React.RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ref]);
}

function StoreCard({ store }: { store: GroceryStore }) {
  const icon = CATEGORY_ICONS[store.category] ?? <Store size={16} />;
  const certClass = CERT_COLORS[store.halalCertification] ?? "bg-base-300 text-base-content";
  const price = priceLabel(store.priceRange);

  return (
    <article className="group rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-base-700 dark:bg-base-200">
      <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-base-200 dark:bg-base-300">
        {store.image?.url ? (
          <Image
            src={store.image.url}
            alt={store.image?.alt || store.name}
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl text-primary" aria-hidden>
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <header>
          <h3 className="text-lg font-semibold text-primary">{store.name}</h3>
          <p className="text-sm text-base-content/70">{store.shortDescription}</p>
        </header>

        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {icon} {toLabel(store.category)}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${certClass}`}>
            {toLabel(store.halalCertification)}
          </span>
          {price && (
            <span className="rounded-full bg-base-200 px-2.5 py-1 text-xs font-medium text-base-content dark:bg-base-300">
              {price}
            </span>
          )}
          {store.is_on_campus && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-content">On Campus</span>
          )}
        </div>

         {!!store.specialties?.length && (
           <div className="space-y-2">
             <p className="text-sm font-medium text-base-content/80">Specialties</p>
             <div className="flex flex-wrap gap-2">
               {store.specialties.slice(0, 4).map((s, i) => (
                 <span key={`${s.specialty}-${i}`} className="rounded-lg bg-base-200 px-4 py-2 text-sm font-medium text-base-content shadow-sm dark:bg-base-100 dark:text-base-content">
                   {s.specialty}
                 </span>
               ))}
               {store.specialties.length! > 4 && (
                 <span className="rounded-lg bg-base-300 px-4 py-2 text-sm font-medium text-base-content/70 shadow-sm dark:bg-base-200 dark:text-base-content/80">
                   +{store.specialties.length! - 4} more
                 </span>
               )}
             </div>
           </div>
         )}

        <dl className="space-y-1.5 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <MapPin size={16} aria-hidden />
            <dd className="truncate" title={store.location}>
              {store.location}
            </dd>
          </div>
          {store.hours && (
            <div className="flex items-center gap-2">
              <Clock size={16} aria-hidden />
              <dd className="truncate" title={store.hours}>
                {store.hours}
              </dd>
            </div>
          )}
          {store.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} aria-hidden />
              <dd>
                <a href={`tel:${store.phone}`} className="truncate hover:underline">
                  {store.phone}
                </a>
              </dd>
            </div>
          )}
        </dl>

         <div className="space-y-3 pt-3">
           {/* Directions Button - Full Width */}
           {store.googleMapsLink && (
             <a
               href={store.googleMapsLink}
               target="_blank"
               rel="noopener noreferrer"
               className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-colors hover:bg-primary/90"
               aria-label={`Open directions to ${store.name} in Google Maps`}
             >
               <MapPin size={16} />
               Get Directions
             </a>
           )}

           {/* Website and Call Buttons - Side by Side */}
           {(store.website || store.phone) && (
             <div className="flex gap-2">
               {store.website && (
                 <a
                   href={store.website}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-content"
                   aria-label={`Open website for ${store.name}`}
                 >
                   <ExternalLink size={16} />
                   Website
                 </a>
               )}
               {store.phone && (
                 <a
                   href={`tel:${store.phone}`}
                   className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-success px-3 py-2 text-sm font-medium text-success-content transition-colors hover:bg-success/90"
                   aria-label={`Call ${store.name}`}
                 >
                   <Phone size={16} />
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

export default function GroceryStoresClient({ groceryStores }: GroceryStoresClientProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useSlashToFocus(inputRef);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groceryStores;
    return groceryStores.filter((s) =>
      [
        s.name,
        s.shortDescription,
        s.category,
        s.halalCertification,
        s.location,
        s.specialties?.map((x) => x.specialty).join(" ") ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [groceryStores, query]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-base-100 px-3 pt-24 text-base-content sm:px-8">
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">Halal Grocery Stores</h1>
          <p className="mx-auto mt-2 max-w-2xl text-base-content/70">
            Find halal grocery stores, meat shops, and specialty markets in KW Region.
          </p>
        </div>

        <label className="sr-only" htmlFor="store-search">Search stores</label>
        <div className="mx-auto mb-8 flex max-w-md items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 dark:border-base-700 dark:bg-base-200">
          <Search size={18} className="text-base-content/60" aria-hidden />
          <input
            id="store-search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores (press / to focus)"
            className="w-full bg-transparent outline-none placeholder:text-base-content/50"
          />
        </div>
      </section>

      <section className="w-full max-w-6xl">
        {filtered.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-base-content/60 dark:text-base-content/50">
            <Search size={48} className="mx-auto mb-3 opacity-60" aria-hidden />
            <p className="mb-1 text-lg font-medium">No stores found</p>
            <p className="text-sm">Try a different search term.</p>
          </div>
        )}
      </section>
    </main>
  );
}
