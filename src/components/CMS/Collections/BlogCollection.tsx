import { buildCollection, buildProperty } from "firecms";
import { BlogEntryPreview } from "./BlogEntryPreview";

export const blogCollection = buildCollection<BlogEntry>({
  name: "Blog entry",
  path: "blog",
  views: [
    {
      path: "preview",
      name: "Preview",
      Builder: BlogEntryPreview,
    },
  ],
  properties: {
    name: buildProperty({
      name: "Name",
      validation: { required: true },
      dataType: "string",
    }),
    tagline: buildProperty({
      name: "Tagline",
      validation: { required: true },
      dataType: "string",
    }),
    header_image: buildProperty({
      name: "Header image",
      dataType: "string",
      storage: {
        mediaType: "image",
        storagePath: "images/blog",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    }),
    content: buildProperty({
      name: "text",
      description: "Markdown format",
      validation: { required: true },
      dataType: "string",
      columnWidth: 400,
      markdown: true,
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
          disabled: !values.content,
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
  },
});
