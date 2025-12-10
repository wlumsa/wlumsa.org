import React from 'react'
import BlurFade from '@/components/UI/BlurFade'

const page = () => {
  return (
    <div className='flex min-h-screen flex-col '>
         <div className="hero-content mt-24 text-center hero mx-auto px-4 py-4" >
                    <div className="max-w-5xl">
                      <BlurFade>
                        <h1 className="pt-4 text-3xl font-heading font-bold text-primary duration-200 hover:scale-105 md:text-center md:text-4xl lg:pt-0">
                         WLU MSA App Privacy Policy
                        </h1>
                      </BlurFade>
        
                      <BlurFade delay={0.5}>
                        <p className="py-4 text-center text-lg font-body md:text-xl">
                          This privacy policy outlines how we collect, use, and protect your personal information when you use the WLU MSA App.
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
  )
}

export default page
