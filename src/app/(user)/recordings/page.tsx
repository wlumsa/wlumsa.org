
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

// const page = async (props: {
//   params: Params
//   searchParams: SearchParams
// }) => {
//   const params = await props.params
//   const searchParams = await props.searchParams
//   const slug = params.slug
//   const query = searchParams.query
//   //const query = searchParams?.query || '';
//   const categoryId = searchParams?.category || '1';
//   const recordingsData = await fetchRecordingsbyCategorory(categoryId);
//   console.log(recordingsData);
//   let recordingArray = recordingsData.map(recording => (recording.url));
//   console.log(recordingArray);
//   return (
//     <div className="flex relative min-h-screen flex-col m-16 items-center justify-center" >
//        <div>
//         <h1 className="text-4xl text-center font-bold text-primary " >Recordings</h1>
//         <p className="text-center p-4">View previous halaqah, khutbah, and guest speaker recordings here! </p>
//        </div>
//        <div className="mx-auto mt-0">
//          <ButtonGroup categories={categories}/>
//        </div>
//          <Carousel recordings={recordingArray} /> 
//        <div>
//           <button className="btn btn-primary text-white  "><a href="https://www.youtube.com/@WLUMSA">View on Youtube</a></button>
//        </div>
//     </div>
//   )
// }

// export default page

const page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-28 mt-28 flex-grow px-4 md:px-10">
        <div className="flex-1 " id="services">
          <h2 className="mb-4 text-center text-4xl font-bold text-primary">
            Recordings
          </h2>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <div
              className="card card-compact w-fit bg-base-100 shadow-xl sm:w-96"
              key={0}
            >
              <div className="card-body">
                <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                  Jummah Kutbahs
                </h3>
                <p className="text-neutral">
                  View recordings of previous Kutbahs on Campus
                </p>

                <div className="card-actions justify-end">
                  <a
                    href="https://www.youtube.com/playlist?list=PLDk3wfLWI2WgOZn-RKW9s97KfORA3G4YN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary"
                  >
                    <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                      View Recordings
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="card card-compact w-fit bg-base-100 shadow-xl sm:w-96"
              key={1}
            >
              <div className="card-body">
                <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                  Halaqa
                </h3>
                <p className="text-neutral">
                  Missed a Halaqa? No problem you can view the recordings here
                </p>

                <div className="card-actions justify-end">
                  <a
                    href="https://www.youtube.com/playlist?list=PLDk3wfLWI2WgS1x45kBt8yFVXapKtjDD9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary"
                  >
                    <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                      View Recordings
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="card card-compact w-fit bg-base-100 shadow-xl sm:w-96"
              key={2}
            >
              <div className="card-body">
                <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                  Guest Speakers
                </h3>
                <p className="text-neutral">
                  View all the recordings of the guest speakers which have came to Laurier in the past
                </p>

                <div className="card-actions justify-end">
                  <a
                    href="https://www.youtube.com/playlist?list=PLDk3wfLWI2Wi_R3R3lNZ9AuHVRfp6acEP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary"
                  >
                    <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                      View Recordings
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;