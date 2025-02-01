
import React from "react";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { RecordingsCarousel } from "@/components/UI/Carousel";
import { fetchRecordingsbyCategory } from "@/Utils/datafetcher";
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
  const recordingArray = recordingsData.map(recording => ( { title: recording.title ? recording.title : '', src: recording.url } ));
  return (
    <div className="flex relative min-h-screen flex-col m-16 items-center justify-center" >
       <div>
        <h1 className="text-4xl text-center font-bold text-primary " >Recordings</h1>
        <p className="text-center p-4">View previous halaqah, khutbah, and guest speaker recordings here! </p>
       </div>
       <div className="mx-auto mt-0">
         <ButtonGroup categories={categories}/>
       </div>
         <RecordingsCarousel recordings={recordingArray} /> 
       <div>
          <button className="btn btn-primary text-white  "><a href="https://www.youtube.com/@WLUMSA">View on Youtube</a></button>
       </div>
    </div>
  )
}

export default page

