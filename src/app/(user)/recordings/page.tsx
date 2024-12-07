
import React from "react";
import RecordingCard from "@/components/UI/RecordingCard";
import ButtonGroup from "@/components/UI/ButtonGroup";
import Carousel from "@/components/UI/Carousel";
/**
 * Renders the page component for displaying recordings.
 * @returns The JSX element representing the page component.
 */
const categories = [
  {
    title: "Jummah Kutbahs",
    description: "View recordings of previous Kutbahs on Campus",
    playlistUrl: "https://www.youtube.com/playlist?list=PLDk3wfLWI2WgOZn-RKW9s97KfORA3G4YN",
  },
  {
    title: "Halaqa",
    description: "Missed a Halaqa? No problem you can view the recordings here",
    playlistUrl: "https://www.youtube.com/playlist?list=PLDk3wfLWI2WgS1x45kBt8yFVXapKtjDD9",
  },
  {
    title: "Guest Speakers",
    description: "View all the recordings of the guest speakers which have came to Laurier in the past",
    playlistUrl: "https://www.youtube.com/playlist?list=PLDk3wfLWI2Wi_R3R3lNZ9AuHVRfp6acEP",
  },
]

const page = () => {

  return (
    <div className="flex relative min-h-screen flex-col m-16 items-center justify-center" >
       <div>
        <h1 className="text-4xl text-center font-bold text-primary " >Recordings</h1>
        <p className="text-center p-4">View previous halaqah, khutab, and guest speaker recordings here! </p>
       </div>
       <div className="mx-auto mt-0">
         <ButtonGroup categories={categories}/>
       </div>
        <Carousel/>
       <div>
          <button className="btn btn-primary text-white  "><a href="https://www.youtube.com/@WLUMSA">View on Youtube</a></button>
       </div>
    </div>
  )
}

export default page