import { CollectionConfig } from "payload";

// import { getEmailHtml } from "@/app/email/generateEmailHTML";
export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "mylaurier email",
    group: "Admin",
    defaultColumns: [
      "firstName",
      "lastName",
      "mylaurierEmail",
      "studentId",
      "newsletter",
    ],
  },
  access: {
    create: () => true,
    update: () => true,
  },
  // hooks: {
  //   afterChange: [({ doc, operation, req }) => {
  //     const htmlContent = getEmailHtml(
  //       doc["firstName"],
  //       doc["lastName"],
  //       doc["mylaurierEmail"],
  //       doc["studentId"],
  //       doc["newsletter"],
  //     );

  //     console.log(doc["mylaurier email"]);
  //     if (operation === "create") {
  //       console.log("sending...");
  //       try {
  //         req.payload.sendEmail({
  //           from: "onboarding@resend.dev",
  //           to: doc["mylaurier email"],
  //           subject: "welcome to the msa!!",
  //           html: htmlContent,
  //         });
  //       } catch (e) {
  //         console.log("an error occurred :( ");
  //       }
  //     }
  //   }],
  // },
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      name: "mylaurierEmail",
      type: "email",
      required: true,
    },

    {
      name: "studentId",
      type: "text",
    },
    {
      name: "newsletter",
      type: "checkbox",
    },
  ],
};
export default Members;
