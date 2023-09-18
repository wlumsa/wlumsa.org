import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';


import React, { useEffect, useState } from "react";

interface MemberInfo{
  firstName:string,
  lastName:string,
}
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';
const Email = ({
  firstName = 'first_name',
  lastName = 'last_name',
  

}:MemberInfo) => {
    
  const previewText = `Week at a Glance`;

  return (
    
    <Html>
      <Head><title>Week at a glance</title></Head>
      <Preview>{previewText}</Preview>
      <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              "primary": "#2e046d", // purple
              "secondary": "#e7ac3b", // yellow
              "accent": "#6c703e", // green
              "neutral": "#444444", // gray
              "base-100": "#ffffff", // white
              "info": "#C8E1E7",
              "success": "#DEF29F",
              "warning": "#F7E589",
              "error": "#F2B6B5",
            },
          },
        },
      }}
     
>
        <Body className="bg-base-100 my-auto mx-auto font-sans">
          <Container className="border border-solid border-primary  rounded-lg my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="h-[150px] bg-primary  rounded-lg">
              <Img
                src={"https://firebasestorage.googleapis.com/v0/b/wlumsa-web.appspot.com/o/images%2Flogo.png?alt=media&token=ee047587-ca7b-4964-8549-bacb6cb09f85"}
                width="40"
                height="40"
                alt="Image"
                className="my-0 mx-auto"
              />
               <Heading className='text-center text-secondary'>اَلسَّلاَ مُ عَلَيْكُمْ</Heading>
            </Section>

            <Text className="text-black">
              <h1 className='text-[14px]'>Salam {`${firstName} ${lastName},`}</h1>
              <p className='text-[12px]'>Hope you had a wonderful first week, this is what we have planned for you this upcomming week</p>
            </Text>
            
          <Section>
            <Img  height={400} width={400} className='rounded-lg mx-auto' src = 'https://cdn.discordapp.com/attachments/604522648763891733/1153252795684757504/image.png'/>
            <Text>
                  <h1 className='text-[14px] my-0'>📖Brothers Quran Circle, Dawah Boothing, and Sisters Prophetic Series 📖</h1>
                  <p className='text-[12px]'>This week Inshallah we will be continuing with the usual Quran Circles this Monday and Dawah Boothing this Tuesdays, however Halaq for this week is CANCELED. This week we are also introducing a new events for sisters only where we will be going through the lives of previous prophets Inshallah</p>
            </Text>
          </Section>  

          <Section>
            <Img  height={300} width={300} className='rounded-lg mx-auto' src = 'https://cdn.discordapp.com/attachments/604522648763891733/1153256213979611177/image.png'/>
            <Text>
                  <h1 className='text-[14px] my-0'>❗MSA Kickoff event ❗</h1>
                  <p className='text-[12px]'>On behalf of the MSA I would like to extend my invitation for you to join us this Wednesday in the Turret for our MSA Kickoff Event. This is one of the biggest events of the semester. Come hang out, learn about the MSA, meet Muslims and of cource free food! What are you waiting for register now using the button below. Can't wait to meet you {firstName} {lastName}!</p>
            </Text>
          </Section>          
            
          <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href='https://linktr.ee/wlumsa'
              >
                Register
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:
              <Link
                href='https://linktr.ee/wlumsa'
                className="text-blue-600 no-underline"
              >
                https://linktr.ee/wlumsa
              </Link>
            </Text>
            </Section>



            <Hr className="border border-solid border-[#eaeaea] my-[10px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for
                <span className="text-black"> {firstName} </span>. 
              This is an automated email, please do not reply. If you would like unsubscribe from this newsletter you can do so 
                <Link href='https://www.wlumsa.org/unsubscribe'> here</Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
    
  );
};

export default Email;