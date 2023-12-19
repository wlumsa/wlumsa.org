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
} from "@react-email/components";

import React from "react";

interface MemberInfo {
  firstName: string;
  lastName: string;
}

const Email = ({ firstName, lastName }: MemberInfo) => {
  const previewText = ``;

  return (
    <Html>
      <Head>
        <title>MSA Week at a Glance</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#2e046d", // purple
                secondary: "#e7ac3b", // yellow
                accent: "#6c703e", // green
                neutral: "#444444", // gray
                "base-100": "#ffffff", // white
              },
            },
          },
        }}
      >
        <Body className="mx-auto my-auto bg-base-100 font-sans">
          <Container className="mx-auto my-[40px] w-[465px]  rounded-lg border border-solid border-primary p-[20px]">
            <Section className="h-[150px] rounded-lg  bg-primary">
              <Heading className="text-center text-secondary">
                اَلسَّلاَ مُ عَلَيْكُمْ
              </Heading>
            </Section>

            <Text className="text-black">
              <h1 className="text-[14px]">
                Salam {`${firstName} ${lastName},`}
              </h1>
              <p className="text-[12px]">
                We're finally at that time of the year, just a few more weeks
                till winter break inshallah. Our weekly events are resuming next
                semseter, and this week we only have one Jummah inshallah.
              </p>
            </Text>

            {/* Event Details */}
            <Section>
              <Text>
                <h1 className="my-0 text-[14px]">December 04, Monday:</h1>
                <p className="text-[12px]">
                  ❌ No Quran Circle Today (Resuming Next Semester!)
                </p>

                <h1 className="my-0 text-[14px]">December 05, Tuesday:</h1>
                <p className="text-[12px]">
                  ❌ No Dawah Boothing Today (Resuming Next Semester!)
                </p>
                <p className="text-[12px]">
                  📚 Study Session | P118 | 1 - 3 PM
                </p>

                <h1 className="my-0 text-[14px]">December 06, Wednesday:</h1>
                <p className="text-[12px]">
                  ❌ No Halaqa Today (Resuming Next Semester!)
                </p>

                <h1 className="my-0 text-[14px]">December 07, Thursday:</h1>
                <p className="text-[12px]">
                  ❌ No Prophetic Stories Today (Resuming Next Semester!)
                </p>

                <h1 className="my-0 text-[14px]">December 08, Friday:</h1>
                <p className="text-[12px]">
                  🕌 Salat-ul-Jummah | Turret | 1:00 PM
                </p>
              </Text>
            </Section>

            <Hr className="mx-0 my-[10px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This is an automated email, please do not reply. If you would like
              to unsubscribe from this newsletter, you can do so
              <Link href="https://www.wlumsa.org/unsubscribe"> here</Link>
            </Text>
            <Button
              href="https://www.wlumsa.org/events"
              className="mt-4 bg-primary p-2  text-white"
            >
              Check Out All Events
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
