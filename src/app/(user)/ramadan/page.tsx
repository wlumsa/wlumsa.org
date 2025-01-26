import React from "react";
import Link from "next/link";
import { getPayload } from 'payload'
import configPromise from "@payload-config";
import CountdownComponent from "./CountdownComponent";
import { FormBlock } from "@/components/Forms/FormBlock/Form";
import { Form as FormType } from "@payloadcms/plugin-form-builder/types";
import { notFound } from "next/navigation";
import BlurFade from "@/components/UI/BlurFade";
import Image from "next/image";
import { StatsSection } from "@/components/UI/Stats";
import { DotPattern } from "@/components/UI/DotPatter";
import { cn } from "@/Utils/cn";
interface Content {
  title: string;
  caption: string;
}

const content: Content[] = [
  {
    title: "What is the WLU MSA and Chaplaincy's Ramadan Project?",
    caption: "The Ramadan Project provides free iftaars (evening meals) to students and community members throughout the holy month. Since 2021, it has become a vital resource for the Laurier Muslim community. For students, these meals offer not only nourishment but also a sense of connection and support during a busy academic period, especially for those far away from home. Students come together to break their fasts with a meal, congregate in prayer, and build a sense of community. Thanks to the generosity of community donors, these iftaars are entirely free for students, relieving financial stress and allowing them to focus on their studies and spiritual growth."
  },
  {
    title: "Why Support the Ramadan Project?",
    caption: `Your donations directly fund these free iftaars and help the MSA’s and Chaplaincy’s Ramadan project. For many students, the Ramadan Project is a dependable source of support that eases the challenges of fasting while managing academic responsibilities. By contributing, you’re helping to foster a stronger, more connected community at Laurier.
Every donation is an act of kindness that carries significant barakah (blessings) and can multiply your rewards during Ramadan. Together, we can ensure that this project continues to make a meaningful impact.
`
  },
  {
    title: "How You Can Help",
    caption: "We encourage everyone in the Laurier community and beyond to support the WLU MSA’s and Chaplaincy’s Ramadan Project. Your contribution, no matter the size, is a form of sadaqah that benefits others and enriches your own spiritual journey. Together, we can continue to provide these meals, support students, and uphold the blessings of Ramadan."
  }
];





export default async function CountdownPage() {

  const payload = await getPayload({ config: configPromise });

  const payment = await payload.find({
    collection: 'forms',
    where: {
      "slug": {
        equals: "ramadan"
      },
    },
    draft: false,
    overrideAccess: false,
  })
  const id = payment.docs[0]?.id.toString()
  const page = payment.docs[0] as unknown as null | FormType

  if (page === null) {
    return notFound()
  }

  return (
    <div className="flex flex-col min-h-screen ">
      {/*Hero Section*/}
      <div className="">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
        <div className="hero container mx-auto px-4 py-4">
          <div className="hero-content text-center mt-24">
            <div className="max-w-5xl">
              <BlurFade>
                <h1 className="text-3xl md:text-5xl pt-4 md:text-center  text-primary duration-200 hover:scale-105 lg:pt-0 font-bold">Sponsor an Iftar this Ramadan</h1>
              </BlurFade>
              <BlurFade delay={0.25}>
                <h2 className="py-4 text-xl md:text-3xl">
                  We need your help to provide critical Iftars services to busy Muslim University Students!
                </h2>
              </BlurFade>
              <BlurFade delay={0.5}>
                <p className="py-4 text-md md:text-xl text-center ">
                  The Laurier Muslim Students Association and Muslim Chaplanicy needs your help to provide crucial services this Ramadan for busy university students this Ramadan. Projects include free iftar meals, taraweeh prayers, and suhoor kits
                </p>
              </BlurFade>
              <BlurFade delay={0.75}>
                <div className="flex flex-row  justify-center mb-6" >
                  <button className="btn btn-primary text-secondary mx-4 duration-200 hover:scale-105 "><Link href="#donate">Donate now!</Link></button>
                  <button className="btn btn-secondary text-primary mx-4 duration-200 hover:scale-105  "><Link href="/ramadan/2024">Ramadan 2024 Page</Link></button>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>
      {/*Stats Section*/}
      <div>
        <BlurFade delay={1}>
          <StatsSection />
        </BlurFade>
      </div>
      <div>
        <div className="hero container px-4 py-8 mx-auto">
          <div id="events" className="">
            <h1 className="text-2xl md:text-3xl font-bold pb-4 text-primary duration-200 hover:scale-105 lg:pt-0 ">
              A bit about the project
            </h1>
            {content.map((event) => (
              <div className=" " >
                <div className="max-w-md lg:max-w-5xl flex-grow py-4">
                  <h3 className="text-xl font-bold duration-200 hover:scale-105 lg:pt-0" >
                    {event.title}
                  </h3>
                  <p className="text-neutral">{event.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" container mx-auto px-4 py-8" id="donate">
        <FormBlock id={id || ""} form={page} />

      </div>


    </div>
  );
}


/*
<div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 mt-10">
      <h1 className="text-4xl font-bold text-[#203B5D] mb-6">Countdown to Ramadan 2025</h1>
      <CountdownComponent />
      <p className="text-2xl mt-4">
        The blessed month of Ramadan is approaching! We need your help to fund iftars
      </p>
      <FormBlock id={id || ""} form={page} />
      <Link href="/ramadan/2024">
        <button className="mt-8 px-6 py-3 bg-[#203B5D] text-white font-bold rounded hover:bg-[#1a2f4b]">
          Go to Ramadan 2024 Page
        </button>
      </Link>
    </div>
    */