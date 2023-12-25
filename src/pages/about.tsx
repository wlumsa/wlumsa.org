import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
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

      const serviceInfoData = querySnapshot.docs.map(
        (doc) => doc.data() as ServiceItem
      );
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
            <div className="hero-content flex flex-col items-center gap-8 px-0  lg:flex-row">
              <img
                src="/logo.png"
                className="max-w-[300px] rounded-lg shadow-2xl lg:mb-0"
              />
              <div>
                <h1 className="text-5xl font-bold text-primary">About us</h1>
                <p className="py-6 text-lg">
                  The <strong>Laurier Muslim Student Association (MSA)</strong>{" "}
                  is a student-run organization at Laurier which was founded in
                  2010. Its primary purpose is to provide a platform for Muslim
                  students to come together, practice their faith, engage in
                  community service, and promote understanding and awareness of
                  Islam on campus.
                </p>
              </div>
            </div>
          </div>

          {/* Services Offered Section */}
          <div className="flex-1 " id="services">
            <h2 className="mb-4 text-4xl font-bold text-primary ">
              Services Offered
            </h2>
            <div className="mb-10 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 ">
              {servicesInfo.map((service, index) => (
                <div
                  className="card card-compact w-96 bg-base-100 shadow-xl"
                  key={index}
                >
                  <div className="card-body">
                    <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                      {service.title}
                    </h3>
                    <p className="text-neutral">{service.description}</p>
                    {/* Conditionally render the button if service.link is not empty */}
                    {service.link && (
                      <div className="card-actions justify-end">
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary"
                        >
                          <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                            Learn more
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default About;
