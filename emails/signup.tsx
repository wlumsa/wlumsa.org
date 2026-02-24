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

const unsubscribeUrl = "https://wlumsa.org/unsubscribe";


export const WelcomeEmail = ({ firstName, content }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Salam, {firstName || ""} , Thank you for subscribing to our newsletter.</Preview>
    <Body style={main}>


      <Container style={container}>
        <Img
          src={"logo"} // url || ""
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

          <Button style={CTAbutton}target="_blank" href="https://wlumsa.org/msa_guidebook.pdf">
            <Row>
             <b> Download our Guidebook</b>
            </Row>
          </Button>
        </Section>
        <Section style={paragraph}>
          <Row>Addtionally here are links to useful resources:</Row>
          - Prayer timings & videos to prayer rooms: <Link target="_blank" href="https://wlumsa.org/prayerinfo">Link</Link><br />
        -  Resources & links to signup for events: <Link target="_blank" href="https://wlumsa.org/resources">Link</Link><br />
        -   A bit about us and the services we offer: <Link target="_blank" href="https://wlumsa.org/about">Link</Link><br />
       -   Here is an invite to our WhatsApp community chat: <Link target="_blank" href="https://chat.whatsapp.com/IEuLYIHNhwR0hshc24GaPf">Link</Link><br />
        -  Finally, here is an invite to our WhatsApp announcements chat: <Link target="_blank" href="https://chat.whatsapp.com/BslJGlMMnAM7TRss3Y1Va0">Link</Link><br />

        </Section>

        <Section style={btnContainer}>
         
        <Section style={btnContainer} 
       
        >
<Text>
   Stay up to date with the MSA: 
</Text>
<Row style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "8px",  color: "#000" }}>      
<Button style={{ color: "#fff", paddingRight: "8px" }}  href="https://wlumsa.org">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
</Button>
<Button  href="https://www.instagram.com/wlumsa/" style={{ color: "#fff", paddingRight: "8px" }} >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>          </Button>
<Button style={{ color: "#fff", paddingRight: "8px" }} href="https://www.youtube.com/WLUMSA">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-youtube-icon lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>          </Button>
</Row>
</Section>
        </Section>
        <Text style={paragraph}>
          WLU MSA team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          This is an automated email, please do not reply. To unsubscribe from these emails, click{" "}
          <Link href={unsubscribeUrl}>here</Link>.
        </Text>
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
