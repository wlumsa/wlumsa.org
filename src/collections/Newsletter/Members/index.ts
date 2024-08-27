
import { CollectionConfig } from 'payload';

import { getEmailHtml } from '@/app/email/generateEmailHTML';
export const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'mylaurier email',
    group: 'Admin',
    defaultColumns: ['First Name', 'Last Name', 'mylaurier email', 'Student Id', 'Newsletter']
},  access: {
    create: () => true, 
    update: () => true,
},
  hooks: {
    afterChange: [ ({doc, operation,req}) => {
        const htmlContent = getEmailHtml(doc['First Name'], doc['Last Name'], doc['mylaurier email'], doc['Student Id'], doc['Newsletter']);

        console.log(doc['mylaurier email'])
        if(operation === 'create') {
            console.log("sending...")
            try {
                req.payload.sendEmail({
                    from: 'onboarding@resend.dev',
                    to: doc['mylaurier email'],
                    subject: 'welcome to the msa!!',
                    html: htmlContent
                })
            } catch(e) {
                console.log("an error occurred :( ")
            }
            
        }
    }]  
},
  fields: [
    {
      name: 'First Name',
      type: 'text',
  },
  {
    name: 'Last Name',
    type: 'text',
},
    {
      name:'mylaurier email',
      type: 'email',
      required: true,
    },
    
    
    {
      name:'Student Id',
      type:'text',
    },
    {
      name: 'Newsletter',
      type: 'checkbox',
  },
    
    
  
  ],
}
export default Members;
