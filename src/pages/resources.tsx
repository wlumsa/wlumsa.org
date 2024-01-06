import React from "react";

import { useState, useEffect } from "react";

import { GetStaticProps } from "next";
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

interface OtherResource {
  title: string;
  link: string;
}

interface ReligiousResource {
  title: string;
  link: string;
}


export const getStaticProps: GetStaticProps = async () => {
  const socialsCollectionRef = collection(db, 'Socials');
  const socialQuery = query(socialsCollectionRef, orderBy("index", "asc"));
  const socialsSnapshot = await getDocs(socialQuery);
  const socialLinksData = socialsSnapshot.docs.map((doc) => doc.data() as SocialLink);

  const campusResourcesRef = collection(db, 'CampusResources');
  const campusResourcesSnapshot = await getDocs(campusResourcesRef);
  const campusResourcesData = campusResourcesSnapshot.docs.map((doc) => doc.data() as CampusResource);

  const otherResourcesRef = collection(db, 'OtherResources');
  const otherResourcesSnapshot = await getDocs(otherResourcesRef);
  const otherResourcesData = otherResourcesSnapshot.docs.map((doc) => doc.data() as OtherResource);

  const religiousResourcesRef = collection(db, 'ReligiousResources');
  const religiousResourcesSnapshot = await getDocs(religiousResourcesRef);
  const religiousResourcesData = religiousResourcesSnapshot.docs.map((doc) => doc.data() as ReligiousResource);

  return {
    props: {
      socialLinksData,
      campusResourcesData,
      otherResourcesData,
      religiousResourcesData,
    },
    
    revalidate: 43200, 
  };
};

const ResourcesPage: NextPage<{ socialLinksData: SocialLink[], campusResourcesData: CampusResource[], otherResourcesData: OtherResource[], religiousResourcesData: ReligiousResource[] }> = ({ socialLinksData, campusResourcesData, otherResourcesData, religiousResourcesData }) => {
  
  return (
    <div className="mt-20">
      
      {/*Desktop*/}

      

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
            {campusResourcesData.map((resource, index) => (
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
            {religiousResourcesData.map((resource, index) => (
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
            {otherResourcesData.map((resource, index) => (
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
