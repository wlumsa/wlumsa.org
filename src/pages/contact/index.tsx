import React from 'react'
import CtaForm from '~/components/CtaForm'
import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'
const Contact = () => {
  return (
    <div className=''>
        <Navbar/>
        <div className='flex flex-col items-center mt-20'>
        <section className=" " id="contact">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                <h2 className="text-3xl text-center font-bold text-primary pt-4 lg:pt-0 hover:scale-105 duration-200">Contact Us!</h2>
                        <p className="lg:text-lg text-center text-neutral">Fill out the form or shoot us a message on one of our social media accounts!</p>
               
            </div>
        </div>
        <div className="flex items-stretch justify-center">
           <CtaForm/>
        </div>
    </div>
</section>
        </div>
        <Footer/>
    </div>
   
  )
}

export default Contact

/*
 <div className="md:hidden flex flex-col items-center px-4 ">
                <h3 className="text-3xl mt-20 font-bold text-primary pt-4 lg:pt-0 hover:scale-105 duration-200">Contact Us!</h3>
                <p className="lg:text-lg text-center text-neutral mb-10">Fill out the form or send us a message on one of our social media accounts!</p>
                <CtaForm />
                <div className="w-full my-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
                        className="w-full h-96"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            */