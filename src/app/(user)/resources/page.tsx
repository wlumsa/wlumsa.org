import React from "react";
import { getResources } from "@/Utils/datafetcher";
/**
 * Renders the Resources page component.
 * Fetches the resources data and renders the appropriate JSX based on the resource group type.
 * @returns The JSX for the Resources page.
 */


export default async function ResourcesPage() {
  const res = await getResources();
  const resourcesData= res;
  

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mt-20 flex-grow px-20">
        <h1 className="my-10 text-4xl font-bold text-primary">Resources</h1>
        {resourcesData.map((resourceGroup , index) => {
          // Check if the group is "Single Link" and render a different JSX
          if (resourceGroup.link.length == 1 ) {
            return resourceGroup.link.map((item, index) => (
              <a
                key = {index}
                href={typeof item === 'object' ? item.url : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 text-xl font-medium"
              >
                {typeof item === 'object' ? item.title : ''}
              </a>
            ));
          } else {
            // Render the collapsible group for other types of resources
            return (
              <details
                key={index}
                className="collapse collapse-arrow border bg-secondary text-base-content"
              >
                <summary className="collapse-title text-xl font-medium text-primary">
                  {resourceGroup.title} Resources
                </summary>
                <ul className="collapse-content">
                  {resourceGroup.link.map((item, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={typeof item === 'object' ? item.url : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        - {typeof item === 'object' ? item.title : ''}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            );
          }
        })}
      </main>
    </div>
  );
}
