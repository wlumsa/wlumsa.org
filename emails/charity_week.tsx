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
    Row,
    Column
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
  
  
  export const CharityWeek = ({ firstName, content }: WelcomeEmailProps) => (
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
            <Container style={logoContainer}>
                <Row>
                    <Column>
                            <Img
                    src={"https://qxhgmdhdnavuvrexvjhw.supabase.co/storage/v1/object/public/wlumsa_storage_bucket_test/MSA%20Logo-2.png"} // url || ""
                    width="50"
                    height="50"
                    alt="logo"
                    style={logo_style}/>
                    </Column>
                    <Column>
                    <Img
                src={"https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/Laurier_IRC_logo.png"}
                width="50"
                height="50"
                alt="logo"
                style={logo_style}/>
                       
                    </Column>

                    <Column>
                        <Img
                        src={"https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/Charity-Week-Circles-Stars-FULL-COLOUR-e1596728962318.png"}
                        width="60"
                        height="60"
                        alt="logo"
                        style={logo_style}/>
                    </Column>
                    <Column>
                    <Img
                src={"https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/Blue%20-%20image.png"}
                width="40"
                height="40"
                alt="logo"
                style={logo_style}/>
                    </Column>


                </Row>
        
          
          
        
            </Container>
        
         
          <Text style={toptext}>Salam, {firstName} </Text>
          <Text style={header}> It's Charity Week! 🥳 </Text>
          
          <div dangerouslySetInnerHTML={{ __html: content  || ""}} />
          <Section style={CTAbuttonContainer}>
            <Button style={CTAbutton} href="https://www.launchgood.com/v4/campaign/wilfrid_laurier_msa__cw_2024">Donate here</Button>
          </Section>
         
  {/* 
          <Section style={btnContainer}>
            <Button style={button} href="https://wlumsa.org">
              Visit our website
            </Button>
          </Section> */}
          <Text style={paragraph}>
            WLU MSA team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            This is an automated email, please do not reply.</Text>
        </Container>
      </Body>
    </Html>
  );
  
  
  export default CharityWeek;
  
  const main = {
  
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    backgroundColor: "#1a1e8e",
    margin: "auto",
    padding: "40px 40px",
    color: "#FAFAFA",
    borderRadius: "8px"
  };
  const logoContainer = {
    backgroundColor: "#1a1e8e",
    margin: "auto",
    padding: "48px 48px",
    color: "#FAFAFA",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center", 
    flexDirection: "row" as const,
  };
  
  
  const logo_style = {
    margin: "0 4px",
  };

  const header = {
    fontSize: "28px",
    lineHeight: "26px",
    fontWeight: "bold",
    textAlign: "center" as const, 
  };

  const toptext = {
    fontSize: "24px",
    lineHeight: "26px",
    fontWeight: "bold",

  }
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#D4D4D4",
    margin: "20px 0",
  };
  
  const CTAbuttonContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
  
  const CTAbutton = {
    backgroundColor: "#fdfee7",
    borderRadius: "3px",
    color: "#000000   ",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
    width:"100%",
    fontWeight: "bold",
    marginBottom: "16px",
  };

  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#FFFFFF",
    borderRadius: "3px",
    color: "#000",
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
  