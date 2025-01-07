import React from "react";
import { fetchRoommatePostById, fetchCommentsByPostId, createComment } from "@/Utils/datafetcher";
import { format } from 'date-fns';
import CommentSection from "@/components/UI/CommentSection";
import { Building, Facebook } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import Tag from "@/components/UI/Tag";
import { Banknote, Users, House, Armchair, Phone, Mail } from "lucide-react";
import ImageCarousel from "@/components/UI/ImageCarousel";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";


type Params = Promise<{ post: string }>
type SearchParams = Promise<{ [key: string]: string  | undefined }>

interface Comment
{
  id: number; 
  author: string;
  message: string;
  date: string;
}

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
const utilitiesOptions: { [key: string]: string } = {
  1: "Wifi",
  2: "Electricity, water, gas",
  3: "Laundry (in unit)",
  4: "Laundry (on site)",
  5: "Heating",
  6: "Air Conditioning",
};
const amenitiesOptions: { [key: string]: string } = {
1: "Parking available",
2: "Recreational spaces",
3: "Pets allowed",
4: "Private kitchen",
5: "Private bathroom",
};

const genderOptions: { [key: string]: string } = {
  1: "Sister",
  2: "Brother",
};
export default async function BlogPost(props: {
  params: Params
}) {
  const params = await props.params
 

  const id = decodeURIComponent(params.post)
  const res = await fetchRoommatePostById(id);

  console.log(res)
  const post = res[0]
 

  const date = post?.createdAt ? new Date(post?.createdAt) : null;
  const formattedDate = date ? format(date, 'MMMM dd, yyyy') : null;
  const formattedAvailableDate = post?.availableDate ? format(new Date(post?.availableDate), 'MMMM dd') : null;


    const comments = await fetchCommentsByPostId(id);
    let commentArray: Comment[] = [];
    commentArray = commentArray.concat(comments.map(comment => ({id: comment.id  ,  message: comment.comment, author: comment.author? comment.author : "" , date: comment.createdAt}))); 
    console.log("comments", comments) 



  return (

    <div className="mt-28  max-w-screen-lg  mx-auto">
          <div className="flex flex-col items-center justify-center ">
        <main className=" ">
          <div className="w-[3/4] md:w-full " >
             <ImageCarousel images={post?.images?.map((image: any) => image) || []} />

           </div> 

        <div className="flex md:flex-row flex-col  md:justify-between max-w-[48em]">
          <div className=" flex flex-col px-4 ">
            <h1 className=" mt-4 text-4xl font-bold text-primary text-center md:text-left">{post?.title} </h1>
            <p className="text-center md:text-left">Posted by {post?.author} on  {formattedDate ? formattedDate : ""}</p>
          </div>

          <div className="flex flex-col text-xl my-6 gap-2 text-center justify-center md:justify-start items-center md:items-start  ">
            <div className="flex flex-row gap-2">
              <Building size={24} color="#2e046d" />
              <p> {post?.address} </p>
            </div>
            <div className="flex flex-row gap-2">
              <CalendarDays size={24} color="#2e046d" />
              <p>Available on {formattedAvailableDate}</p>
            </div>

          </div>
          </div>
          <div className="relative px-4 mx-auto mb-4 md:mb-0 max-w-[48em]">
          <div className=" md:flex md:flex-row hidden  ">
              <Tag text={genderOptions[post?.gender]} icon={<Users size={24} color="#2e046d" />} />
              <Tag text={'$'+ post?.rent + '/month'} icon={<Banknote size={24} color="#2e046d" />} />
              <Tag text={'$'+ post?.rent + " deposit"} icon={<Banknote size={24} color="#2e046d" />} />
              <Tag text={propertyTypeOptions[post.propertyType]} icon={<House size={24} color="#2e046d" />} />
              <Tag text={furnishingOptions[post.furnishingType]} icon={<Armchair size={24} color="#2e046d" />} />

            </div>
          <div>
            <div className="flex flex-row md:hidden text-xl justify-center items-center ">
              <div className="flex flex-row gap-1 items-center px-2">
                <Users size={18} color="#2e046d" />
                <p>{genderOptions[post?.gender]} • </p>
              </div>
              <div className="flex flex-row gap-1 items-center px-2">
                <House size={18} color="#2e046d" />
                <p>{propertyTypeOptions[post.propertyType]} • </p>
              </div>
              <div className="flex flex-row gap-1 items-center px-2">
                <Armchair size={18} color="#2e046d" />
                <p>{furnishingOptions[post.furnishingType]} </p>
            </div>
            </div>
            <div className="flex flex-row gap-1  justify-center items-center px-2 text-xl md:hidden">
              <div className="flex flex-row gap-1 items-center">
                <Banknote size={18} color="#2e046d" />
                <p>{'$'+ post?.rent + '/month'} • </p>
              </div>
            {post.deposit && <div className="flex flex-row gap-1 items-center">
                <Banknote size={18} color="#2e046d" />
                <p>{'$'+ post.deposit + " deposit"}  </p>
             </div> }
             </div> 
          </div>
    
          </div>

          <div className="flex flex-col lg:flex-row  items-center justify-center min-h-screen">
            <div className=" w-full px-4 text-lg lg:px-0 mx-auto">
            <div className=" my-8 max-w-[48em] ">
              <h1 className="text-2xl text-primary font-bold my-2 ">Description</h1>
              <p>{post?.description}</p>
            </div>
            <div className=" my-8 max-w-[48em] ">
              <h1 className="text-2xl text-primary font-bold my-2 ">Utilities</h1>
                <p className="text-xl text-gray-700">
                  {post?.utilities?.map((utility: string) => utilitiesOptions[utility]).join(' • ')}
                </p>
              <h1 className="text-xl text-primary font-bold my-2">Amenities</h1>
                <p className="text-xl text-gray-700">
                  {post?.amenities?.map((amenity: string) => amenitiesOptions[amenity]).join(' • ')}
                </p>

            </div>
            <div className="my-8 flex flex-col  max-w-[48em]">
              <h1 className="text-2xl text-primary font-bold" >Get in Touch</h1>
              <div className="flex  flex-col md:flex-row">
              {/* <Tag text={post?.phoneNumber} icon={<Phone size={24} color="#2e046d" />} />
              { post?.instagram && <Tag text={post?.instagram} icon={ <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
} /> }
              {  <Tag text={post?.whatsapp} icon={<Phone size={24} color="#2e046d" />} /> }
             { post?.facebook &&  <Tag icon={<Phone size={24} color="#2e046d" />} /> }
              { post?.contactEmail === true && <Link href={`mailto:${post?.email}`}><Tag text={post?.email} icon={<Mail size={24} color="#2e046d" />} /></Link>
            } */}
              </div>
            </div>
            <div>
            <div className="my-8">
              <h1 className="text-2xl text-primary font-bold my-2">Comments</h1>
              <CommentSection comments={commentArray} postId={id} postTitle={post?.title} postAuthorEmail={post?.email} />
          </div>
             </div> 
              
            </div>
          </div>
          
        </main>
      </div>

      {/* <div className=" mx-auto max-w-screen-lg  ">
        <main className="flex flex-col items-center text-gray-700">
          <div className="">
            <ImageCarousel images={post?.images || []} />

            <div className="px-4 lg:px-0 flex md:flex-row flex-col  md:justify-between max-w-[48em]">
              <div className=" flex flex-col">
                <h1 className=" mt-4 text-4xl font-bold text-primary text-center md:text-left">{post?.title} </h1>
                <p className="text-center md:text-left">Posted by {post?.name} on  {formattedDate ? formattedDate : ""}</p>
              </div>
            
              <div className="flex flex-col text-xl my-6 gap-2 text-center ">
                <div className="flex flex-row gap-2">
                  <Building size={24} color="#2e046d" />
                  <p> {post?.address} </p>
                </div>
                <div className="flex flex-row gap-2">
                  <CalendarDays size={24} color="#2e046d" />
                  <p>Available on {formattedAvailableDate}</p>
                </div>

              </div>

            </div>
            <div className="flex flex-row">
              <Tag text={"Sisters"} icon={<Users size={24} color="#2e046d" />} />
              <Tag text={'$'+ post?.rent + '/month'} icon={<Banknote size={24} color="#2e046d" />} />
              <Tag text={'$'+ post?.rent + " deposit"} icon={<Banknote size={24} color="#2e046d" />} />
              <Tag text={propertyTypeOptions[post.propertyType]} icon={<House size={24} color="#2e046d" />} />
              <Tag text={furnishingOptions[post.furnishingType]} icon={<Armchair size={24} color="#2e046d" />} />

            </div>
            <div className=" my-8 max-w-[48em] ">
              <h1 className="text-2xl text-primary font-bold my-2 ">Description</h1>
              <p>{post?.description}</p>
            </div>
            <div className="my-8 flex flex-row justify-between">
              <h1 className="text-2xl text-primary font-bold" >Get in Touch</h1>
              <div className="flex flex-row">
              <Tag text={post?.phoneNumber} icon={<Phone size={24} color="#2e046d" />} />
              <Tag text={post?.whatsapp} icon={<Phone size={24} color="#2e046d" />} />
              <Tag text={post?.facebook} icon={<Phone size={24} color="#2e046d" />} />
              <Tag text={post?.instagram} icon={<Phone size={24} color="#2e046d" />} />

               
              </div>
              </div>

            <div className="my-8">
              <h1 className="text-2xl text-primary font-bold my-2">Comments</h1>
              <CommentSection comments={commentArray} postId={id} />

             
            </div>
          </div>
          <div className="flex flex-col px-8  lg:space-x-12  mb-4 md:mb-0 relative mx-auto  ">

          </div>
        </main>
      </div> */}
    </div>

  );
}
// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page