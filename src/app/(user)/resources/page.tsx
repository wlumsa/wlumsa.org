import React from "react";
import NextLink from "next/link";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { getResourcesByCategory } from "@/Utils/datafetcher";
import {
  Link as ResourceLink,
  Resource as ResourceType,
} from "@/payload-types";
import Resource from "@/components/UI/Resource";
import BlurFade from "@/components/UI/BlurFade";
import { ArrowRight } from "lucide-react";
interface Category {
  id: string;
  title: string;
}

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const categoryId = resolvedSearchParams.category || "0";

  let resourcesData: ResourceType[] = [];
  try {
    resourcesData = await getResourcesByCategory(categoryId);
  } catch (error: unknown) {
    console.error("Error fetching resources:", error);
    // resourcesData = [];
  }

  const categories: Category[] = [
    {
      id: "0",
      title: "All Resources",
    },
    {
      id: "1",
      title: "General Forms",
    },
    {
      id: "2",
      title: "Campus Resources",
    },
    {
      id: "3",
      title: "Religious Resources",
    },
    {
      id: "4",
      title: "Other",
    },
  ];

  const resourceLinks = resourcesData.flatMap((resource) =>
    resource.link.filter((link): link is ResourceLink => link !== null)
  );

  return (
    <div className="mt-16 py-14">
      <BlurFade delay={0.5}>
        <div className="mx-auto max-w-screen-md px-4 py-4 lg:px-6 lg:py-12">
          <h1 className="mb-4 text-center text-4xl font-bold text-primary">
            Resources
          </h1>
          <p className="text-center text-base-content/70">
            Your one-stop hub for all MSA and Campus Resources
          </p>
          <div className="mt-3 text-center">
            <NextLink
              href="/student-resources"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary underline decoration-primary/25 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              View the student guide
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </NextLink>
          </div>
          {/* <SearchBar/>  */}
        </div>
      </BlurFade>

      <BlurFade delay={0.7}>
        <div className="mx-auto max-w-screen-md px-4 text-center lg:px-6 ">
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
              <div className="py-8 text-center text-base-content/60">
                <p className="mb-2 text-lg">
                  No resources found for this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
