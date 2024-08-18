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
  } from "@react-email/components";
  import { Markdown } from "@react-email/markdown";
  import React from "react";
  
  interface MemberInfo {
    firstName: string;
    lastName: string;
  }
  
  interface EmailEntry extends MemberInfo {
    title: string; 
    subject:string
    formLink?: string; // Optional
    content: EmailEntryText
  }
  
  interface EmailEntryImages {
    type: "images";
    value: string[];
  }
  
  interface EmailEntryText {
    type: "text";
    value: string;
  }
  
  /*interface EmailEntryAttachments {
    type: "attachments";
    value: string[];
  } */
  const Email = ({ firstName, title, subject, formLink, content }: EmailEntry) => {
    const previewText = `The MSA Admin Team`;
    const renderContent = () => {
        if (!content) {
            return <Text>No content available</Text>;
        }
            return (
                <Markdown
        markdownCustomStyles={{
          h1: { color: "red" },
          h2: { color: "blue" },
          codeInline: { background: "grey" },
        }}
        markdownContainerStyles={{
          padding: "12px",
          border: "solid 1px black",
        }}
      >{content.value}</Markdown>
            );
          
    };
    return (
      <Html>
        <Head>
          <title>{title}</title>
        </Head>
        <Preview>{previewText}</Preview>
        <Body
          style={{
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          <Container
            style={{
              margin: "40px auto",
              width: "465px",
              borderRadius: "10px",
              border: "solid #2e046d",
              padding: "20px",
            }}
          >
            <Section
              style={{
                height: "150px",
                borderRadius: "10px",
                backgroundColor: "#2e046d",
                textAlign: "center",
                color: "#e7ac3b",
              }}
            >
              <Heading>اَلسَّلاَ مُ عَلَيْكُمْ</Heading>
            </Section>
  
            <Text style={{ color: "black" }}>
              <Heading style={{ fontSize: "18px" }}>
                Salam {`${firstName}`}
              </Heading>
              {renderContent()}
            </Text>
  
            <Hr
              style={{ width: "100%", border: "solid #eaeaea", margin: "10px 0" }}
            />
            <Text
              style={{ fontSize: "12px", lineHeight: "24px", color: "#666666" }}
            >
              This is an automated email,any inquires should be directed to msa@wlu.ca
              <Link href="https://www.wlumsa.org/unsubscribe"> here</Link>
            </Text>
            <Button
              href="https://www.wlumsa.org/events"
              style={{
                marginTop: "16px",
                backgroundColor: "#2e046d",
                color: "white",
                padding: "8px 16px",
              }}
            >
              Check Out All Events
            </Button>
          </Container>
        </Body>
      </Html>
    );
  };
  
  function EmailText({ markdownText }: { markdownText: string }) {
    if (!markdownText) return <></>;
  
    return (
      <Container className="max-w-sm">
        <Text className="mb-6 mt-6">
          <Markdown>{markdownText}</Markdown>
        </Text>
      </Container>
    );
  }
  export default Email;