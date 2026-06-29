import React from "react";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { RecordingsCarousel } from "@/components/UI/Carousel";
import { fetchRecordingsbyCategory } from "@/Utils/datafetcher";
import type { Recording } from "@/payload-types";
import { ArrowUpRight, Headphones } from "lucide-react";
/**
 * Renders the page component for displaying recordings.
 * @returns The JSX element representing the page component.
 */

type SearchParams = Promise<{ [key: string]: string | undefined }>;

interface Category {
  id: string;
  title: string;
}
const categories: Category[] = [
  {
    id: "1",
    title: "Halaqah",
  },
  {
    id: "2",
    title: "Khutbah",
  },
  {
    id: "3",
    title: "Guest Speaker",
  },
  {
    id: "4",
    title: "Ramadan Series",
  },
];

const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const categoryId = searchParams?.category || "1";
  const recordingsData = await fetchRecordingsbyCategory(categoryId);
  const recordingArray = recordingsData.map((recording: Recording) => ({
    title: recording.title ? recording.title : "",
    src: recording.url,
  }));
  const activeCategoryTitle =
    categories.find((category) => category.id === categoryId)?.title ||
    "Recordings";
  const recordingCount = recordingArray.length;

  return (
    <div className="relative mt-16 min-h-screen bg-base-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12 lg:px-12">
        <header className="border-b border-base-300 pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 text-sm font-semibold text-primary">
                WLU MSA Media Library
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-normal text-base-content md:text-5xl">
                Recordings
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/70 md:text-lg">
                Browse recent halaqahs, khutbahs, guest speakers, and Ramadan
                sessions in one focused archive.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
              <div className="rounded-md border border-base-300 bg-base-200/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                  Showing
                </p>
                <p className="mt-1 text-sm font-semibold text-base-content">
                  {recordingCount}{" "}
                  {recordingCount === 1 ? "recording" : "recordings"} in{" "}
                  {activeCategoryTitle}
                </p>
              </div>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-content transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                href="https://www.youtube.com/@WLUMSA"
                target="_blank"
                rel="noreferrer"
                aria-label="View WLU MSA recordings on YouTube"
              >
                YouTube
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>

        <section className="mt-8">
          <ButtonGroup categories={categories} />
        </section>

        <section className="mt-10">
          {recordingArray.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-md border border-base-300 bg-base-200/40 px-4 py-10 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-md border border-base-300 bg-base-100 text-primary">
                <Headphones className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-base-content">
                No recordings yet
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-base-content/65">
                There are no {activeCategoryTitle.toLowerCase()} recordings
                available right now. Check back soon or visit YouTube for the
                full channel archive.
              </p>
              <a
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content transition-colors hover:border-primary/30 hover:text-primary"
                href="https://www.youtube.com/@WLUMSA"
                target="_blank"
                rel="noreferrer"
              >
                Open YouTube
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          ) : (
            <RecordingsCarousel recordings={recordingArray} />
          )}
        </section>
      </div>
    </div>
  );
};

export default page;
