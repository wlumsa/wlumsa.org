
import React from "react";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { getResourcesByCategory } from "@/Utils/datafetcher";
import {Link, Resource as ResourceType } from "@/payload-types";
import Resource from "@/components/UI/Resource";
import BlurFade from "@/components/UI/BlurFade";
interface Category {
  id: string,
  title: string
}

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | undefined }>


export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
  //const query = searchParams?.query || '';
  const categoryId = searchParams?.category || '0';

  let resourcesData: ResourceType[] = [];
  try {

      resourcesData = await getResourcesByCategory(categoryId);

  } catch (error: any) {
    console.error('Error fetching resources:', error);
   // resourcesData = [];
  }

  const categories: Category[] = [
    {
      id: "0",
      title: "All Resources"
    },
    {
      id: "1",
      title: "General Forms"
    },
    {
      id: "2",
      title: "Campus Resources"
    },
    {
      id: "3",
      title: "Religious Resources"
    },
    {
      id: "4",
      title: "Other"
    }
  ]

  const resourceLinks = resourcesData.flatMap((resource) =>
    resource.link.filter((link): link is Link => link !== null)
  )


  return (
    <div className="py-14 mt-16">
      <BlurFade delay={0.5}>
        <div className="mx-auto max-w-screen-md px-4 py-4 lg:px-6 lg:py-12">
          <h1 className="mb-4 text-center text-4xl font-bold text-primary">Resources</h1>
          <h1 className="text-center">Your one-stop hub for all MSA and Campus Resources</h1>
          {/* <SearchBar/>  */}
        </div>
      </BlurFade>

        <BlurFade delay={0.75}>
      <div className="mx-auto max-w-screen-md px-4 lg:px-6 text-center ">
        <div>

            <ButtonGroup categories={categories} />

        </div>



        <div className="mt-6 space-y-3 sm:space-y-4">

          {resourceLinks.length > 0 ? (
            resourceLinks.map((link, index) => (
              <Resource
                key={`${link.id ?? link.url ?? "resource"}-${index}`}
                title={link.title || "Untitled Resource"}
                url={link.url}
                className=""
              />
            ))
          ) : (
            <div className="text-center text-base-content/60 py-8">
              <p className="text-lg mb-2">No resources found for this category.</p>
            </div>
          )}

        </div>


      </div>
      </BlurFade>

    </div>
  );
}

