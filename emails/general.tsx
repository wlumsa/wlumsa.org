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

export const Newsletter = ({ firstName, content }: WelcomeEmailProps) => (
  <Html>
    <Head>
      <style>{`
        :root {
          color-scheme: light dark;
          supported-color-schemes: light dark;
        }
        * {
          box-sizing: border-box;
        }
        .email-content p {
          margin: 0 0 14px;
          font-size: 16px;
          line-height: 1.72;
          color: #1f1f1f;
          overflow-wrap: break-word;
        }
        .email-content img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 12px auto;
          border-radius: 8px;
        }
        .email-content ul,
        .email-content ol {
          margin: 0 0 14px;
          padding-left: 22px;
          color: #1f1f1f;
        }
        .email-content li {
          margin: 0 0 8px;
          line-height: 1.68;
        }
        .email-content h1,
        .email-content h2,
        .email-content h3,
        .email-content h4,
        .email-content h5 {
          margin: 22px 0 10px;
          line-height: 1.3;
          color: #2e046d;
          overflow-wrap: break-word;
        }
        .email-content h1 { font-size: 27px; }
        .email-content h2 { font-size: 22px; }
        .email-content h3 { font-size: 18px; }
        .email-content blockquote {
          margin: 18px 0;
          padding: 12px 14px;
          border-left: 4px solid #e7ac3b;
          background: #f7f7f7;
          color: #1f1f1f;
        }
        .email-content blockquote p:last-child {
          margin-bottom: 0;
        }
        .email-content hr {
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 18px 0;
        }
        .email-content strong {
          color: #2e046d;
        }
        .email-content em {
          font-style: italic;
        }
        .email-content code {
          font-family: Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 13px;
          background: #f7f7f7;
          border: 1px solid #eeeeee;
          border-radius: 4px;
          padding: 1px 5px;
        }
        .email-content pre {
          margin: 0 0 14px;
          padding: 12px;
          background: #f7f7f7;
          border: 1px solid #eeeeee;
          border-radius: 8px;
          overflow: auto;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .email-content pre code {
          border: 0;
          padding: 0;
          background: transparent;
        }
        .email-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 0 14px;
          table-layout: fixed;
        }
        .email-content th,
        .email-content td {
          border: 1px solid #eeeeee;
          padding: 8px 10px;
          text-align: left;
          vertical-align: top;
          overflow-wrap: break-word;
        }
        .email-content th {
          background: #f7f7f7;
          color: #2e046d;
          font-weight: 700;
        }
        .email-content a {
          color: #2e046d;
          font-weight: 700;
          text-decoration: underline;
        }
        @media only screen and (max-width: 620px) {
          .shell { padding: 14px 8px !important; }
          .card { border-radius: 12px !important; }
          .header-wrap { padding: 20px 18px 12px !important; }
          .heading { font-size: 25px !important; }
          .subheading { font-size: 15px !important; }
          .content-wrap { padding: 0 14px 12px !important; }
          .cta-wrap { padding: 14px 14px 0 !important; }
          .footer-wrap { padding: 14px 14px 18px !important; }
          .footer-text { font-size: 11.5px !important; }
          .email-content h1 {
            font-size: 24px !important;
            line-height: 1.28 !important;
            margin: 18px 0 10px !important;
          }
          .email-content h2 {
            font-size: 20px !important;
            line-height: 1.3 !important;
            margin: 16px 0 8px !important;
          }
          .email-content h3 {
            font-size: 17px !important;
            line-height: 1.32 !important;
            margin: 14px 0 8px !important;
          }
          .email-content p,
          .email-content li {
            font-size: 15px !important;
            line-height: 1.68 !important;
          }
          .email-content blockquote {
            margin: 14px 0 !important;
            padding: 10px 12px !important;
          }
          .email-content blockquote p {
            font-size: 14.5px !important;
            line-height: 1.62 !important;
          }
          .email-content th,
          .email-content td {
            padding: 7px 8px !important;
            font-size: 13px !important;
            line-height: 1.45 !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .shell { background-color: #121318 !important; }
          .card {
            background-color: #171922 !important;
            border-color: #2a2f43 !important;
          }
          .top { background-color: #5f3c8d !important; }
          .heading,
          .subheading,
          .signoff,
          .signoff-name,
          .footer-text,
          .footer-text a,
          .email-content p,
          .email-content ul,
          .email-content ol,
          .email-content li {
            color: #f2f3f7 !important;
          }
          .subheading,
          .signoff,
          .signoff-name,
          .footer-text,
          .footer-text a {
            color: #d3d7e0 !important;
          }
          .content-panel {
            background-color: #1f2230 !important;
            border-color: #2a2f43 !important;
          }
          .email-content h1,
          .email-content h2,
          .email-content h3,
          .email-content h4,
          .email-content h5,
          .email-content a,
          .label {
            color: #ecb553 !important;
          }
          .email-content hr {
            border-top-color: #2a2f43 !important;
          }
          .email-content blockquote {
            background: #171922 !important;
            border-left-color: #a0a86c !important;
            color: #f2f3f7 !important;
          }
          .email-content code,
          .email-content pre {
            background: #1f2230 !important;
            border-color: #2a2f43 !important;
            color: #f2f3f7 !important;
          }
          .email-content th,
          .email-content td {
            border-color: #2a2f43 !important;
            color: #f2f3f7 !important;
          }
          .email-content th {
            background: #1f2230 !important;
            color: #ecb553 !important;
          }
          .cta {
            background-color: #ecb553 !important;
            color: #201700 !important;
            border-color: #dfaa45 !important;
          }
          .divider { border-color: #2a2f43 !important; }
        }
      `}</style>
    </Head>
    <Preview>Assalamu alaikum{firstName ? ` ${firstName}` : ""}</Preview>
    <Body style={main} className="shell">
      <Container style={container}>
        <Section style={card} className="card">
          <Section style={top} className="top">
            <Text style={topText}>WLU MSA Newsletter</Text>
          </Section>

          <Section style={headerWrap} className="header-wrap">
            <Img
              src="https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/MSA%20Logo-2.png"
              width="60"
              height="60"
              alt="WLU MSA logo"
              style={logo}
            />
            <Text style={heading} className="heading">
              Assalamu alaikum{firstName ? ` ${firstName}` : ""}
            </Text>
            <Text style={subheading} className="subheading">
              We pray this message finds you in good health and iman. Here are
              the latest updates from your WLU MSA community.
            </Text>
          </Section>

          <Section style={contentWrap} className="content-wrap">
            <Text style={label} className="label">
              Weekly Updates
            </Text>
            <Section style={contentPanel} className="content-panel">
              <div
                className="email-content"
                dangerouslySetInnerHTML={{ __html: content || "" }}
              />
            </Section>
          </Section>

          <Section style={ctaWrap} className="cta-wrap">
            <Button style={cta} className="cta" href="https://wlumsa.org">
              Visit WLUMSA.org
            </Button>
          </Section>

          <Text style={signoff} className="signoff">
            Jazakum Allahu khayran,
          </Text>
          <Text style={signoffName} className="signoff-name">
            WLU MSA Team
          </Text>

          <Hr style={divider} className="divider" />

          <Section style={footerWrap} className="footer-wrap">
            <Text style={footerText} className="footer-text">
              This is an automated email, please do not reply.
            </Text>
            <Text style={footerText} className="footer-text">
              For questions, contact{" "}
              <Link href="mailto:msa@wlu.ca" style={footerLink}>
                msa@wlu.ca
              </Link>
              .
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
  backgroundColor: "#ffffff",
  margin: "0",
  padding: "28px 12px",
};

const container = {
  margin: "0 auto",
  maxWidth: "620px",
};

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  border: "1px solid #eeeeee",
  overflow: "hidden",
};

const top = {
  backgroundColor: "#2e046d",
  padding: "11px 18px",
};

const topText = {
  margin: "0",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.9px",
  textTransform: "uppercase" as const,
};

const headerWrap = {
  padding: "24px 28px 14px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto 12px",
};

const heading = {
  margin: "0",
  color: "#2e046d",
  fontSize: "31px",
  fontWeight: "700",
  lineHeight: "1.2",
};

const subheading = {
  margin: "11px 0 0",
  color: "#1f1f1f",
  fontSize: "16px",
  lineHeight: "1.6",
};

const contentWrap = {
  padding: "0 28px 14px",
};

const label = {
  margin: "0 0 10px",
  color: "#6c703e",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "0.65px",
  textTransform: "uppercase" as const,
};

const contentPanel = {
  backgroundColor: "#ffffff",
  border: "1px solid #eeeeee",
  borderRadius: "10px",
  padding: "18px",
};

const ctaWrap = {
  padding: "14px 28px 0",
  textAlign: "center" as const,
};

const cta = {
  backgroundColor: "#e7ac3b",
  border: "1px solid #d49a2f",
  borderRadius: "999px",
  color: "#1a1200",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "13px 16px",
};

const signoff = {
  margin: "22px 28px 0",
  color: "#1f1f1f",
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "1.6",
};

const signoffName = {
  margin: "0 28px 0",
  color: "#1f1f1f",
  fontSize: "15px",
  lineHeight: "1.6",
};

const divider = {
  borderColor: "#eeeeee",
  margin: "22px 28px 0",
};

const footerWrap = {
  padding: "14px 28px 22px",
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
