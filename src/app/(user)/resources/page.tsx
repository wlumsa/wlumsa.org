
import React from "react";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { getResourceById } from "@/Utils/datafetcher";

interface Category {
  id:string,
  title:string
  }
export default  async function ResourcesPage({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) {
  //const query = searchParams?.query || '';
  const categoryId = searchParams?.category || '1';
  console.log(`here: ${categoryId}`)
  const resourcesData = await getResourceById(categoryId);
  console.log(resourcesData)
  const categories:Category[] = [
    {
      id:"1",
      title:"Event Forms"
    },
    {
       id:"2",
      title:"Campus Resources"
    },
    { id:"3",
      title:"Religious Resources"
    }, 
    { 
      id:"4",
      title:"Other"
    }
  ]


  return (
    <div className="py-14 mt-16">
      <div className="mx-auto max-w-screen-md px-4 py-4 lg:px-6 lg:py-12">
        <h1 className="mb-4 text-center text-4xl font-bold text-primary">Resources</h1>
        <h1 className="text-center">Your one-stop hub for all MSA and Campus Resources</h1>
         {/* <SearchBar/>  */}
      </div>
  
      <div className="mx-auto max-w-screen-md px-4 lg:px-6 text-center">
        <div className=" "></div>
        <ButtonGroup categories={categories} />

      <div className="container space-y-4   py-4">
        {resourcesData?.link?.map((item, index) => (
          <div
            key={index}
            className="bg-primary rounded text-center p-2 hover:bg-secondary transition ease-in-out delay-150 hover:-translate-y-1"
          >
            <a
              href={typeof item === 'object' ? item.url : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 text-xl font-medium text-white"
            >
              {typeof item === 'object' ? item.title : ''}
            </a>
          </div>
        ))}
            </div>
      </div>
    </div>
  );
}