import React, { useEffect, useState } from "react";
import Email from "../../components/emails/newsletter"; // Adjust the import path as necessary
import {
    EntityCustomViewParams,
    useStorageSource
} from "firecms";

export function EmailPreview({ entity }: EntityCustomViewParams<EmailEntry>) {
  const [contentResolved, setContentResolved] = useState<(EmailEntryText | EmailEntryAttachments | { value: string[]; type: "images"; })[] | null>(null);
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
            setContentResolved(contentResolved);
          });
      }
    }, [entity, storage]);
  
    // Render the Email component directly if contentResolved is available
    return (
      <div>
        {contentResolved ? (
          <Email
            firstName={'First Name'}
            lastName={'Last Name'}
            content={contentResolved}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }