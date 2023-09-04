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

import * as React from 'react';

interface VercelInviteUserEmailProps {
  firstName?: string;
  lastName?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const VercelInviteUserEmail = ({
  firstName = 'Syed',
  lastName = "Ahmed",
  userImage = `${baseUrl}/static/vercel-user.png`,
  invitedByUsername = 'bukinoshita',
  invitedByEmail = 'bukinoshita@example.com',
  teamName = 'My Project',
  teamImage = "",
  inviteLink = 'https://linktr.ee/wlumsa',
  inviteFromIp = '204.13.186.218',
  inviteFromLocation = 'São Paulo, Brazil',
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Vercel`;

  return (
    
    <Html>
      <Head />
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
              <p className='text-[12px]'>Hope you're in the best of Health and Iman, here is what the MSA has planned for you this upcomming week</p>
            </Text>
            
          <Section>
            <Img  height={400} width={400} className='rounded-lg mx-auto' src = 'https://cdn.discordapp.com/attachments/604894089619570689/1147611469966495756/image.png'/>
            <Text>
                  <h1 className='text-[14px] my-0'>📣O-Week!</h1>
                  <p className='text-[12px]'>Join us throughout the week for fun events and meet fellow Muslims at Laurier, click the button below to register for any of the events</p>
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={inviteLink}
              >
                Register
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:
              <Link
                href={inviteLink}
                className="text-blue-600 no-underline"
              >
                {inviteLink}
              </Link>
            </Text>
            </Section>
          </Section>           
            
            <Hr className="border border-solid border-[#eaeaea] my-[10px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for
                <span className="text-black">{firstName} </span>. 
              This is an automated email, please do not reply. If you would like unsubscribe from this newsletter you can do so 
                <Link href='https://www.wlumsa.org/unsubscribe'>here</Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
    
  );
};

export default VercelInviteUserEmail;