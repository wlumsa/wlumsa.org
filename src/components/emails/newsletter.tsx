"use client"
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
  Text,Img
  
} from "@react-email/components";
import {Markdown} from "@react-email/markdown"
import React from "react";


interface MemberInfo {
  firstName: string;
  lastName: string;
}

// Extend EmailEntry with MemberInfo if you need firstName and lastName as additional props
interface EmailEntry extends MemberInfo {
  name?: string;             // Optional
  header_image?: string;     // Optional
  created_on?: Date;         // Optional
  status?: string;           // Optional
  content: (EmailEntryImages | EmailEntryText | EmailEntryAttachments)[];
}

interface EmailEntryImages {
  type: "images";
  value: string[];
}

interface EmailEntryText {
  type: "text";
  value: string;
}

interface EmailEntryAttachments {
  type: "attachments";
  value: string[];
};
const Email = ({ firstName, lastName, content }: EmailEntry) => {
  const previewText = ``;   
  const renderContent = () => {
    return content.map((entry, index) => {
      switch (entry.type) {
        case 'text':
          return (
            //background:#f9f9f9;border-left:10px solid #ccc;margin:1.5em 10px;padding:1em 10px
            
              <Markdown markdownCustomStyles={{
                h1: {  paddingTop:"0px", fontSize:"14px" },
                h2: { paddingTop:"0px", fontSize:"14px" },
                image:{display:"block", marginLeft:"auto", marginRight:"auto", width:"250px", height:"250px", objectFit:"cover" },
                blockQuote:{ background:"#f9f9f9", borderLeft:"10px solid #ccc", padding:"0.5rem 5px"},
                codeInline: { background: "grey" },
              }}

              markdownContainerStyles={{
               /* any future styles add it here (applies to entire container) */
              }}>{entry.value}</Markdown>
            
          );
        case 'images':
          return (
            <Section className="" key={index}>
              {entry.value.map((imageSrc, imgIndex) => (
                <Img className= " block ml-auto mr-auto object-cover h-[250px] w-[250px] " key={imgIndex} src={imageSrc} alt={`Content Image ${imgIndex}`}  />
              ))}
            </Section>
          );
        default:
          return <div key={index}>Unexpected value in content</div>;
      }
    });
  };
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
        <Body className="mx-auto my-auto bg-base-100 font-sans items-center">
          <Container className="mx-auto my-[40px] w-[465px]  rounded-lg border border-solid border-primary p-[20px]">
            <Section className="h-[150px] rounded-lg  bg-primary">
              <Heading className="text-center text-secondary">
                اَلسَّلاَ مُ عَلَيْكُمْ
              </Heading>
            </Section>

            <Text className="text-black">
              <Heading className="text-[18px]">
                Salam {`${firstName} ${lastName}`}
              </Heading>
              {renderContent()}
            </Text>

            {/* Event Details */}
            

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
function EmailText({ markdownText }: { markdownText: string }) {

  if (!markdownText)
      return <></>;

  return <Container className="max-w-sm">
      <Text className="mt-6 mb-6">
          <Markdown>{markdownText}</Markdown>
      </Text>
  </Container>;
}
export default Email;