import { EmailPreview } from "../EmailPreview";

import {
  buildCollection,
  buildProperty,

} from "firecms";
export const EmailCollection = buildCollection<EmailEntry>({
    name: "Emails",
    path: "Emails",
    views: [{ path: "preview", name: "Preview", Builder: EmailPreview }],
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isMarketing = authController.extra?.roles.includes("Marketing");
      const isEvents = authController.extra?.roles.includes("Events");
      const isExternal = authController.extra?.roles.includes("External");
      return {
        edit: isAdmin || isMarketing || isEvents || isExternal,
        create: isAdmin || isMarketing || isEvents || isExternal,
        delete: isAdmin || isMarketing || isEvents || isExternal,
      };
    },
    properties: {
      name: buildProperty({
        name: "Title",
        validation: { required: false },
        dataType: "string",
      }),
      subject: buildProperty({
        name: "Subject",
        validation: { required: true },
        dataType: "string",
      }),
      content: buildProperty({
        name: "Content",
        description:
          "Example of a complex array with multiple properties as children",
        validation: { required: true },
        dataType: "array",
        columnWidth: 400,
        oneOf: {
          typeField: "type",
          valueField: "value",
          properties: {
            images: buildProperty({
              name: "Images",
              dataType: "array",
              of: buildProperty({
                dataType: "string",
                storage: {
                  mediaType: "image",
                  storagePath: "emails/images",
                  acceptedFiles: ["image/*"],
                  metadata: { cacheControl: "max-age=1000000" },
                },
              }),
              description:
                "This fields allows uploading multiple images at once and reordering",
            }),
            attachments: buildProperty({
              name: "Attachments - Not recommended for large amount of ppl",
              dataType: "array",
              of: buildProperty({
                dataType: "string",
                storage: {
                  mediaType: "file",
                  storagePath: "emails/attachments",
                  acceptedFiles: [".pdf", ".doc", ".docx", ".xls", ".xlsx"], // List of accepted file types
                },
              }),
              description:
                "This field allows uploading files like documents and images.",
            }),
            text: buildProperty({
              dataType: "string",
              name: "Text",
              markdown: true,
            }),
          },
        },
      }),
      status: buildProperty(({ values }) => ({
        name: "Status",
        validation: { required: true },
        dataType: "string",
        columnWidth: 140,
        enumValues: {
          published: {
            id: "published",
            label: "Published",
          },
          draft: "Draft",
        },
        defaultValue: "draft",
      })),
      created_on: buildProperty({
        name: "Created on",
        dataType: "date",
        autoValue: "on_create",
      }),
  
      distributionListType: buildProperty({
        name: "Distribution List Type",
        dataType: "string",
        validation: { required: true },
        enumValues: {
          members: {
            id: "members",
            label: "Members",
          },
          custom: {
            id: "custom",
            label: "Custom",
          },
        },
      }),
      customEmails: buildProperty(({ values }) => ({
        name: "Enter Emails",
        dataType: "string",
        multiline: true,
        disabled: values.distributionListType !== "custom" && {
          clearOnDisabled: true,
          disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
          hidden: true,
        },
      })),
      sendEmail: buildProperty(({ values }) => ({
        name: "Send Email",
        dataType: "boolean",
        validation:
          values.distributionListType == "custom"
            ? { required: true }
            : undefined,
        defaultValue: false,
        // Conditional rendering based on the status
  
        disabled: values.status !== "published" && {
          clearOnDisabled: true,
          disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
          hidden: true,
        },
      })),
    },
    callbacks: {
      onSaveSuccess: async ({ values, context }) => {
        if (
          values.sendEmail &&
          values.status === "published" &&
          values.content &&
          values
        ) {
          const contentWithUrls = await Promise.all(
            values.content.map(async (entry) => {
              if (entry.type === "images" || entry.type === "attachments") {
                const fileUrls = await Promise.all(
                  entry.value.map((filePath) =>
                    context.storageSource
                      .getDownloadURL(filePath)
                      .then((res) => res.url)
                  )
                );
                return { ...entry, value: fileUrls };
              } else {
                return entry;
              }
            })
          );
  
          const emailData = {
            name: values.name,
            subject: values.subject,
            content: contentWithUrls,
            status: values.status,
            distributionList:
              values.distributionListType === "custom"
                ? values.customEmails
                : "Members",
            created_on: values.created_on,
          }; 
          
         
          const endpoint = values.sendEmail ? `/api/sendemails` : "";
  
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
          });
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
      },
    },
  });