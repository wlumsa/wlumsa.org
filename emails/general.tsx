import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  firstName: string | null | undefined;
  content: string | null | undefined;
}

const unsubscribeUrl = "https://wlumsa.org/unsubscribe";

export const Newsletter = ({ firstName, content }: WelcomeEmailProps) => (
  <Html>
    <Head>
      <meta name="color-scheme" content="light" />
      <meta name="supported-color-schemes" content="light" />
      <style>{`
        * { box-sizing: border-box; }
        .content, .content * {
          color: #1f1f1f !important;
          background: transparent !important;
          overflow-wrap: break-word;
        }
        .content p { margin: 0 0 12px; line-height: 1.55; font-size: 15px; }
        .content ul, .content ol { margin: 0 0 12px; padding-left: 20px; }
        .content li { margin: 0 0 6px; line-height: 1.5; }
        .content h1, .content h2, .content h3, .content h4, .content h5 {
          margin: 14px 0 8px;
          line-height: 1.25;
          color: #2e046d !important;
        }
        .content h1 { font-size: 22px; }
        .content h2 { font-size: 19px; }
        .content h3 { font-size: 16px; }
        .content strong, .content a { color: #2e046d !important; }
        .content a { text-decoration: underline; font-weight: 700; }
        .content blockquote {
          margin: 12px 0;
          padding: 10px 12px;
          border-left: 4px solid #2e046d;
          background: #f7f7f7 !important;
        }
        .content img { display: block; max-width: 100%; height: auto; margin: 10px auto; }
        @media only screen and (max-width: 620px) {
          .shell { padding: 10px 6px !important; }
          .header { padding: 16px 12px 10px !important; }
          .body-wrap { padding: 0 10px 10px !important; }
          .panel { padding: 10px !important; }
          .footer { padding: 10px 10px 14px !important; }
          .content p, .content li { font-size: 14px !important; line-height: 1.5 !important; }
        }
      `}</style>
    </Head>

    <Preview>Assalamu alaikum{firstName ? ` ${firstName}` : ""}</Preview>

    <Body style={main} className="shell">
      <Container style={container}>
        <Section style={card}>
          <Section style={topBar}>
            <Text style={topBarText}>WLU MSA Newsletter</Text>
          </Section>

          <Section style={header} className="header">
            <Img
              src="https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/MSA%20Logo-2.png"
              width="56"
              height="56"
              alt="WLU MSA logo"
              style={logo}
            />
            <Text style={title}>Assalamu alaikum{firstName ? ` ${firstName}` : ""}</Text>
            <Text style={subtitle}>
              Here are the latest updates from the WLU MSA community.
            </Text>
          </Section>

          <Section style={bodyWrap} className="body-wrap">
            <Text style={label}>Weekly Updates</Text>
            <Section style={panel} className="panel">
              <div className="content" dangerouslySetInnerHTML={{ __html: content || "" }} />
            </Section>
          </Section>

          <Section style={ctaWrap}>
            <Button style={cta} href="https://wlumsa.org">
              Visit WLUMSA.org
            </Button>
          </Section>

          <Text style={signoff}>Jazakum Allahu khayran,</Text>
          <Text style={signoffName}>WLU MSA Team</Text>

          <Hr style={divider} />

          <Section style={footer} className="footer">
            <Text style={footerText}>This is an automated email, please do not reply.</Text>
            <Text style={footerText}>
              For questions, contact <Link href="mailto:msa@wlu.ca" style={footerLink}>msa@wlu.ca</Link>.
            </Text>
            <Text style={footerText}>
              To unsubscribe from these emails, click{" "}
              <Link href={unsubscribeUrl} style={footerLink}>here</Link>.
            </Text>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default Newsletter;

const main = {
  fontFamily: '"Trebuchet MS","Segoe UI",Helvetica,Arial,sans-serif',
  backgroundColor: "#efe8fb",
  margin: "0",
  padding: "24px 10px",
};

const container = {
  margin: "0 auto",
  maxWidth: "620px",
};

const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #eeeeee",
  borderRadius: "12px",
  overflow: "hidden",
};

const topBar = {
  backgroundColor: "#2e046d",
  padding: "10px 16px",
};

const topBarText = {
  margin: "0",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.8px",
  textTransform: "uppercase" as const,
};

const header = {
  padding: "20px 18px 12px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto 10px",
};

const title = {
  margin: "0",
  color: "#2e046d",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.2",
};

const subtitle = {
  margin: "10px 0 0",
  color: "#1f1f1f",
  fontSize: "15px",
  lineHeight: "1.55",
};

const bodyWrap = {
  padding: "0 14px 12px",
};

const label = {
  margin: "0 0 8px",
  color: "#2e046d",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const panel = {
  backgroundColor: "#ffffff",
  border: "1px solid #eeeeee",
  borderRadius: "10px",
  padding: "12px",
};

const ctaWrap = {
  padding: "10px 14px 0",
  textAlign: "center" as const,
};

const cta = {
  backgroundColor: "#2e046d",
  border: "1px solid #2e046d",
  borderRadius: "999px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 16px",
};

const signoff = {
  margin: "18px 14px 0",
  color: "#1f1f1f",
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "1.6",
};

const signoffName = {
  margin: "0 14px 0",
  color: "#1f1f1f",
  fontSize: "15px",
  lineHeight: "1.6",
};

const divider = {
  border: "0",
  borderTop: "1px solid #eeeeee",
  margin: "18px 14px 0",
  width: "auto",
};

const footer = {
  padding: "12px 14px 18px",
};

const footerText = {
  margin: "0 0 8px",
  color: "#444444",
  fontSize: "12px",
  lineHeight: "1.6",
};

const footerLink = {
  color: "#2e046d",
  textDecoration: "underline",
};
