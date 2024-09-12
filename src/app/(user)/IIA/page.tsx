import React from "react";
//import { TextGenerateEffect } from "./text-generate-effect";
import Image from "next/image";
//import { FadeText } from "./FadeText";
import { Social, Media } from "@/payload-types";
import { getMedia, fetchIIAServices, fetchFAQ } from "@/Utils/datafetcher";
import Service from "@/components/UI/ServiceCard";


const IIA: React.FC = async () => {
  const mediaDocs = await getMedia("Mosque");
  const services= await fetchIIAServices();
  const questions = await fetchFAQ();
  
  return (
    // <div data-theme="IIA">
    // <div id="hero"  className="hero min-h-screen relative overflow-hidden">
    //   <Image
    //     fill
    //     src={mediaDocs[0]?.url || ''}
    //     alt={mediaDocs[0]?.alt || "Mosque"}
    //     className="object-cover w-full blur-sm scale-105"

    //   />
    //       <div className="absolute inset-0 bg-[#050B07]" style={{ opacity: 0.38 }}></div>

    //   <div className="hero-overlay bg-[#050B07] bg-opacity-[30]" />
    //   <div className="hero-content text-center relative z-10">
    //     <div className="">
    //       <div className="text-white mx-20 ">
    //         <h1 className="text-4xl font-extrabold ">Laurier Islamic Information Association</h1>
    //         <h1 className="my-4">The Islamic Information Association (IIA)   aims to spread the message of Islam on the Laurier campus. We have weekly boothing, educational events, and create informational materials.</h1>
    //       </div>
    //       <div className="my-2 flex flex-row items-center justify-center gap-4 ">
    //         <button className="btn border-none text-white bg-primary hover:bg-primary">Learn More</button>
    //         <button className="btn bg-[#050B07] opacity-50 text-white border-primary">Ask a question</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="mt-8 px-10 ">
    //   <h1 className="text-4xl text-center font-semibold">Our Services</h1>
    //   <Service services={services}/>
    // </div>
    // <div className=" flex flex-col min-h-screen px-20 items-center  ">
    //   <h1 className="text-4xl text-center p-4 font-semibold">Frequently Asked Questions</h1>
    //   <div className="bg-primary rounded p-4">
    //   {questions.map((question, index) => ( 
    //     <div className="bg-base-200 collapse collapse-arrow m-2 rounded-md">
    //     <input type="checkbox" className="peer" />
    //     <div
    //       className="collapse-title bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
    //       {question.Question}
    //     </div>
    //     <div
    //       className="collapse-content bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
    //       <p>{question.Answer}</p>
    //     </div>
    //   </div>
    //   ))}
    //   </div>
    
    // </div>
    // <div className="">
    //   <h1 className="text-4xl text-center font-semibold">Still Have Questions?</h1>
    //   <h1 className="text-xl text-center">Book a Meeting with one of our members</h1>
    // </div>
    // </div>
    <h1>COMING SOON INSHALLAH</h1>
  );
};

export default IIA;
