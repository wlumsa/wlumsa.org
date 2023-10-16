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

const Email = ({
  firstName = 'first_name',
  lastName = 'last_name',
  

}:MemberInfo) => {
    
  const previewText = `Week at a Glance`;

  return (
    <Html>
      <Head><title>Week at a Glance</title></Head>
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
              },
            },
          },
        }}
      >
        <Body className="bg-base-100 my-auto mx-auto font-sans">
          <Container className="border border-solid border-primary  rounded-lg my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="h-[150px] bg-primary  rounded-lg">
              <Heading className='text-center text-secondary'>MSA Week at a Glance</Heading>
            </Section>

            <Text className="text-black">
              <h1 className='text-[14px]'>Salam {firstName} {lastName},</h1>
              <p className='text-[12px]'>Here's what the MSA has planned for the upcoming week:</p>
            </Text>

            {/* Event Details */}
            <Section>
              <Text>
                <h1 className='text-[14px] my-0'>Monday, Oct 16</h1>
                <p className='text-[12px]'>📖 Brothers Quran Circles | 4:30-5 PM | P101</p>
                <h1 className='text-[14px] my-0'>Tuesday, Oct 17</h1>
                <p className='text-[12px]'>📢 Dawah Boothing | 1-4 PM | Concourse</p>
                <h1 className='text-[14px] my-0'>Wednesday, Oct 18</h1>
                <p className='text-[12px]'>📖 Halaqa Series | 4-4:30 PM | P101</p>
                <h1 className='text-[14px] my-0'>Thursday, Oct 19</h1>
                <p className='text-[12px]'>📖 Sisters Prophetic Stories | 3-4 PM | P118</p>
                <p className='text-[12px]'>🎤 UW Collab Revert Story Night | 7:00 PM | PHYS 145</p>
                <h1 className='text-[14px] my-0'>Friday, Oct 20</h1>
                <p className='text-[12px]'>🕌 Salat-ul-Jummah | 1:30 PM & 2:25 PM | Turret</p>
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
