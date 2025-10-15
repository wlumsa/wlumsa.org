import React from 'react'
import BlurFade from '@/components/UI/BlurFade'
import Link from 'next/link'
import Image from 'next/image'
import { EventCard } from "@/components/UI/WeeklyEvents";
const page = () => {

    const items = [
  {
    name: "Charity Week Boothing",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bakesale.png",
    // timeLocation: "Monday, Tuesday and Friday In the Concourse",
    caption:
      "We'll be having a bake sale, and selling bubble tea during charity week to raise funds for our cause. Come by the concourse on Monday, Tuesday, and Friday to grab some delicious treats and support a great cause!",
    // link: "/forms/iftars",
     ctaText: "",
  },
  {
    name: "Charity Week Social Events",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/auctionnight.png",
     timeLocation:
   "",
    caption:
      "We have Charity week social events aimed at bringing the community together, such as Family Feud, Scavenger Hunt, and Chai and Chill! Join us for fun activities, games, and socializing with fellow students. Stay tuned for more information on Auction night!",
    link: "",
    // ctaText: "View Schedule",
  },
//   {
//     name: "Charity Week Merch",
//     image:
//       "",
//     timeLocation: "",
//     caption:
//       "Pre-order your Charity Week 2025 hoodie now! Show your support and help us reach our fundraising goal with exclusive apparel. Limited stock available, you don't miss out.",
//     link: "wlumsa.org/resources",
//     ctaText: "Preorder Now",
//   },
  
];


  return (
    <div className='flex min-h-screen flex-col '>
         <div className="container hero mx-auto px-4 py-4">
                  <div className="hero-content mt-24 text-center">
                    <div className="max-w-5xl">
                      <BlurFade>
                        <h1 className="pt-4 text-4xl font-heading font-bold text-primary duration-200 hover:scale-105 md:text-center md:text-6xl lg:pt-0">
                          Charity Week 2025
                        </h1>
                      </BlurFade>
        
                      <BlurFade delay={0.5}>
                        <p className="py-4 text-center text-lg font-body md:text-xl">
                          A global week of unity, compassion, and action.
                        </p>
                      </BlurFade>
                    
                        <div className="my-6 flex  flex-row justify-center">
                          {/* <button className="btn btn-primary btn-sm mx-4 text-secondary duration-200 md:btn-md hover:scale-105 ">
                            <Link
                              href="https://fundraise.islamicreliefcanada.org/campaign/wlu-msa-x-irc-ramadan-campaign-2025-1446-ah-2625#attr=2858"
                              target="_blank"
                            >
                              Donate
                            </Link>
                          </button> */}
                          {/* <button className="btn btn-secondary btn-sm mx-4 text-primary duration-200 md:btn-md hover:scale-105  ">
                            <Link href="/"></Link>
                          </button> */}
                        </div>
                 
                    </div>
                  </div>
                </div>


                <div className="container mx-auto px-4 py-4">
                    <div className='text-center mx-auto pb-8'>
                        <h1 className='mx-auto mb-2 max-w-3xl text-balance text-4xl font-heading font-medium tracking-tight pb-8'>What is Charity Week? </h1>
                        <p className='mx-auto mb-6 max-w-3xl text-balance text-lg font-body leading-relaxed text-gray-800 text-center'>Charity Week is an annual, international student-led campaign. Each year, thousands of students unite to raise funds for projects that give hope, dignity, and opportunity to children worldwide. This year, we are partnering with Islamic Relief Canada. Our goal is to raise $25,000 to provide essential aid and support to those in need around the world.</p>

                    </div>
                </div>

                <div  className="container mx-auto px-4 py-4">
                     <div className='text-center mx-auto'>
                        <h1 className='mx-auto mb-2 max-w-3xl text-balance text-4xl font-heading font-medium tracking-tight pb-4'>What we're uniting for</h1>

                    </div>
                  
<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 py-20'>
        <div className="group rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-base-700 dark:bg-base-200">
      <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-base-200 dark:bg-base-300">
       
         <Image
            src="https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/palestine.png"
            alt="palestine"
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        
      </div>

      <div className="space-y-3">
        <header>
          <h3 className="text-lg font-semibold text-primary">Gaza, Palestine</h3>
            <ul className="text-sm text-base-content/70 list-disc list-inside space-y-1">
              <li>Improve maternal and newborn health by expanding safe childbirth services, including natural and caesarean deliveries, monthly medical follow-ups, and well-equipped health facilities.</li>
              <li>Support a life-saving program that will safely transport children to specialized care (in the UK), provide them healing, and return them home healthy.</li>
              <li>Help children restore their hearing by providing cochlear implants to children in Gaza as well as refugees residing in Jordan.</li>
            </ul>
        </header>

         
      </div>
    </div>
           <div className="group rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-base-700 dark:bg-base-200">
      <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-base-200 dark:bg-base-300">
       
           <Image
            src="https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/Screenshot%202025-10-14%20at%2010.34.53%20PM.png"
            alt="sudan"
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
      
      </div>

      <div className="space-y-3">
        <header>
          <h3 className="text-lg font-semibold text-primary">Sudan</h3>
          <ul className="text-sm text-base-content/70 list-disc list-inside space-y-1">
            <li>Lifesaving humanitarian assistance will be provided through food packs and shelter.</li>
            <li>Critical health care services will work to be restored by rebuilding hospital infrastructure in the maternity, surgical, and orthopaedic units.</li>
            <li>Classrooms will be rehabilitated by providing them with seating, educational materials and teacher kits.</li>
            <li>Water sources will be also rehabilitated by working on latrines, and installation of water supply system.</li>
          </ul>
        </header>

         
      </div>
    </div>
           <div className="group rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-base-700 dark:bg-base-200">
      <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-base-200 dark:bg-base-300">
       
          <Image
            src="https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bangladesh.png"
            alt="bangladesh"
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        
      </div>

      <div className="space-y-3">
        <header>
          <h3 className="text-lg font-semibold text-primary">Bangladesh</h3>
          <ul className="text-sm text-base-content/70 list-disc list-inside space-y-1">
            <li>Improving the living conditions by supporting construction of shelters, providing materials for repairs, and installing solar-powered street lights for displaced Rohingya families.</li>
            <li>Withdraw Rohingya children engaged in hazardous child labour and enrol them into formal schools.</li>
            <li>Monthly stipends will be given to girls for education in order to cover their tuition and school supplies.</li>
            <li>Strengthen ICT lab facilities and establish emergency medical care and vision-checking corners in selected secondary schools.</li>
          </ul>
        </header>

         
      </div>
    </div>

</div>

</div>

        <div>
        </div>

        <div className='text-center mx-auto'>
             <h1 className='mx-auto mb-2 max-w-3xl text-balance text-4xl font-heading font-medium tracking-tight pb-4'>How we're fundraising </h1>      
        </div>

         <div className="container hero mx-auto px-4 py-4">
           
             <div id="events" className="flex-grow">
                        {items.map((event, index) => (
                          <EventCard
                            key={index}
                            name={event.name}
                            image={event.image}
                            caption={event.caption}
                            timeLocation={event.timeLocation || 
                                ""
                            }
                            index={index}
                            ctaText={event.ctaText}
                            link={event.link}
                          />
                        ))}
                      </div>
            </div>



      </div>
  )
}

export default page