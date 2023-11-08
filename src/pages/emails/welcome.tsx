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

  const previewText = `🌟 Upcoming MSA Events for Nov 06 - Nov 10!`;

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
              <p className='text-[12px]'>I hope you are doing well inshallah, remember to update your clocks because the time has changed this week. You can find prayer timings on our instagram page or <a target = '_blank' href='https://www.wlumsa.org/prayertimings' >here</a> This is what the MSA has planned for Nov 06 - Nov 10.</p>
            </Text>

            {/* Event Details */}
            <Section>
              <Text>
                <h1 className='text-[14px] my-0'>November 06, Monday:</h1>
                <p className='text-[12px]'>📖 Brothers Quran Circles | P101 | 4:30-5 PM</p>

                <h1 className='text-[14px] my-0'>November 07, Tuesday:</h1>
                <p className='text-[12px]'>🕌 Dawah Boothing | Concourse | 1-4 PM</p>

                <h1 className='text-[14px] my-0'>November 08, Wednesday:</h1>
                <p className='text-[12px]'>📖 Halaqa Series | P101 | 4-4:30 PM</p>

                <h1 className='text-[14px] my-0'>November 09, Thursday:</h1>
                <p className='text-[12px]'>📖 Sisters Prophetic Stories | P118 | 3-4:00 PM</p>

                <h1 className='text-[14px] my-0'>November 10, Friday:</h1>
                <p className='text-[12px]'>🕌 Salat-ul-Jummah | Turret | 1:00 PM and 2:00 PM</p>
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
