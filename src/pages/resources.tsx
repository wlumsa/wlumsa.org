import React from "react";

import { useState, useEffect } from "react";


import { collection, getDocs, query, orderBy } from "firebase/firestore";

import db from "../firebase";
import { NextPage } from "next";

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

interface CampusResource {
  title: string;
  link: string;
}
interface ReligiousResource {
  title: string;
  link: string;
}
interface OtherResource {
  title: string;
  link: string;
}
const ResourcesPage: NextPage = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [campusResources, setCampusResources] = useState<CampusResource[]>([]);
  const [religiousResources, setReligiousResources] = useState<
    ReligiousResource[]
  >([]);
  const [otherResources, setOtherResources] = useState<OtherResource[]>([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const socialsCollectionRef = collection(db, "Socials");
      const socialQuery = query(socialsCollectionRef, orderBy("date", "asc"));
      const querySnapshot = await getDocs(socialQuery);

      const socialLinksData = querySnapshot.docs.map((doc) => {
        const socialData = doc.data() as SocialLink;
        return socialData;
      });

      setSocialLinks(socialLinksData);
    };
    const fetchResources = async () => {
      // Fetch Campus Resources
      const campusResourcesRef = collection(db, "CampusResources");
      const campusResourcesSnapshot = await getDocs(campusResourcesRef);
      const campusResourcesData = campusResourcesSnapshot.docs.map(
        (doc) => doc.data() as CampusResource
      );
      setCampusResources(campusResourcesData);

      const otherResourcesRef = collection(db, "OtherResources");
      const otherResourcesSnapshot = await getDocs(otherResourcesRef);
      const otherResourcesData = otherResourcesSnapshot.docs.map(
        (doc) => doc.data() as OtherResource
      );
      setOtherResources(otherResourcesData);
      const religiousResourcesRef = collection(db, "ReligiousResources");
      const religiousResourcesSnapshot = await getDocs(religiousResourcesRef);
      const religiousResourcesData = religiousResourcesSnapshot.docs.map(
        (doc) => doc.data() as ReligiousResource
      );
      setReligiousResources(religiousResourcesData);
    };
    fetchSocialLinks();
    fetchResources();
  }, []);

  return (
    <div className="">
      
      {/*Desktop*/}

      <div className="mt-20 hidden items-center md:flex  md:flex-col">
        <div className="m-10 grid w-full grid-cols-2 gap-10 ">
          <div className="flex flex-col ">
            <h3 className="pt-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0">
              Contact Us!
            </h3>
            <p className="text-center text-neutral lg:text-lg">
              Fill out the form or shoot us a message on one of our social media
              accounts!
            </p>
            <div className="flex flex-row">
              <div className="flex flex-col">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="mx-20 mt-[3.8rem] flex items-center duration-200 hover:scale-105"
                  >
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        className="hover:fill-neutral-focus mr-2 h-6 w-6 fill-neutral"
                      >
                        <path d={social.icon}></path>
                      </svg>
                      <span className="text-neutral">{social.name}</span>
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-[3.8rem] w-full ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="flex justify-center"></div>
        </div>
      </div>
      {/* Section for small screens */}
      <div className="flex flex-col items-center px-4 md:hidden ">
        <h3 className="mt-20 pt-4 text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0">
          Contact Us!
        </h3>
        <p className="mb-10 text-center text-neutral lg:text-lg">
          Fill out the form or send us a message on one of our social media
          accounts!
        </p>

        <div className="my-6 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
            className="h-96 w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Resources */}
      <div className="m-10">
        <h2 className="mb-10 pt-4 text-3xl font-bold text-primary lg:pt-0 ">
          Resources Available
        </h2>

        <details className="mb-4  border border-base-300 bg-base-200">
          <summary className="cursor-pointer text-xl font-medium">
            Campus Resources
          </summary>
          <ul className="p-2">
            {campusResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  - {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <details className="mb-4 border border-base-300 bg-base-200">
          <summary className="cursor-pointer text-xl font-medium">
            Religious Resources
          </summary>
          <ul className="p-2">
            {religiousResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  - {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <details className="mb-4 border border-base-300 bg-base-200 ">
          <summary className="cursor-pointer text-xl font-medium">
            Other
          </summary>
          <ul className="p-2">
            {otherResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  - {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>

     
    </div>
  );
};

export default ResourcesPage;
