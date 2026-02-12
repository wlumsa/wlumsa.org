import { getMediaFiles } from "@/Utils/datafetcher";
import Link from "next/link";

function formatFileSize(bytes: number | null | undefined) {
  if (!bytes || bytes <= 0) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

type SearchParams = Promise<{ [key: string]: string | undefined }>;
type HubType = "all" | "manual" | "prep" | "resource";

function parseHubType(alt: string | null | undefined): {
  type: HubType;
  title: string;
} | null {
  if (!alt) return null;
  const trimmed = alt.trim();
  const typedMatch = trimmed.match(/^hub:(manual|prep|interview|resource):\s*(.+)$/i);
  if (typedMatch) {
    const rawType = typedMatch[1].toLowerCase();
    return {
      type: (rawType === "interview" ? "prep" : rawType) as HubType,
      title: typedMatch[2].trim(),
    };
  }

  const genericMatch = trimmed.match(/^hub:\s*(.+)$/i);
  if (genericMatch) {
    return {
      type: "resource",
      title: genericMatch[1].trim(),
    };
  }

  return null;
}

export default async function HubPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const selectedType = (searchParams.type || "all").toLowerCase() as HubType;
  const activeType: HubType = ["manual", "prep", "resource"].includes(selectedType)
    ? selectedType
    : "all";

  const mediaFiles = await getMediaFiles(200);
  const docs = mediaFiles
    .filter(
      (file) =>
        file.mimeType === "application/pdf" &&
        typeof file.url === "string" &&
        file.url.length > 0,
    )
    .map((file) => {
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
    prep: "Prep",
    resource: "Resources",
  };

  const filters: { label: string; type: HubType; href: string }[] = [
    { label: "All", type: "all", href: "/hub" },
    { label: "Manuals", type: "manual", href: "/hub?type=manual" },
    { label: "Prep", type: "prep", href: "/hub?type=prep" },
    { label: "Resources", type: "resource", href: "/hub?type=resource" },
  ];

  return (
    <section className="mt-16 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-7">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Hub</h1>
          <p className="mt-3 max-w-2xl text-sm text-base-content/80 sm:text-base">
            Manuals, interview prep, and key documents in one place.
          </p>
          <div className="mt-5 inline-flex items-center rounded-lg border border-base-300 bg-base-200 px-3 py-2 text-sm text-base-content/80">
            {totalDocs} {totalDocs === 1 ? "item" : "items"}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-base-content sm:text-xl">Documents</h2>
            <span className="text-xs text-base-content/60">PDF</span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Link
                key={filter.type}
                href={filter.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeType === filter.type
                    ? "bg-primary text-primary-content"
                    : "border border-base-300 bg-base-200 text-base-content/80 hover:bg-base-300"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            {docs.length > 0 ? (
              docs.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-base-300 bg-base-200 px-4 py-3 transition hover:border-primary/40 hover:bg-base-300"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-base-content">{doc.title}</p>
                    {doc.filename ? (
                      <p className="truncate text-xs text-base-content/65">{doc.filename}</p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-base-content/65">{doc.size}</p>
                    <p className="text-xs font-medium text-primary transition group-hover:underline">
                      View PDF
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-base-300 bg-base-200 px-4 py-6 text-center">
                <p className="text-sm text-base-content/70">No {typeLabel[activeType].toLowerCase()} available right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
