import React from "react";

import { getResourcesData } from "../../../utils/datafetcher";
export const revalidate = 600
/**
 * Renders the Resources page component.
 * Fetches the resources data and renders the appropriate JSX based on the resource group type.
 * @returns The JSX for the Resources page.
 */
export default async function ResourcesPage() {
  const resourcesData = await getResourcesData();
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mt-20 flex-grow px-20">
        <h1 className="my-10 text-4xl font-bold text-primary">Resources</h1>
        {resourcesData.map((resourceGroup, index) => {
          // Check if the group is "Single Link" and render a different JSX
          if (resourceGroup.group === "SingleLink") {
            return resourceGroup.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 text-xl font-medium"
              >
                {link.name}
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
                  {resourceGroup.group} Resources
                </summary>
                <ul className="collapse-content">
                  {resourceGroup.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        - {link.name}
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
