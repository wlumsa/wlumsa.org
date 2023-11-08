import { NextPage } from "next";
import React, {useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore";
import db from "../firebase";
import Execs from "~/components/Execs";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

interface ServiceItem {
    title: string;
    description: string;
    link: string;
}

const About: React.FC = () => {
    const [servicesInfo, setServiceInfo] = useState<ServiceItem[]>([]);
  
    useEffect(() => {
      const fetchServiceInfo = async () => {
        const serviceCollectionRef = collection(db, "ServicesOffered");
        const querySnapshot = await getDocs(serviceCollectionRef);
        
        const serviceInfoData = querySnapshot.docs.map(doc => doc.data() as ServiceItem);
        setServiceInfo(serviceInfoData);
      };
  
      fetchServiceInfo();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="min-h-screen  px-10">
                <div className="flex flex-col items-start lg:space-x-0 lg:space-y-10">

                    {/* About Us Section */}
                    <div className="hero min-h-screen">
                      <div className="hero-content flex flex-col lg:flex-row items-center gap-8 mb-12 px-0">
                          <img src="/logo.png" className="max-w-[300px] rounded-lg shadow-2xl mb-4 lg:mb-0" />
                          <div>
                              <h1 className="text-5xl font-bold text-primary">About us</h1>
                              <p className="py-6 text-lg">The <strong>Laurier Muslim Student Association (MSA)</strong> is a student-run organization at Laurier which was founded in 2010. Its primary purpose is to provide a platform for Muslim students to come together, practice their faith, engage in community service, and promote understanding and awareness of Islam on campus.</p>
                          </div>
                      </div>
                  </div>


                    {/* Services Offered Section */}
                    <div className="flex-1 mt-8 lg:mt-10 mb-40">
                        <h2 className="text-4xl font-bold text-primary mb-4">Services Offered</h2>
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-10">
                            <div className="service-card">
                                <h3 className="text-2xl font-semibold text-secondary mb-2">Events</h3>
                                <p className="text-neutral">
                                    Description about events, upcoming events, or a link to an events calendar.
                                </p>
                            </div>
                            <div className="service-card">
                                <h3 className="text-2xl font-semibold text-secondary mb-2">Mentorship</h3>
                                <p className="text-neutral">
                                    Information about the mentorship program, how to join, and its benefits.
                                </p>
                            </div>
                            <div className="service-card">
                                <h3 className="text-2xl font-semibold text-secondary mb-2">Religious Affairs</h3>
                                <p className="text-neutral">
                                    Details about religious services, prayer times, and other related activities.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* <div>
                        <table className="table mt-20 mb-10">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Link</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                            {servicesInfo.map((item, index) => (
                                <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.link}</td>
                                </tr>
                            ))}
                            </tbody>
                    </table>                      
                    </div>   */}

                </div>

                
            </div>
        </div>
    )
}

export default About;
