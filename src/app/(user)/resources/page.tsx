import React from "react";

import { getResourcesData } from "../../../Utils/api";
export const revalidate = 3600
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
                className="mb-4 border border-base-300 bg-base-200"
              >
                <summary className="cursor-pointer text-xl font-medium">
                  {resourceGroup.group} Resources
                </summary>
                <ul className="p-2">
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
