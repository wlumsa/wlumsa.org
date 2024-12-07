
import React from "react";
import ButtonGroup from "@/components/UI/ButtonGroup";
import Carousel from "@/components/UI/Carousel";
import { fetchRecordingsbyCategorory } from "@/Utils/datafetcher";
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
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
  //const query = searchParams?.query || '';
  const categoryId = searchParams?.category || '1';
  const recordingsData = await fetchRecordingsbyCategorory(categoryId);
  console.log(recordingsData);
  let recordingArray = recordingsData.map(recording => (recording.url));
  console.log(recordingArray);
  return (
    <div className="flex relative min-h-screen flex-col m-16 items-center justify-center" >
       <div>
        <h1 className="text-4xl text-center font-bold text-primary " >Recordings</h1>
        <p className="text-center p-4">View previous halaqah, khutab, and guest speaker recordings here! </p>
       </div>
       <div className="mx-auto mt-0">
         <ButtonGroup categories={categories}/>
       </div>
         <Carousel recordings={recordingArray} /> 
       <div>
          <button className="btn btn-primary text-white  "><a href="https://www.youtube.com/@WLUMSA">View on Youtube</a></button>
       </div>
    </div>
  )
}

export default page