import { getMediaFiles } from "@/Utils/datafetcher";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import type { Media } from "@/payload-types";

export const metadata: Metadata = {
  title: "Hub | WLU MSA",
  description:
    "Find WLU MSA manuals, interview preparation, and key documents in one place.",
};

function formatFileSize(bytes: number | null | undefined) {
  if (!bytes || bytes <= 0) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)}\u00A0KB`;
  return `${(kb / 1024).toFixed(1)}\u00A0MB`;
}

type SearchParams = Promise<{ [key: string]: string | undefined }>;
type HubType = "all" | "manual" | "prep" | "resource";

function parseHubType(alt: string | null | undefined): {
  type: HubType;
  title: string;
} | null {
  if (!alt) return null;
  const trimmed = alt.trim();
  const typedMatch = trimmed.match(
    /^hub:(manual|prep|interview|resource):\s*(.+)$/i
  );
  if (typedMatch) {
    const matchedType = typedMatch[1];
    const matchedTitle = typedMatch[2];
    if (!matchedType || !matchedTitle) return null;
    const rawType = matchedType.toLowerCase();
    return {
      type: (rawType === "interview" ? "prep" : rawType) as HubType,
      title: matchedTitle.trim(),
    };
  }

  const genericMatch = trimmed.match(/^hub:\s*(.+)$/i);
  if (genericMatch) {
    const matchedTitle = genericMatch[1];
    if (!matchedTitle) return null;
    return {
      type: "resource",
      title: matchedTitle.trim(),
    };
  }

  return null;
}

export default async function HubPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const selectedType = (searchParams.type || "all").toLowerCase() as HubType;
  const activeType: HubType = ["manual", "prep", "resource"].includes(
    selectedType
  )
    ? selectedType
    : "all";

  const mediaFiles = (await getMediaFiles(200)) as Media[];
  const docs = mediaFiles
    .filter(
      (file: Media) =>
        file.mimeType === "application/pdf" &&
        typeof file.url === "string" &&
        file.url.length > 0
    )
    .map((file: Media) => {
      const parsed = parseHubType(file.alt);
      if (!parsed) return null;

      return {
        id: file.id,
        url: file.url || "#",
        type: parsed.type,
        title: parsed.title || file.filename || "Untitled PDF",
        filename: file.filename || "",
        size: formatFileSize(file.filesize),
      };
    })
    .filter((doc): doc is NonNullable<typeof doc> => doc !== null)
    .filter((doc) => activeType === "all" || doc.type === activeType);

  const totalDocs = docs.length;
  const typeLabel: Record<HubType, string> = {
    all: "Documents",
    manual: "Manuals",
    prep: "Interview Prep",
    resource: "Resources",
  };

  const categories: { title: string; id: HubType }[] = [
    { title: "All", id: "all" },
    { title: "Manuals", id: "manual" },
    { title: "Prep", id: "prep" },
    { title: "Resources", id: "resource" },
  ];

  return (
    <section className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="font-heading text-balance text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Hub
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-base-content/75 sm:text-lg">
            Manuals, interview prep, and key documents in one place.
          </p>
        </header>

        <section className="mt-12 sm:mt-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-heading text-xl font-semibold text-base-content sm:text-2xl">
              Documents
            </h2>
            <span className="shrink-0 text-sm tabular-nums text-base-content/55">
              {totalDocs} {totalDocs === 1 ? "PDF" : "PDFs"}
            </span>
          </div>
          <nav aria-label="Filter documents" className="mt-5">
            <ButtonGroup categories={categories} queryParam="type" />
          </nav>

          <div className="mt-4">
            {docs.length > 0 ? (
              <ul className="divide-y divide-base-content/10" role="list">
                {docs.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-20 touch-manipulation items-center justify-between gap-4 py-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-base-100 motion-reduce:transition-none"
                      style={{
                        contentVisibility: "auto",
                        containIntrinsicSize: "76px",
                      }}
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-base-content transition-colors group-hover:text-primary motion-reduce:transition-none">
                          {doc.title}
                        </p>
                        {doc.filename ? (
                          <p className="mt-0.5 truncate text-xs text-base-content/65">
                            {doc.filename}
                          </p>
                        ) : null}
                      </div>
                      <div className="shrink-0 text-right">
                        {doc.size ? (
                          <p className="text-xs tabular-nums text-base-content/65">
                            {doc.size}
                          </p>
                        ) : null}
                        <p className="flex items-center justify-end gap-1 text-sm font-semibold text-primary underline decoration-primary/35 underline-offset-4 transition-colors group-hover:decoration-primary motion-reduce:transition-none">
                          View PDF
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5"
                            strokeWidth={2}
                          />
                          <span className="sr-only">(opens in a new tab)</span>
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-10">
                <p className="text-sm text-base-content/70">
                  No {typeLabel[activeType].toLowerCase()} available right now.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
