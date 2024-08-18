import { CollectionConfig } from 'payload';
import { NewsletterBlock } from '@/blocks/Emails/Newsletter';
import { EventBlock } from '@/blocks/Emails/Event';
import { GeneralBlock } from '@/blocks/Emails/General';
 export const EmailCollection: CollectionConfig = {
  slug: 'email-collection',
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "subject",
      type: "text",
    //  maxLength: 100,
    },
    {
      name: 'layout', // required
      type: 'blocks', // required
      minRows: 1,
      maxRows: 20,
      blocks: [
        // required
        NewsletterBlock,
        EventBlock,
        GeneralBlock,
      ],
    },
  ],
} 