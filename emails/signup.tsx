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
import logo from "src/logo.png"


import { DistributionList } from "@/payload-types";
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
interface WelcomeEmailProps {
  firstName: string | null | undefined;
  url: string | null | undefined;
}


export const WelcomeEmail = ({firstName,url}:WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Salam, {firstName || ""} , Thank you for subscribing to our newsletter.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={url || ""}
          width="170"
          height="50"
          alt="logo"
          style={logo_style}
        />
        <Text style={header}>Salam, {firstName} </Text>
        <Text style={paragraph}>
          Thank you for signing up as a member.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://wlumsa.org">
            Visit our website
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


export default WelcomeEmail;

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
