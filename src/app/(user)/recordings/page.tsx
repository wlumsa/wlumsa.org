
import React from "react";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { RecordingsCarousel } from "@/components/UI/Carousel";
import { fetchRecordingsbyCategory } from "@/Utils/datafetcher";
import type { Recording } from '@/payload-types';
/**
 * Renders the page component for displaying recordings.
 * @returns The JSX element representing the page component.
 */

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | undefined }>


interface Category {
  id: string,
  title: string
}
const categories: Category[] = [
  {
    id: "1",
    title: "Halaqah"
  },
  {
    id: "2",
    title: "Khutbah"
  },
  {
    id: "3",
    title: "Guest Speaker"
  },

]

const page = async (props: {
  params: Params
  searchParams: SearchParams
}) => {
  const searchParams = await props.searchParams
  const categoryId = searchParams?.category || '1';
  const recordingsData = await fetchRecordingsbyCategory(categoryId);
  const recordingArray = recordingsData.map((recording: Recording) => ( { title: recording.title ? recording.title : '', src: recording.url } ));
  return (
    <div className="relative min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-16 lg:px-16">
        <header className="flex flex-col items-center space-y-3 text-center">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">Recordings</h1>
          <p className="max-w-2xl text-center">
            View previous halaqah, khutbah, and guest speaker recordings here!
          </p>
        </header>
        <section className="mt-10 flex justify-center">
          <ButtonGroup categories={categories} />
        </section>
        <section className="mt-8">
          {recordingArray.length === 0 ? (
            <div className="flex flex-col items-center space-y-2 text-center text-base-content/70">
              <div className="h-2 w-12 rounded-full bg-base-300" aria-hidden="true" />
              <p>No recordings available right now. Please check back soon.</p>
            </div>
          ) : (
            <RecordingsCarousel recordings={recordingArray} />
          )}
        </section>
        <section className="mt-10 flex justify-center">
          <a
            className="btn btn-primary text-white"
            href="https://www.youtube.com/@WLUMSA"
            target="_blank"
            rel="noreferrer"
            aria-label="View WLU MSA recordings on YouTube"
          >
            View on YouTube
          </a>
        </section>
      </div>
    </div>
  )
}

export default page
