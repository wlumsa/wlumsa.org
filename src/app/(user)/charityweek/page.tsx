import React from 'react'
import BlurFade from '@/components/UI/BlurFade'
import Link from 'next/link'

const page = () => {
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
                      <BlurFade delay={0.75}>
                        <div className="my-6 flex  flex-row justify-center">
                          <button className="btn btn-primary btn-sm mx-4 text-secondary duration-200 md:btn-md hover:scale-105 ">
                            <Link
                              href="https://fundraise.islamicreliefcanada.org/campaign/wlu-msa-x-irc-ramadan-campaign-2025-1446-ah-2625#attr=2858"
                              target="_blank"
                            >
                              Donate
                            </Link>
                          </button>
                          <button className="btn btn-secondary btn-sm mx-4 text-primary duration-200 md:btn-md hover:scale-105  ">
                            <Link href="/"></Link>
                          </button>
                        </div>
                      </BlurFade>
                    </div>
                  </div>
                </div>


                <div className="container mx-auto px-4 py-4">
                    <div className='text-center mx-auto'>
                        <h1 className='mx-auto mb-2 max-w-3xl text-balance text-4xl font-heading font-medium tracking-tight pb-8'>What is Charity Week? </h1>
                        <p className='mx-auto mb-6 max-w-3xl text-balance text-lg font-body leading-relaxed text-gray-800 text-center'>Charity Week is an annual, international student-led campaign. Each year, thousands of students unite to raise funds for projects that give hope, dignity, and opportunity to children worldwide. This year, we are partnering with Islamic Relief Canada. Our goal is to raise $25,000 to provide essential aid and support to those in need around the world.</p>

                    </div>
                </div>

                <div  className="container mx-auto px-4 py-4">
                     <div className='text-center mx-auto'>
                        <h1 className='mx-auto mb-2 max-w-3xl text-balance text-4xl font-heading font-medium tracking-tight pb-8'>What we're uniting for</h1>

                    </div>
                  
<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div className="group rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-base-700 dark:bg-base-200">
      <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-base-200 dark:bg-base-300">
       
          {/* <Image
            src={store.image.url}
            alt={store.image?.alt || store.name}
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
         */}
      </div>

      <div className="space-y-3">
        <header>
          <h3 className="text-lg font-semibold text-primary">Gaza</h3>
          <p className="text-sm text-base-content/70"> Raising funds for the people of Gaza</p>
        </header>

         
      </div>
    </div>
           <div className="group rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-base-700 dark:bg-base-200">
      <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-base-200 dark:bg-base-300">
       
          {/* <Image
            src={store.image.url}
            alt={store.image?.alt || store.name}
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
         */}
      </div>

      <div className="space-y-3">
        <header>
          <h3 className="text-lg font-semibold text-primary">Sudan</h3>
          <p className="text-sm text-base-content/70"> Raising funds for the people of sudan</p>
        </header>

         
      </div>
    </div>
           <div className="group rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-base-700 dark:bg-base-200">
      <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-base-200 dark:bg-base-300">
       
          {/* <Image
            src={store.image.url}
            alt={store.image?.alt || store.name}
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
         */}
      </div>

      <div className="space-y-3">
        <header>
          <h3 className="text-lg font-semibold text-primary">Bangladesh</h3>
          <p className="text-sm text-base-content/70"> Raising funds for the people of sudan</p>
        </header>

         
      </div>
    </div>

</div>

         </div>

        <div>
        </div>



      </div>
  )
}

export default page