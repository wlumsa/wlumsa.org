import React, { useEffect, useState } from "react";
import { render } from '@react-email/render';

import Email from "../emails/newsletter";
import {
    EntityCustomViewParams,
    useStorageSource
} from "firecms";
// Define the types for your Email content entries
type EmailEntryImages = {
  type: "images";
  value: string[];
};

type EmailEntryText = {
  type: "text";
  value: string;
};
type EmailEntryAttachments = {
  type: "attachments";
  value: string[];
};
// Define the props for your Email component



// Define the structure for the modified values you expect from FireCMS


// Define the props for your Email component
interface EmailEntry  {
  name: string;
  subject:string;
 content: (EmailEntryImages | EmailEntryText | EmailEntryAttachments)[];
  created_on: Date;
  status: string;
  sendEmail:boolean;
  distributionListType: "members" | "custom";
  customEmails?: string; // Optional, only if distributionListType is 'custom'
}

/**
 * This component is used to render the Email component within an iframe for previewing
 * the content dynamically based on the data modified in FireCMS.
 */
export function EmailPreview({ entity }: EntityCustomViewParams<EmailEntry>) {
    const [htmlContent, setHtmlContent] = useState('');
    const storage = useStorageSource();
    
    useEffect(() => {
      if (entity && entity.values.content) {
        const filteredContent = entity.values.content
          .filter(entry => entry.type !== 'attachments')
          .map(async (entry) => {
            if (entry.type === "images") {
              const imageUrls = await Promise.all(entry.value.map((imagePath) =>
                storage.getDownloadURL(imagePath).then((res) => res.url)
              ));
              return { ...entry, value: imageUrls };
            } else {
              return entry;
            }
          });
  
          Promise.all(filteredContent).then((contentResolved) => {
          // Render the Email component with all required props including resolved URLs
          const emailComponent = (
            <Email
              firstName={'First Name'}
              lastName={'Last Name'}
              content={contentResolved}
            />
          );
          // Convert the Email component to an HTML string using @react-email/render
          const html = render(emailComponent, { pretty: true });
          // Update the state with the HTML string
          setHtmlContent(html);
        });
      }
    }, [entity, storage]);
  
    // Render the HTML content in an iframe for preview
    return (
      <iframe
        srcDoc={htmlContent}
        title="Email Preview"
        style={{ width: '100%', height: '700px', border: 'none' }}
      />
    );
  }