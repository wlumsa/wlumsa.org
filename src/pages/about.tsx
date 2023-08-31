import { NextPage } from "next";
import React from 'react'
import Execs from "~/components/Execs";
import Navbar from "~/components/Navbar";


const About: NextPage = () => {
  return (
    <div>
        <Navbar/>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src="/logo.png" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">About us</h1>
                    <p className="py-6">The Laurier Muslim Student Association (MSA) is a student-run organization at Laurier which was founded in 2010. Its primary purpose is to provide a platform for Muslim students to come together, practice their faith, engage in community service, and promote understanding and awareness of Islam on campus.</p>
                </div>
            </div>
        </div>
        <Execs/>
    </div>
  )
}

export default About;