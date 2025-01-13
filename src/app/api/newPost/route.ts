import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const furnishingOptions: { [key: string]: string } = {
    1: "Furnished",
    2: "Unfurnished",
    3: "Partially Furnished"
  }
  const propertyTypeOptions: { [key: string]: string }  = {
    1: "House",
    2: "Apartment",
    3: "Condo",
    4: "Townhouse"
  }
  const GenderOptions: { [key: string]: string } = {
    1: "Sister",
    2: "Brother",
  }
  const UtilitiesOptions: { [key: string]: string } = {
    1: "Wifi",
    2: "Electricity, water, gas",
    3: "Laundry (in unit)",
    4: "Laundry (on site)",
    5: "Heating",
    6: "Air Conditioning",
};
const AmenitiesOptions: { [key: string]: string } = {
  1: "Parking available",
  2: "Recreational spaces",
  3: "Pets allowed",
  4: "Private kitchen",
  5: "Private bathroom",
};

  
export async function POST(request: Request) {
  try {
    const {formData} = await request.json();

    const subject = ` WLU MSA Roommate Service -  New Post `;
    const textContent = `A new listing has been created. \n
     Post Information: \n
        Title: ${formData.title} \n
        Posted by: ${formData.author} \n
  
        Email: ${formData.email} \n
        Address: ${formData.address} \n
        Available Date: ${format(formData.availableDate, "MMM dd")} \n
        Property Type: ${propertyTypeOptions[formData.propertyType]} \n
        Description: ${formData.description} \n
        Furnishing Type: ${furnishingOptions[formData.furnishingType]} \n
        Gender: ${GenderOptions[formData.gender]} \n
        Rent: $${formData.rent} \n
        Deposit: $ ${formData.deposit} \n
        Utilities: ${formData.utilities.map((utility:string) => UtilitiesOptions[utility]).join(", ")} \n
        Amenities: ${formData.amenities.map((amenity:string) => AmenitiesOptions[amenity]).join(", ")} \n
        Phone number: ${formData.phoneNumber} \n
        Image links: ${formData.images}
 \n
    `;

    const response =  await resend.emails.send({
      from: `WLU MSA <admin@wlumsa.org>`,
      to: ["moha5150@mylaurier.ca", `${formData.email}`, "admin@wlumsa.org" ],
      subject: subject,
      text: textContent,
      headers: {
        "X-Priority": "1",
      },
    });
    
    console.log(response)
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "missing content" });
  }
}
