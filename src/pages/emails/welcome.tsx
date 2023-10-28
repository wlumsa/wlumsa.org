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

  const previewText = `🚀 Exclusive Events for OCT 23 - OCT 27!`;

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
              <p className='text-[12px]'>Here's what the MSA has planned for Oct 23 - Oct 27:</p>
            </Text>

            {/* Event Details */}
            <Section>
              <Text>
                <h1 className='text-[14px] my-0'>Oct 23 - Monday:</h1>
                <p className='text-[12px]'>📖 Brothers Quran Circles | P101 | 4:30-5:50 PM</p>
                <p className='text-[12px]'>🍩 CW Day 1: Krispy Kreme | Concourse | 12:30-4 PM</p>

                <h1 className='text-[14px] my-0'>Oct 24 - Tuesday:</h1>
                <p className='text-[12px]'>❌ No Dawah Boothing Today</p>
                <p className='text-[12px]'>🏐 CW Day 2: Dodgeball | US | 3:00-4:30 PM</p>
                <p className='text-[12px]'>🌸 Sisters’ Henna Night | US | 4:40-6:30 PM</p>

                <h1 className='text-[14px] my-0'>Oct 25 - Wednesday:</h1>
                <p className='text-[12px]'>❌ No Halaqa Today</p>
                <p className='text-[12px]'>🍽️ CW Day 3: Auction Night Dinner | Turret | 6-9 PM</p>

                <h1 className='text-[14px] my-0'>Oct 26 - Thursday:</h1>
                <p className='text-[12px]'>📖 Sisters Prophetic Stories | P118 | 3-4:00 PM</p>
                <p className='text-[12px]'>🌸 CW Day 4: Sisters’ Henna Night | Concourse | 3-4:30 PM</p>

                <h1 className='text-[14px] my-0'>Oct 27 - Friday:</h1>
                <p className='text-[12px]'>🕌 Salat-ul-Jummah | Turret | 1:30 PM</p>
                <p className='text-[12px]'>🥞 CW Day 5: Gimme Some-Mosas | Concourse | 12:30-4 PM</p>
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[10px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This is an automated email, please do not reply. If you would like to unsubscribe from this newsletter, you can do so
              <Link href='https://www.wlumsa.org/unsubscribe'> here</Link>
            </Text>
            <Button href="https://www.wlumsa.org/events" className="bg-primary text-white rounded-lg mt-4">Check Out All Events</Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
