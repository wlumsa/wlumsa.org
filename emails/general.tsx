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
  Link,
  Row
} from "@react-email/components";
import * as React from "react";
import logo from "src/logo.png"


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
interface WelcomeEmailProps {
  firstName: string | null | undefined;
  content: string | null | undefined; 

}


export const Newsletter = ({ firstName, content }: WelcomeEmailProps) => (
  <Html>
    <Head>
      <style>{`

        img {
          max-width: 100%;
          height: auto;
        }
          a {
          color: #e7ac3b;
          }

      `}

      </style>
    </Head>
    <Preview>Salam, {firstName || ""}</Preview>
    <Body style={main}>


      <Container style={container}>
        <Img
          src={"https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/MSA%20Logo-2.png"} // url || ""
          width="50"
          height="50"
          alt="logo"
          style={logo_style}
        />
        <Text style={header}>Salam, {firstName} </Text>
        <div dangerouslySetInnerHTML={{ __html: content  || ""}} />
       

        <Section style={btnContainer}>
          <Button style={button} href="https://wlumsa.org">
            Visit our website
          </Button>
        </Section>
        <Text style={paragraph}>
          WLU MSA team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          This is an automated email, please do not reply.</Text>
        <Text style={footer}>
          If you would like to unsubscribe from this newsletter, you can do so <Link href={`https://wlumsa.org/unsubscribe`}>here</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);


export default Newsletter;

const main = {

  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#2e046d",
  margin: "auto",
  padding: "48px 48px",
  color: "#FAFAFA",
  borderRadius: "8px"
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
  color: "#D4D4D4",
  margin: "20px 0",
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
  color: "#737373",
  fontSize: "12px",
};
