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
  Row,
  Column
} from "@react-email/components";
import * as React from "react";
import logo from "src/logo.png"

interface MemberInfo {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  newsletter: boolean;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeEmail = ({
  firstName, lastName, email, studentId, newsletter
}: MemberInfo) => (
  <Html>
    <Head />
    <Preview>Salam, {firstName}, Thank you for subscribing to our newsletter.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"src/logo.png"}
          width="170"
          height="50"
          alt="logo"
          style={logo_style}
        /> 
       
    <Row>
      <Column> <Text style={header}>Salam, {firstName}</Text></Column>
      <Column>WLUMSA</Column>
    </Row>
    <Row>
      <Column><Text style={header}> Weekly Recap</Text></Column>
      <Column>5 Sept 2024</Column>
    </Row>
        <Text style={title}>بسم الله الرحمن الرحيم</Text>

        <Row>
          
        <Column> <Text>Welcome to our charity newsletter! We are thrilled to share with you the latest developments in our mission to make a positive impact in our community.Firstly, we would like to express our gratitude to all of our donors and volunteers who have continued to support us during these challenging times.
Your generosity and dedication have allowed us to keep our programs running smoothly and effectively. In terms of our recent activities, we have successfully launched a new initiative to provide education and resources to underprivileged children in our area. This program aims to improve access to quality education and promote a love for learning among young students.</Text> 
           <Text>We are also excited to announce that we will be hosting outnual charity auction next month. This event is a fun and interactive way to support our cause while also enjoying great food, drinks, and entertainment. We hope to see you there! Finally, we want to remind everyone that our charity relies on the kindness and support of our community. If you are able to donate your time or resources, please do not hesitate to reach out to us.
Together, we can make a real difference in the lives of those who need it most. Thank you for your continued support!</Text> </Column>
          <Column>
          <Container style={container_sm}>
            <Text>In this newsletter you can expect</Text>
            <Hr style={hr}></Hr>
            <Text>Community Recap</Text>
            <Hr style={hr}></Hr>
            <Text>Upcoming events</Text>
          </Container>

          <Container style={container_sm}>
            <Text>Ayah of the Week</Text>
            <Hr style={hr}></Hr>
            <Text>So Remember Me, and I will remember you. And thank Me, and do not be ungrateful. </Text>
            <Text>The Holy Quran. - Al Baqarah, The Cow- 2:152 </Text>
          </Container>
          </Column>
          <Column></Column>
        </Row>
      
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
const container_sm = {
  borderColor: "#000000",
  borderRadius: "2px",

}
const logo_style = {
  margin: "0 auto",
};
const header = {
  fontSize: "32px",
  lineHeight: "26px",
  fontWeight: "bold",
}
const title = {
  fontSize: "24px",
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
  borderColor: "#000000",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
