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
import { Testimonials } from "@/components/UI/Carousel";
const testimonials = [
  {
    name: "Maaid Abdullah",
    role: "3rd year Health Sci",
    quote:
      "Ramadan with the brothers was amazing. The iftars and company made it a memory that I will cherish for many years to come.",
  },
  {
    name: "Mahrukh Majeed",
    role: "3rd year BBA",
    quote:
      "It was helpful and nice to have meals provided by MSA during Ramadan. With how busy Ramadan can get, having one less thing to worry about and knowing you could rely on that support was really nice.",
  },
  {
    name: "Mohammed Maruf",
    role: "3rd year CS & Math",
    quote:
      "Last year, Ramadan with the MSA was truly a blessing. As an international student, being away from family during such a special time was difficult, but the MSA created a warm and supportive community that felt like home. The nightly iftars, prayers, and inspiring talks made me feel connected and uplifted. It wasn’t just about food, it was about faith, friendship, and belonging. I’ll always be grateful for how they made Ramadan unforgettable.",
  },
  {
    name: "Shermeen Syeda",
    role: "3rd year CS",
    quote:
      "These MSA iftaars are such a blessing! They provided me with a chance to connect with wonderful sisters while breaking our fasts, creating a warm sense of community that reminds me of home.",
  },

  // Add more testimonials as needed
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
                  and get the reward of their fast
                </h2>
              </BlurFade>
              <BlurFade delay={0.5}>
                <p className="py-4 text-md md:text-xl text-center ">
                  The Messenger of Allah Peace be upon him said "Whoever helps break the fast of a fasting person, he will have the same reward as him without decreasing anything from the reward of the fasting person.” (Tirmidhī 807)                </p>
              </BlurFade>
              <BlurFade delay={0.75}>
                <div className="flex flex-row  justify-center my-6" >
                  <button className="btn btn-sm md:btn-md btn-primary text-secondary mx-4 duration-200 hover:scale-105 "><Link href="#donate">Donate now!</Link></button>
                  <button className="btn btn-sm md:btn-md btn-secondary text-primary mx-4 duration-200 hover:scale-105  "><Link href="/ramadan/2024">Ramadan 2024 Page</Link></button>
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
          <BlurFade delay={1.25}>
            <div id="events" className="">
              <h1 className="text-2xl md:text-3xl font-bold pb-4 text-primary duration-200 hover:scale-105 lg:pt-0">
                About the project
              </h1>
              <div className="space-y-4">
                <div className="max-w-md lg:max-w-5xl flex-grow py-4">
                  <h3 className="text-xl font-bold duration-200 hover:scale-105 lg:pt-0">
                    WLU MSA and Laurier Chaplaincy's Ramadan Project
                  </h3>
                  <p className="text-neutral">
                    Ramadan is a time of giving, community, and reflection. However, many university students, due to the struggles of academic life and living away from home, often feel stressed, isolated, and unable to focus on their faith. This is exactly why the Laurier MSA and Chaplaincy partnered in 2021—to provide not only free iftars but also a space for students to sit and pray Tarawih. The Ramadan Project has been a source of comfort and connection for university students over the years, and we need your support to continue this initiative.
                  </p>
                </div>
                <div className="max-w-md lg:max-w-5xl flex-grow py-4">
                  <h3 className="text-xl font-bold duration-200 hover:scale-105 lg:pt-0">
                    Why Your Support Matters
                  </h3>
                  <p className="text-neutral">
                    Fasting while managing academic responsibilities can be a significant challenge for many students. The Messenger of Allah (peace be upon him) said: <i>"Whoever relieves the hardship of a believer in this world, Allah will relieve his hardship on the Day of Resurrection."</i> (Muslim, 2699).
                    <br /><br />
                    Your donations help provide:
                    <ul className="list-disc pl-5">
                      <li><strong>Stress Relief:</strong> Alleviating financial burdens so students can focus on their academics and faith.</li>
                      <li><strong>Nutritious Meals:</strong> Ensuring students have the energy to excel academically and spiritually.</li>
                      <li><strong>Community Connection:</strong> Fostering a sense of belonging through shared meals.</li>
                    </ul>
                    Every meal funded is an act of kindness that helps ease the hardships of students. In the blessed month of Ramadan, your generosity brings not only immediate relief but also immense rewards.
                  </p>
                </div>
                <div className="max-w-md lg:max-w-5xl flex-grow py-4">
                  <h3 className="text-xl font-bold duration-200 hover:scale-105 lg:pt-0">
                    How You Can Help
                  </h3>
                  <p className="text-neutral">
                    Your contribution ensures that no student goes hungry this Ramadan. With just $10, you can provide iftar for a student and share in the reward of their fast. Imagine the impact you could make with $50, $100, or even more. Every contribution—big or small—brings smiles, gratitude, and heartfelt duas from those you've supported.
                    <br /><br />
                    What are you waiting for? <Link href="#donate">Donate now</Link> and make a difference!
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
        <div>
          <div>
            <h4 className="text-[42px] font-medium  text-primary text-balance max-w-3xl mx-auto tracking-tighter text-center mb-8 space-y-4 py-6 ">
              What the Students are saying
            </h4>
            <Testimonials testimonials={testimonials} />
          </div>
        </div>
        <div className=" container mx-auto px-4 py-8 text-2xl text-center" id="donate">
          {/* <FormBlock id={id || ""} form={page} /> */}
          Coming Soon
        </div>

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