
import React from "react";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { getResourcesByCategory, getAllResources } from "@/Utils/datafetcher";
import type { Link } from '@/payload-types';

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

  let resourcesData;
  try {
    if (categoryId === '0' || categoryId === '1') {
      // All Resources or General Forms (default), fetch all resources
      resourcesData = await getAllResources();
      console.log('Resources fetched successfully:', resourcesData);
      console.log('Resources structure:', resourcesData?.map(r => ({
        id: r.id,
        title: r.title,
        category: r.category,
        linkCount: Array.isArray(r.link) ? r.link.length : 'Not an array',
        linkData: r.link
      })));
    } else {
      resourcesData = await getResourcesByCategory(categoryId);
      console.log('Resources by category fetched successfully:', resourcesData);
    }
  } catch (error) {
    console.error('Error fetching resources:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      categoryId,
      query
    });
    resourcesData = [];
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


  return (
    <div className="py-14 mt-16">
      <div className="mx-auto max-w-screen-md px-4 py-4 lg:px-6 lg:py-12">
        <h1 className="mb-4 text-center text-4xl font-bold text-primary">Resources</h1>
        <h1 className="text-center">Your one-stop hub for all MSA and Campus Resources</h1>
        {/* <SearchBar/>  */}
      </div>

      <div className="mx-auto max-w-screen-md px-4 lg:px-6 text-center h-screen">
        <div className=""></div>
        <ButtonGroup categories={categories}   />

        <div className="container space-y-4 py-4">
          {resourcesData && resourcesData.length > 0 ? (
            resourcesData.map((resource: any, index: number) => (
              <div key={index}>
                {Array.isArray(resource.link) && resource.link.length > 0 ? (
                  resource.link.map((link: any, linkIndex: number) => (
                    <div
                      key={linkIndex}
                      className="bg-primary rounded text-center p-2 hover:bg-secondary transition ease-in-out delay-150 hover:-translate-y-1 mb-2"
                    >
                      <a
                        href={link.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 text-xl font-medium text-white"
                      >
                        {link.title || resource.title || 'Untitled Resource'}
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="bg-primary rounded text-center p-2 hover:bg-secondary transition ease-in-out delay-150 hover:-translate-y-1">
                    <a
                      href="#"
                      className="block p-2 text-xl font-medium text-white"
                    >
                      {resource.title || 'Untitled Resource'}
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-base-content/60 py-8">
              <p className="text-lg mb-2">No resources found for this category.</p>
              <p className="text-sm mb-4">Resources will appear here once they are added to the system.</p>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/70">
                  <strong>Debug Info:</strong> Category ID: {categoryId},
                  Resources Count: {resourcesData?.length || 0}
                </p>
                <p className="text-sm text-base-content/70 mt-2">
                  Check the browser console for detailed error information.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
