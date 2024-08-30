
import { Block } from 'payload'
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'
export const NewsletterBlock: Block = {
  slug: 'Newsletter', // required
  imageURL: 'https://google.com/path/to/image.jpg',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'NewsletterBlock', // optional
  fields: [
    {
      name: "introContent",
      label: "Intro Content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
      required: true,
    },
    {
      name: 'days',
      type: 'array',
      fields: [
        {
          name: 'Day',
          type: 'select',
          options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              // The HTMLConverter Feature is the feature which manages the HTML serializers.
              // If you do not pass any arguments to it, it will use the default serializers.
              HTMLConverterFeature({}),
            ],
          }),

        },
        lexicalHTML('content', { name: 'content_html' }),
      ],
      maxRows: 7,
    },

    lexicalHTML('introContent', { name: 'introContent_html' }),

  ],

}
