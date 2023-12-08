import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import React from "react";

interface MemberInfo {
  firstName: string,
  lastName: string,
}

const Email = ({ firstName, lastName }: MemberInfo) => {

  const previewText = ``;

  return (
    <Html>
      <Head><title>MSA Week at a Glance</title></Head>
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
              <Heading className='text-center text-secondary'>اَلسَّلاَ مُ عَلَيْكُمْ</Heading>
            </Section>

            <Text className="text-black">
              <h1 className='text-[14px]'>Salam {`${firstName} ${lastName},`}</h1>
              <p className='text-[12px]'>We're finally at that time of the year, just a few more weeks till winter break inshallah. Our weekly events are resuming next semseter, and this week we only have one Jummah inshallah.</p>
            </Text>

            {/* Event Details */}
            <Section>
            <Text>
                <h1 className='text-[14px] my-0'>December 04, Monday:</h1>
                <p className='text-[12px]'>❌ No Quran Circle Today (Resuming Next Semester!)</p>

                <h1 className='text-[14px] my-0'>December 05, Tuesday:</h1>
                <p className='text-[12px]'>❌ No Dawah Boothing Today (Resuming Next Semester!)</p>
                <p className='text-[12px]'>📚 Study Session | P118 | 1 - 3 PM</p>

                <h1 className='text-[14px] my-0'>December 06, Wednesday:</h1>
                <p className='text-[12px]'>❌ No Halaqa Today (Resuming Next Semester!)</p>

                <h1 className='text-[14px] my-0'>December 07, Thursday:</h1>
                <p className='text-[12px]'>❌ No Prophetic Stories Today (Resuming Next Semester!)</p>

                <h1 className='text-[14px] my-0'>December 08, Friday:</h1>
                <p className='text-[12px]'>🕌 Salat-ul-Jummah | Turret | 1:00 PM</p>
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[10px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This is an automated email, please do not reply. If you would like to unsubscribe from this newsletter, you can do so
              <Link href='https://www.wlumsa.org/unsubscribe'> here</Link>
            </Text>
            <Button href="https://www.wlumsa.org/events" className="bg-primary text-white p-2  mt-4">Check Out All Events</Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
