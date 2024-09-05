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


import { DistributionList } from "@/payload-types";
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
interface WelcomeEmailProps {
  firstName: string | null | undefined;
  content: string | null | undefined; // TEMP logo for url, replace with actual logo url later

}


export const WelcomeEmail = ({ firstName, content }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Salam, {firstName || ""} , Thank you for subscribing to our newsletter.</Preview>
    <Body style={main}>


      <Container style={container}>
        <Img
          src={"https://qxhgmdhdnavuvrexvjhw.supabase.co/storage/v1/object/public/wlumsa_storage_bucket_test/MSA%20Logo-2.png"} // url || ""
          width="50"
          height="50"
          alt="logo"
          style={logo_style}
        />
        <Text style={header}>Salam, {firstName} </Text>
        <Section style={paragraph}>
          Thank you for signing up as a general member for the Laurier Muslim Students Association (MSA) newsletter.<br />
          We are excited to have you on board and look forward to sharing our events, updates, and more with you.<br />
          Here is a free guidebook to help you<br />
        </Section>
        <Section style={CTAbuttonContainer}>

          <Button style={CTAbutton}target="_blank" href="https://qxhgmdhdnavuvrexvjhw.supabase.co/storage/v1/object/public/wlumsa_storage_bucket_test/MSA%20GUIDEBOOK.pdf?t=2024-09-02T19%3A58%3A46.792Z">
            <Row>
              Download our <b>Guidebook</b>
            </Row>
          </Button>
        </Section>
        <Section style={paragraph}>
          <Row>Addtionally here is a link to useful resources on our website</Row>
          Prayer timings & videos to prayer rooms: <Link target="_blank" href="https://wlumsa.org/prayerinfo">Link</Link><br />
          Resources & links to signup for events: <Link target="_blank" href="https://wlumsa.org/resources">Link</Link><br />
          A bit about us and the services we offer: <Link target="_blank" href="https://wlumsa.org/about">Link</Link><br />
        </Section>

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
          This is an automated email, please do not reply. If you would like to unsubscribe from this newsletter, you can do so here        </Text>
      </Container>
    </Body>
  </Html >
);


export default WelcomeEmail;

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
const CTAbuttonContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const CTAbutton = {
  backgroundColor: "#e7ac3b",
  borderRadius: "3px",
  color: "#000000   ",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  width:"100%"
};
const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#737373",
  fontSize: "12px",
};
