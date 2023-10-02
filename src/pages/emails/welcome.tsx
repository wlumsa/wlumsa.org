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
    
  const previewText = `🤫 Can You Guess What We've Planned for You?`;

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
              <p className='text-[12px]'>Hope you are in the best of Health and Iman. Here's what the MSA has planned for the upcoming week:</p>
            </Text>

            {/* Brothers Quran Circles, Halaqah, Sisters Prophetic Stories */}
            <Section>
              <Img height={400} width={400} className='rounded-lg mx-auto' src='https://cdn.discordapp.com/attachments/604522648763891733/1158239111690326026/image.png?ex=651c2e7b&is=651adcfb&hm=19380182f592eec463214f6ea8dca090f217d87a98755a5c7057e3d63de75e50&' />
              <Text>
                <h1 className='text-[14px] my-0'>📖Brothers Quran Circle, Halaqah, and Sisters Prophetic Stories📖</h1>
                <p className='text-[12px]'>Join us for our weekly events. Dive into the Quran, engage in enlightening discussions, and immerse in the Prophetic stories. Please note that Dawah boothing is <strong>canceled</strong> this week.</p>
              </Text>
            </Section>

            {/* Study Session */}
            <Section>
              <Img height={400} width={400} className='rounded-lg mx-auto' src='https://cdn.discordapp.com/attachments/604522648763891733/1158239379853152267/image.png?ex=651b85fb&is=651a347b&hm=d7496c9e9ac127b863117030ec9da1913b7b398ff81d43203a9b609df2a552bf&' />
              <Text>
                <h1 className='text-[14px] my-0'>📚Study Session📚</h1>
                <p className='text-[12px]'>Need a break from your room? Come study with us and get some work done!</p>
              </Text>
            </Section>

            {/* Salat ul Jummah at the Turret */}
            <Section>
              <Img height={400} width={400} className='rounded-lg mx-auto' src='https://cdn.discordapp.com/attachments/604522648763891733/1158239530013442058/image.png?ex=651c2edf&is=651add5f&hm=4dc1c5ef07c2cbc71efc8c756e632f15e58d71ae167c9a83b617dc128c1014d5&' />
              <Text>
                <h1 className='text-[14px] my-0'>🕌Salat ul Jummah at the Turret🕌</h1>
                <p className='text-[12px]'>Join us for the Friday prayer at the Turret. We have two timings: 1:30 PM and 2:25 PM. Let's come together for Jummah!</p>
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[10px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This newsletter was intended for
              <span className="text-black"> {firstName} </span>.
              This is an automated email, please do not reply. If you would like to unsubscribe from this newsletter, you can do so
              <Link href='https://www.wlumsa.org/unsubscribe'> here</Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
    
  );
};

export default Email;


