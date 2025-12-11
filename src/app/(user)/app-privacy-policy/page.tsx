import React from 'react'
import BlurFade from '@/components/UI/BlurFade'

const page = () => {
    return (
        <div className='flex min-h-screen flex-col '>
            <div className="hero-content mx-auto mt-24 hero px-4 py-4" >
                <div className="max-w-5xl ">
                    <BlurFade>
                        <h1 className="pt-4 text-3xl  text-center  font-heading font-bold text-primary duration-200 hover:scale-105 md:text-center md:text-4xl lg:pt-0">
                            WLU MSA App Privacy Policy
                        </h1>
                    </BlurFade>

                    <BlurFade delay={0.5}>
                    <div className='py-12'>
                        The WLU MSA is committed to protecting your privacy. This Privacy Policy explains what information we collect with regards to the mobile WLU MSA app, how it is used, and your rights regarding that information.
                        By downloading and using the app, that means you agree to the Privacy Policy. If you do not agree, do not use the app.

                    </div>
                        <div className='flex flex-col '>
                            <div className='flex flex-col'>
                                <p className='text-md  font-bold  lg:pt-0'>Last Updated: 10/12/2025</p>
                                <p className='text-md  font-bold  lg:pt-0'>Effective Date: 10/12/2025</p>
                            </div>

                        </div>
                    </BlurFade>



                    <div className='flex flex-col'>
                        <div className='py-8'>
                            <div className='py-4'>
                                <h1 className='text-2xl font-heading font-bold text-primary md:text-2xl lg:pt-0'>1. Information We Collect</h1>
                            </div>
                            <div>
                                <h2 className='text-xl font-heading font-bold  lg:pt-0'>1.1. No Personal Information Collected</h2>
                                <p className='text-md lg:pt-0'>
                                    We do not collect, store, or process any personal data that can identify you, such as your name, email address, phone number, or student ID.
                                    You can use the WLU MSA App without creating an account and without providing any identifying information.
                                </p>

                            </div>
                        </div>
                        {/* 2. Information We Collect */}
                        <div>
                            <div className="py-8">
                                <h1 className='text-2xl font-heading font-bold text-primary   md:text-2xl lg:pt-0'> 2. Automatically Collected Information
                                </h1>

                                <p className='text-md lg:pt-0 py-2'>The only data collected is standard, non-personally-identifiable analytics information automatically provided by third-party tools used for app functionality and performance monitoring.
                                </p>
                            </div>
                            <div className='py-2'>
                                <h2 className='text-xl font-heading font-bold  lg:pt-0 py-4 '>2.1. Expo (React Native Framework)
                                </h2>
                                <p className='text-md lg:pt-0'>Expo is a framework for building mobile apps using React Native. It automatically collects the following information:</p>
                                <ul className='list-disc list-inside text-md lg:pt-0'>
                                    <li>Device type and OS version                                    </li>
                                    <li>Crash reports</li>
                                    <li>Performance metrics</li>
                                </ul>
                                <p className='text-md lg:pt-0'>This information does not identify you and is used solely to ensure the app runs smoothly. You may review Expo’s privacy policy here: <a href='https://expo.dev/privacy' className='text-primary'>https://expo.dev/privacy</a>
                                </p>
                            </div>

                            <div className='py-2'>
                                <h2 className='text-xl font-heading font-bold  lg:pt-0 py-4'>2.2. PostHog (Analytics Platform)
                                </h2>
                                <p className='text-md lg:pt-0'>We use PostHog strictly for anonymous usage analytics, such as:                                </p>
                                <ul className='list-disc list-inside text-md lg:pt-0'>
                                    <li>Screens visited</li>
                                    <li>Button taps</li>
                                    <li>Feature usage patterns</li>
                                    <li>Anonymous session identifiers</li>
                                </ul>
                                <p className='text-md lg:pt-0'> PostHog’s privacy policy can be found at: <a href='https://posthog.com/privacy' className='text-primary'>https://posthog.com/privacy</a>
                                </p>
                            </div>
                        </div>
                        {/* 3. How We Use Your data */}
                        <div  className="py-8">
                            <div>
                                <h1 className='text-2xl font-heading font-bold text-primary md:text-2xl lg:pt-0'>3. How We Use the Data
                                </h1>
                            </div>
                            <div className="py-2">
                                <p className='text-md lg:pt-0'>The anonymous analytics described above are used only to:
                                </p>
                                <ul className='list-disc list-inside text-md lg:pt-0'>
                                    <li>Improve the functionality of the WLUMSA App</li>
                                    <li>Understand which features are most useful to users</li>
                                    <li>Fix bugs and enhance performance</li>
                                    <li>Provide a better experience for the WLUMSA community</li>
                                </ul>
                                <p className='text-md lg:pt-0'> We do not share this data with any third parties.
                                </p>

                            </div>
                        </div>
                        {/* 4. Data Sharing */}
                        <div  className="py-8">
                            <div>
                            <h1 className='text-2xl font-heading font-bold text-primary md:text-2xl lg:pt-0'>4. Data Sharing                            </h1>
                            </div>
                            <div className='py-2'>
                                <p className='text-md lg:pt-0'>
                                We do not share any personally identifiable information with any third parties because none is collected. Anonymous analytics data may be processed by Expo and PostHog. These services process data exclusively to support app functionality and diagnostics.
                                </p>

                            </div>
                        </div>
                        {/* 5. Data Security */}
                        <div  className="py-8">
                            <div>
                            <h1 className='text-2xl font-heading font-bold text-primary md:text-2xl lg:pt-0'>5. Data Security                            </h1>
                            </div>
                            <div className='py-2'>
                                <p className='text-md lg:pt-0'>
                                Although we do not store personal information, we take standard technical precautions to protect the anonymous diagnostic and performance data processed through our third-party services.
                                </p>

                            </div>
                        </div>
                             {/* 6. Changes to This Privacy Policy */}
                        <div  className="py-8">
                            <div>
                            <h1 className='text-2xl font-heading font-bold text-primary   md:text-2xl lg:pt-0'>6. Changes to This Privacy Policy                            </h1>
                            </div>
                            <div className='py-2'>
                                <p className='text-md lg:pt-0'>
                                We may update this Privacy Policy to reflect changes in technology, app features, or legal requirements. When updates occur, we will update the Last Updated date at the top of this page.
                                </p>

                            </div>
                        </div>
                             {/* 7. Contact Information */}
                        <div className="py-8">
                            <div>
                            <h1 className='text-2xl font-heading font-bold text-primary md:text-2xl lg:pt-0'>7. Contact Us                            </h1>
                            </div>
                            <div className='py-2'>
                                <p className='text-md lg:pt-0'>
                                If you have any questions or concerns about this Privacy Policy, please contact the WLU MSA team.
                                </p>
                                <ul className='list-disc list-inside text-md lg:pt-0'>
                                    <li className="font-bold">Email: <a href='mailto:msa@wlu.ca' className='text-primary'>msa@wlu.ca</a></li>
                                    <li className= "font-bold">Website: <a href='https://wlumsa.org/contact' className='text-primary'>wlumsa.org/contact</a></li>
                                  
                                </ul>

                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default page
