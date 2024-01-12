
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
              <Section key={index} style={{ textAlign: 'center' }}> {/* Adjust Section styles as needed */}
                {entry.value.map((imageSrc, imgIndex) => (
                  <Img 
                    key={imgIndex} 
                    src={imageSrc} 
                    alt={`Content Image ${imgIndex}`}
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      objectFit: 'cover',
                      height: '250px',
                      width: '250px'
                    }}
                  />
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
      <Body style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
        <Container style={{ margin: '40px auto', width: '465px', borderRadius: '10px', border: 'solid #2e046d', padding: '20px' }}>
          <Section style={{ height: '150px', borderRadius: '10px', backgroundColor: '#2e046d', textAlign: 'center', color: '#e7ac3b' }}>
            <Heading>اَلسَّلاَ مُ عَلَيْكُمْ</Heading>
          </Section>

          <Text style={{ color: 'black' }}>
            <Heading style={{ fontSize: '18px' }}>
              Salam {`${firstName} ${lastName}`}
            </Heading>
            {renderContent()}
          </Text>

          <Hr style={{ width: '100%', border: 'solid #eaeaea', margin: '10px 0' }} />
          <Text style={{ fontSize: '12px', lineHeight: '24px', color: '#666666' }}>
            This is an automated email, please do not reply. If you would like
            to unsubscribe from this newsletter, you can do so
            <Link href="https://www.wlumsa.org/unsubscribe"> here</Link>
          </Text>
          <Button
            href="https://www.wlumsa.org/events"
            style={{ marginTop: '16px', backgroundColor: '#2e046d', color: 'white', padding: '8px 16px' }}
          >
            Check Out All Events
          </Button>
        </Container>
      </Body>
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
