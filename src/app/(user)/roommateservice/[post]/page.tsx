// import React from "react";
// import { fetchRoommatePostById, fetchCommentsByPostId, createComment } from "@/Utils/datafetcher";
// import { format } from 'date-fns';
// import Link from "next/link";
// import CommentSection from "@/components/UI/CommentSection";
// import { Building, Facebook } from 'lucide-react';
// import { CalendarDays } from 'lucide-react';
// import Tag from "@/components/UI/Tag";
// import { Banknote, Users, House, Armchair, Phone, Mail } from "lucide-react";
// import ImageCarousel from "@/components/UI/ImageCarousel";
// import { Comment } from "@/payload-types";


// type Params = Promise<{ post: string }>

// interface CommentDisplay {
//   id: number;
//   author: string;
//   message: string;
//   date: string;
// }

// const furnishingOptions: { [key: string]: string } = {
//   1: "Furnished",
//   2: "Unfurnished",
//   3: "Partially Furnished"
// }
// const propertyTypeOptions: { [key: string]: string } = {
//   1: "House",
//   2: "Apartment",
//   3: "Condo",
//   4: "Townhouse"
// }
// const utilitiesOptions: { [key: string]: string } = {
//   1: "Wifi",
//   2: "Electricity, water, gas",
//   3: "Laundry (in unit)",
//   4: "Laundry (on site)",
//   5: "Heating",
//   6: "Air Conditioning",
// };
// const amenitiesOptions: { [key: string]: string } = {
//   1: "Parking available",
//   2: "Recreational spaces",
//   3: "Pets allowed",
//   4: "Private kitchen",
//   5: "Private bathroom",
// };

// const genderOptions: { [key: string]: string } = {
//   1: "Female",
//   2: "Male",
// };
// export default async function BlogPost(props: {
//   params: Params
// }) {
//   const params = await props.params


//   const id = decodeURIComponent(params.post)
//   const res = await fetchRoommatePostById(id);

//   console.log(res)
//   const post = res[0]


//   const date = post?.createdAt ? new Date(post?.createdAt) : null;
//   const formattedDate = date ? format(date, 'MMMM dd, yyyy') : null;
//   const formattedAvailableDate = post?.availableDate ? format(new Date(post?.availableDate), 'MMMM dd') : null;


//   const comments = await fetchCommentsByPostId(id);
//   let commentArray: CommentDisplay[] = [];
//   commentArray = commentArray.concat(comments.map((comment: Comment) => ({
//     id: comment.id,
//     message: comment.comment ?? '',
//     author: comment.author ? comment.author : "",
//     date: comment.createdAt
//   })));
//   console.log("comments", comments);



//   return (

//     <div className="mt-28  max-w-screen-lg  mx-auto">
//       <div className="flex flex-col items-center justify-center ">
//         <main className=" ">
//           <div className="w-[3/4] md:w-full " >
//             <ImageCarousel images={post?.images?.map((image: any) => image) || []} />

//           </div>

//           <div className="flex md:flex-row flex-col  md:justify-between max-w-[48em]">
//             <div className=" flex flex-col px-4 ">
//               <h1 className=" mt-4 text-4xl font-bold text-primary text-center md:text-left">{post?.title} </h1>
//               <p className="text-center md:text-left">Posted by {post?.author} on  {formattedDate ? formattedDate : ""}</p>
//             </div>

//             <div className="flex flex-col text-xl my-6 gap-2 text-center justify-center md:justify-start items-center md:items-start  ">
//               <div className="flex flex-row gap-2">
//                 <Building size={24} color="#2e046d" />
//                 <p> {post?.address} </p>
//               </div>
//               <div className="flex flex-row gap-2">
//                 <CalendarDays size={24} color="#2e046d" />
//                 <p>Available on {formattedAvailableDate}</p>
//               </div>
//               <div className="flex flex-row gap-2">
//                 <Banknote size={24} color="#2e046d" />
//                 <p> Rent: ${post?.rent.toString()} / month</p>
//               </div>

//             </div>
//           </div>
//           <div className="relative px-4 mx-auto mb-4 md:mb-0 max-w-[48em]">
//             <div className=" md:flex md:flex-row hidden  ">
//               <Tag text={genderOptions[post?.gender as string]} icon={<Users size={24} color="#2e046d" />} />
//               <Tag text={'$' + (post?.rent) + " deposit"} icon={<Banknote size={24} color="#2e046d" />} />
//               <Tag text={propertyTypeOptions[Number(post?.propertyType) - 1]} icon={<House size={24} color="#2e046d" />} />
//               <Tag text={furnishingOptions[Number(post?.furnishingType) - 1]} icon={<Armchair size={24} color="#2e046d" />} />

//             </div>
//             <div>
//               <hr className="my-4 md:hidden" />

//               <div className="flex flex-row md:hidden text-xl justify-center items-center ">
//                 <div className="flex flex-row gap-1 items-center px-2">
//                   <Users size={18} color="#2e046d" />
//                   <p>{genderOptions[post?.gender as string]} • </p>
//                 </div>
//                 <div className="flex flex-row gap-1 items-center px-2">
//                   <House size={18} color="#2e046d" />
//                   <p>{propertyTypeOptions[post?.propertyType as string]} • </p>
//                 </div>
//                 <div className="flex flex-row gap-1 items-center px-2">
//                   <Armchair size={18} color="#2e046d" />
//                   <p>{furnishingOptions[post?.furnishingType as string]} </p>
//                 </div>
//               </div>
//               <div className="flex flex-row gap-1  justify-center items-center px-2 text-xl md:hidden">
//                 {post?.deposit && <div className="flex flex-row gap-1 items-center">
//                   <Banknote size={18} color="#2e046d" />
//                   <p>{'$' + post.deposit + " deposit"}  </p>
//                 </div>}
//               </div>
//             </div>

//           </div>

//           <div className="flex flex-col lg:flex-row  items-center justify-center min-h-screen">
//             <div className=" w-full px-4 text-lg lg:px-0 mx-auto">
//               <div className=" my-8 max-w-[48em] ">
//                 <h1 className="text-2xl text-primary font-bold my-2 ">Description</h1>
//                 <p>{post?.description}</p>
//               </div>
//               <div className=" my-8 max-w-[48em] ">
//                 {post?.utilities && post.utilities.length > 0 && <><h1 className="text-2xl text-primary font-bold my-2 ">Utilities</h1>
//                   <p className="text-2xl text-gray-700">
//                     {post.utilities.map((utility: string) => utilitiesOptions[utility]).join(' • ')}
//                   </p>
//                 </>
//                 }
//                 {post?.amenities && post.amenities.length > 0 && <>   <h1 className="text-xl text-primary font-bold my-2">Amenities</h1>
//                   <p className="text-xl text-gray-700">
//                     {post?.amenities?.map((amenity: string) => amenitiesOptions[amenity]).join(' • ')}
//                   </p>
//                 </>
//                 }

//               </div>
//               <div className="my-8 flex flex-col  max-w-[48em]">
//                 <h1 className="text-2xl text-primary font-bold" >Get in Touch</h1>
//                 <div className="flex  flex-col md:flex-row">


//                   {post?.phoneNumber && <Tag text={post?.phoneNumber} icon={<Phone size={24} color="#2e046d" />} />}

//                   {post?.whatsapp && <Tag
//                     text={post?.whatsapp}
//                     icon={
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                         <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
//                       </svg>
//                     }
//                   />}
//                   {post?.instagram && <Link href={post?.instagram}>  <Tag icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram items-center"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
//                   } /> </Link>}
//                   {post?.facebook && (
//                     <Link href={post.facebook} passHref>
//                       <Tag
//                         icon={
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className="lucide lucide-facebook"
//                           >
//                             <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//                           </svg>
//                         }
//                       />
//                     </Link>
//                   )}

//                   {post?.contactEmail === true && <Link href={`mailto:${post?.email}`}><Tag icon={<Mail size={24} color="#2e046d" />} /></Link>
//                   }
//                 </div>
//               </div>
//               <div>
//                 <div className="my-8">
//                   <h1 className="text-2xl text-primary font-bold my-2">Comments</h1>
//                   <CommentSection comments={commentArray} postId={id} postTitle={post?.title || ''} postAuthorEmail={post?.email || ''} />
//                 </div>
//               </div>

//             </div>
//           </div>

//         </main>
//       </div>

//     </div>

//   );
// }
// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page