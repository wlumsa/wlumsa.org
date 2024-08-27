import { CollectionConfig } from "payload";
import { NewsletterBlock } from "@/blocks/Emails/Newsletter";
import { EventBlock } from "@/blocks/Emails/Event";
import { GeneralBlock } from "@/blocks/Emails/General";
import { getEmailHtmlEvent } from "@/app/email/generateEmailHTML";
import { convertRichTextToMarkdown } from "@/Utils/converter";
import DistributionList from "../Newsletter/Distribution-List";
import { sendEmail } from "./utils";
import payload from 'payload';
import { getDistributionList } from "@/Utils/datafetcher";

interface Person {
  id:string,
  first:string,
}

interface EventBlock {
  blockType: 'Event';
}


export const EmailCollection: CollectionConfig = {
  slug: "email-collection",
  labels: {
    singular: "Email Collection",
    plural: "Email Collection",
  },
  admin: {
    group: "Marketing",
    description: "Collection of emails for marketing purposes",
    
  }, 
  access: {
    update: () => true, 
},
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
      name: "layout", // required
      type: "blocks", // required
      minRows: 1,
      maxRows: 20,
      blocks: [
        // required
        NewsletterBlock,
        EventBlock,
        GeneralBlock,
      ],
    }, 
    
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        condition: (siblingData) => {
          if (siblingData.status == "published") {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    {
      name: "distributionList",
      label: "Distribution List(s)",
      type: "relationship",
      relationTo: "distribution-list",
      hasMany: false,
      required: true,
      admin: {
        condition: (siblingData) => {
          if (siblingData.status === "published") {
            return true;
          } else {
            return false;
          }
        },
        position: "sidebar",
      },
    },
    {
      name: "Send",
      label: "Send Email",
      type: "checkbox",
      hooks: {
        afterChange: [
         async ({ req, originalDoc, siblingData }) => {
          if (siblingData.Send === true) {
           // console.log("Event");
          
           /*  let htmlContent = '';
                const markdown = await convertRichTextToMarkdown(siblingData["Event Information"]);
                console.log(`Conversion: ${markdown}`);
                if (markdown) {
                    htmlContent = getEmailHtmlEvent(siblingData['Form Link'], markdown);                    
                } */
                /* const distributionListId = siblingData.distributionList;
                
                const list = await payload.findByID({
                  collection: "distribution-list",
                  id: distributionListId,
                });
                console.log(list); */
                
            }
      }
        ],
      },
      admin: {
        position: "sidebar",
        condition: (siblingData) => {
          if (siblingData.status == "published") {
            return true;
          } else {
            return false;
          }
        },
      },
    },
  ],
   

};

