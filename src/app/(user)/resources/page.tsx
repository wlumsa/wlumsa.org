import React from "react";
import { getResources } from "@/Utils/datafetcher";
// /**
//  * Renders the Resources page component.
//  * Fetches the resources data and renders the appropriate JSX based on the resource group type.
//  * @returns The JSX for the Resources page.
//  */


// export default async function ResourcesPage() {
//   const res = await getResources();
//   const resourcesData= res;


//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="mt-20 flex-grow px-20">
//         <h1 className="my-10 text-4xl font-bold text-primary">Resources</h1>
//         {resourcesData.map((resourceGroup , index) => {
//           // Check if the group is "Single Link" and render a different JSX
//           if (resourceGroup.link.length == 1 ) {
//             return resourceGroup.link.map((item, index) => (
//               <a
//                 key = {index}
//                 href={typeof item === 'object' ? item.url : '#'}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block p-2 text-xl font-medium"
//               >
//                 {typeof item === 'object' ? item.title : ''}
//               </a>
//             ));
//           } else {
//             // Render the collapsible group for other types of resources
//             return (
//               <details
//                 key={index}
//                 className="collapse collapse-arrow border bg-secondary text-base-content"
//               >
//                 <summary className="collapse-title text-xl font-medium text-primary">
//                   {resourceGroup.title} Resources
//                 </summary>
//                 <ul className="collapse-content">
//                   {resourceGroup.link.map((item, linkIndex) => (
//                     <li key={linkIndex}>
//                       <a
//                         href={typeof item === 'object' ? item.url : '#'}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         - {typeof item === 'object' ? item.title : ''}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </details>
//             );
//           }
//         })}
//       </main>
//     </div>
//   );
// }

export default async function ResourcesPage() {
  const resourcesData = await getResources()


  return (
    <div className="py-14 mt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-primary">
            Resources
          </h1>
          <h4 className="mt-8 text-xl text-accent">
            Looking for something? Here are all the resources the Laurier MSA has to provide!
          </h4>
        </div>

        <div className="container mx-auto my-12 space-y-4">
          {resourcesData.map((resourceGroup, index) => {
            // Check if the group is "Single Link" and render a different JSX
            if (resourceGroup.link.length == 1) {
              return resourceGroup.link.map((item, index) => (
                <a
                  key={index}
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
        </div>
      </div>
    </div>
  )
}

/*
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
  <div className="collapse-content">
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
  <div className="collapse-content">
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
  <div className="collapse-content">
    <p>hello</p>
  </div>
</div>
 */