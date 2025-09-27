import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  import { Markdown } from "@react-email/markdown";
  import logo from "src/logo.png"
  
  interface MemberInfo {
    firstName: string;
}
  interface EventInfo  {
    formLink: string;
    content: string;
  }

  interface EmailEntryText {
    type: "text";
    value: string;
  }
  

  export const EventEmail = ({formLink, content}: EventInfo) => {
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
      >{content}</Markdown>
            );
          
    }; 
    return (
    <Html>
      <Head />
      <Preview>MSA Event Coming Up</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={"src/logo.png"}
            width="170"
            height="50"
            alt="logo"
            style={logo_style}
          /> 
          <Text style={header}>Salam, </Text>
          <Text  style={paragraph}>
          {renderContent()}
          </Text>
          <Text style={paragraph}>
          

          </Text>
        
          <Section style={btnContainer}>
            <Button style={button} href={formLink}>
              Sign up here
            </Button>
          </Section>
          <Text style={paragraph}>
            WLU MSA team
          </Text>
          <Section>
          <Hr style={hr} />

          <Text>Follow us on social media </Text>
        </Section>
          <Hr style={hr} />
          <Text style={footer}>
          This is an automated email, please do not reply. If you would like to unsubscribe from this newsletter, you can do so here        </Text>
        </Container>
      </Body>
    </Html>
  );
}
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
  
  export default EventEmail;
  
  const main = {
    backgroundColor: "#EAD4EE",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo_style = {
    margin: "0 auto",
  };
  const header = {
    fontSize: "32px",
    lineHeight: "26px",
    fontWeight: "bold",
  }
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#000000",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  