import React from "react";
//import { TextGenerateEffect } from "./text-generate-effect";
import Image from "next/image";
//import { FadeText } from "./FadeText";
import { Social, Media, Faq } from "@/payload-types";
import { getMedia, fetchIIAServices, fetchFAQ } from "@/Utils/datafetcher";
import Service from "@/components/UI/ServiceCard";


const IIA: React.FC = async () => {
   const mediaDocs = await getMedia("Mosque");
   const services= await fetchIIAServices();
   const questions = await fetchFAQ();

  return (
   <div className="mt-16">
     <div id="hero" className="hero min-h-[70vh] relative overflow-hidden">
       <Image
         fill
         src={mediaDocs[0]?.url || ''}
         alt={mediaDocs[0]?.alt || "Mosque"}
        className="object-cover w-full blur-sm scale-105"

       />
           <div className="absolute inset-0 bg-[#050B07]" style={{ opacity: 0.38 }}></div>

       <div className="hero-overlay bg-[#050B07] bg-opacity-[30]" />
       <div className="hero-content text-center relative z-10">
         <div className="">
           <div className="text-white mx-4 md:mx-20">
             <h1 className="text-4xl font-extrabold">Laurier Islamic Information Association</h1>
             <h1 className="my-4 text-lg">The Islamic Information Association (IIA) aims to spread the message of Islam on the Laurier campus. We have weekly boothing, educational events, and create informational materials.</h1>
           </div>
           <div className="my-2 flex flex-row items-center justify-center gap-4">
             <button className="btn border-none text-white bg-primary hover:bg-primary"><a href="#services">Learn More</a></button>
             <button className="btn bg-[#050B07] opacity-50 text-white border-primary">Ask a question</button>
           </div>
         </div>
       </div>
     </div>
     <div className="mt-8 md:px-10" id="services">
       <h1 className="text-4xl text-center font-semibold py-8">Our Services</h1>
       <Service services={services}/>
     </div>
     <div className="md:px-24 px-8 items-center mb-16">
       <h1 className="text-4xl text-center py-12 font-semibold">Frequently Asked Questions</h1>
       <div className="bg-primary rounded p-4 items-center">
       {questions.map((question: Faq, index: number) => (
         <div key={index} className="bg-base-200 collapse collapse-arrow my-4 rounded-md">
     <input type="checkbox" className="peer" />
         <div
           className="text-lg font-semibold collapse-title bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
           {question.Question}
         </div>
         <div
           className="collapse-content bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
           <p>{question.Answer}</p>
         </div>
       </div>
       ))}
       </div>

     </div>

     </div>
  );
};

export default IIA;
