// src/emails/CustomEmailTemplate.tsx
import React from 'react';
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
  Text,
  Img,
} from '@react-email/components';
import { Markdown } from '@react-email/markdown';

interface MemberInfo {
  firstName: string;
  lastName: string;
}

interface EmailEntry extends MemberInfo {
  name?: string; // Optional
  header_image?: string; // Optional
  created_on?: Date; // Optional
  status?: string; // Optional
  content: (EmailEntryImages | EmailEntryText | EmailEntryAttachments)[];
}

interface EmailEntryImages {
  type: 'images';
  value: string[];
}

interface EmailEntryText {
  type: 'text';
  value: string;
}

interface EmailEntryAttachments {
  type: 'attachments';
  value: string[];
}

const Email: React.FC<EmailEntry> = ({ firstName, lastName, content }) => {
  const previewText = `The MSA Admin Team`;

  const renderContent = () => {
    return content?.map((entry, index) => {
      switch (entry.type) {
        case 'text':
          return (
            <Markdown
              key={index}
              markdownCustomStyles={{
                h1: { paddingTop: '0px', fontSize: '14px' },
                h2: { paddingTop: '0px', fontSize: '14px' },
                image: {
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '250px',
                  height: '250px',
                  objectFit: 'cover',
                },
                blockQuote: {
                  background: '#f9f9f9',
                  borderLeft: '10px solid #ccc',
                  padding: '0.5rem 5px',
                },
                codeInline: { background: 'grey' },
              }}
              markdownContainerStyles={{}}
            >
              {entry.value}
            </Markdown>
          );
        case 'images':
          return (
            <Section key={index} style={{ textAlign: 'center' }}>
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
                    width: '250px',
                  }}
                />
              ))}
            </Section>
          );
        case 'attachments':
          return <div key={index}></div>;
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
      <Body
        style={{
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <Container
          style={{
            margin: '40px auto',
            width: '465px',
            borderRadius: '10px',
            border: 'solid #2e046d',
            padding: '20px',
          }}
        >
          <Section
            style={{
              height: '150px',
              borderRadius: '10px',
              backgroundColor: '#2e046d',
              textAlign: 'center',
              color: '#e7ac3b',
            }}
          >
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
            This is an automated email, any inquiries should be directed to msa@wlu.ca
            <Link href='https://www.wlumsa.org/unsubscribe'> here</Link>
          </Text>
          <Button
            href='https://www.wlumsa.org/events'
            style={{
              marginTop: '16px',
              backgroundColor: '#2e046d',
              color: 'white',
              padding: '8px 16px',
            }}
          >
            Check Out All Events
          </Button>
        </Container>
      </Body>
    </Html>
  );
};

export default Email;
