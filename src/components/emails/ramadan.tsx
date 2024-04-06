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
    Img, Row, Column
} from "@react-email/components";
import { Markdown } from "@react-email/markdown";
import React from "react";
import logo from "../../logo.png"
interface MemberInfo {
    firstName: string;
    lastName: string;
}
import PA from "../../PA.png"

// Extend EmailEntry with MemberInfo if you need firstName and lastName as additional props
interface EmailEntry extends MemberInfo {
    name?: string; // Optional
    header_image?: string; // Optional
    created_on?: Date; // Optional
    status?: string; // Optional
    content: (EmailEntryImages | EmailEntryText | EmailEntryAttachments)[];
}

interface EmailEntryImages {
    type: "images";
    value: string[];
}

interface EmailEntryText {
    type: "text";
    value: string;
}

interface EmailEntryAttachments {
    type: "attachments";
    value: string[];
}
const Email = ({ firstName, lastName, content }: EmailEntry) => {
    const previewText = `The MSA Admin Team`;
    const renderContent = () => {
        return content.map((entry, index) => {
            switch (entry.type) {
                case "text":
                    return (
                        //background:#f9f9f9;border-left:10px solid #ccc;margin:1.5em 10px;padding:1em 10px

                        <Markdown
                            markdownCustomStyles={{
                                h1: { paddingTop: "0px", fontSize: "14px" },
                                h2: { paddingTop: "0px", fontSize: "14px" },
                                image: {
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    width: "250px",
                                    height: "250px",
                                    objectFit: "cover",
                                },
                                blockQuote: {
                                    background: "#f9f9f9",
                                    borderLeft: "10px solid #ccc",
                                    padding: "0.5rem 5px",
                                },
                                codeInline: { background: "grey" },
                            }}
                            markdownContainerStyles={
                                {
                                    /* any future styles add it here (applies to entire container) */
                                }
                            }
                            key={index}
                        >
                            {entry.value}
                        </Markdown>
                    );
                case "images":
                    return (
                        <Section key={index} style={{ textAlign: "center" }}>
                            {" "}
                            {/* Adjust Section styles as needed */}
                            {entry.value.map((imageSrc, imgIndex) => (
                                <Img
                                    key={imgIndex}
                                    src={imageSrc}
                                    alt={`Content Image ${imgIndex}`}
                                    style={{
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        objectFit: "cover",
                                        height: "250px",
                                        width: "250px",
                                    }}
                                />
                            ))}
                        </Section>
                    );
                case "attachments":
                    return <div></div>
                default:
                    return <div key={index}>Unexpected value in content</div>;
            }
        });
    };
    return (
        <Html>
            <Head>
                <title>MSA Week at a Glance</title>
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
                        width: "600px",
                        borderRadius: "10px",
                        border: "solid #0A2E58",
                        padding: "10px",
                    }}
                >
                    <Section
                        style={{
                            height: "50px",
                            textAlign: "center"
                        }}
                    >
                        <Heading style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Img src={logo.src} width={50} height={50} />
                            <Img src={PA.src} width={300} height={50} />

                        </Heading>
                        <Heading style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "16px", fontStyle: "italic", color: "#0E3762" }}>
                            Ramadan 2024
                        </Heading>
                        <Heading style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', fontSize: "24px", color: "#0E3762" }}>
                            Providing emergency response in  <Text style={{ color: "#FF0000", fontSize: "20px" }}> GAZA</Text>
                        </Heading>

                    </Section>
                    <Section
                    >
                        <Img style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            objectFit: "cover",
                            height: "250px",
                            width: "100%"

                        }} src="https://firebasestorage.googleapis.com/v0/b/wlumsa-web.appspot.com/o/images%2Fblog%2FB3A9377new%20(1).jpg?alt=media&token=dc26cb8d-2416-442e-99f7-79d0b912145e" />

                    </Section>

                    <Section>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "16px", fontWeight: "bold", color: "#0E3762", textAlign: "center" }}>
                            Gaza is not just a place on the map; it's a land soaked in tears, echoing with the cries of innocent souls trapped in unimaginable despair. Not since October 7th, 2023 but since <u>1948</u>, it has been under ceaseless bombardment, leaving behind a trail of devastation that words fail to capture.
                        </Text>
                    </Section>
                    <Section style={{
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "0px"
                    }}>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "16px", color: "#161F31", textAlign: "center" }}>
                            As the conflict rages on, the toll rises relentlessly. More than 22,000 lives have been lost, with over 10,000 of them innocent children – dreams extinguished, futures shattered.<br /><b>It's a heart-wrenching reality that demands our immediate action.</b>
                        </Text>
                    </Section>
                    <Section style={{
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "0px"
                    }}>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "16px", color: "#0A2E58", textAlign: "center" }}>
                            WLUMSA, in partnership with Penny Appeal Canada, stands as a beacon of hope amidst this darkness, tirelessly working to provide essential aid to the people of GAZA.
                            But we cannot do it alone; <u>we need your compassionate support now more than ever.</u>
                        </Text>
                        <Heading style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "33px", color: "#0A2E58", textAlign: "center" }}>Goal: $25,000</Heading>
                    </Section>
                    <Section style={{
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "0px"
                    }}>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "19.5px", color: "#0A2E58", textAlign: "center" }}>
                            Your donation today can make an indelible difference:
                        </Text>

                    </Section>



                    <Section style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign: "center" }}>
                        <Row>
                            <Heading style={{ justifyContent: 'center', alignItems: 'center', fontSize: "16px", fontStyle: "italic", color: "#0E3762" }}>
                                Emergency Response Packages:
                            </Heading>
                        </Row>
                        <Row>
                            <Column
                                style={{
                                    backgroundColor: '#0E3762',
                                    color: 'white',
                                    width: "100px",
                                    height: "100px",

                                }}


                            >
                                <Text style={{ fontFamily: "sans", fontSize: "28.2px", color: "#FFFFFF", textAlign: "center" }}>
                                    $300
                                </Text>
                                <Text style={{ fontFamily: "sans", fontSize: "10.2px", color: "#FFFFFF", textAlign: "center" }}>
                                    Feed 2 Families
                                </Text>
                            </Column>
                            <Column
                                style={{
                                    backgroundColor: '#0E3762',
                                    color: 'white',
                                    width: "100px",
                                    height: "100px",

                                }}
                            >
                                <Text style={{ fontFamily: "sans", fontSize: "28.2px", color: "#FFFFFF", textAlign: "center" }}>
                                    $500
                                </Text>
                                <Text style={{ fontFamily: "sans", fontSize: "10.2px", color: "#FFFFFF", textAlign: "center" }}>
                                    Provide Medical Aid to 2 Families
                                </Text>
                            </Column>
                            <Column
                                style={{

                                    backgroundColor: '#0E3762',
                                    color: 'white',
                                    width: "100px",
                                    height: "100px",

                                }}
                            >
                                <Text style={{ fontFamily: "sans", fontSize: "28.2px", color: "#FFFFFF", textAlign: "center" }}>
                                    $1000
                                </Text>
                                <Text style={{ fontFamily: "sans", fontSize: "10.2px", color: "#FFFFFF", textAlign: "center" }}>
                                    Provide Shelter to a Family of 4
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                    <Section
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px"
                        }}
                    >
                        <Button style={{

                            backgroundColor: '#AF8D4E',
                            color: 'white',
                            width: "100px",
                            textAlign: "center",
                            borderRadius: "20px",
                        }} href="https://www.launchgood.com/v4/campaign/help_us_build_25_shelters_in_gaza">
                            <Text style={{ fontSize: "12px", lineHeight: "24px", color: "#FFFFFF", }}>
                                Donate Here
                            </Text>
                        </Button>
                    </Section>
                    <Section style={{
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "0px"
                    }}>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "16px", color: "#161F31", textAlign: "center" }}>
                            Gaza's plight is etched in the faces of its people – the weary eyes of parents trying to shield their children from the horrors of war, the silent cries of the wounded seeking solace amidst chaos. <b>It's a reality that pierces the soul and demands a response,</b> a compassionate gesture of solidarity and support.
                        </Text>
                    </Section>
                    <Section style={{
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "0px"
                    }}>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "16px", color: "#161F31", textAlign: "center" }}>
                            With over <b>31,000 innocent lives</b> lost, <b>2.2 million displaced</b>, and more than <b>73,000 injured</b>, the magnitude of the crisis is staggering. Yet amidst this darkness, there glimmers a ray of hope – the unwavering compassion of people like you, ready to extend a helping hand in their darkest hour.
                        </Text>
                    </Section>

                    <Section style={{
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "0px"
                    }}>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "13.2px", color: "#161F31", textAlign: "center", }}>
                            As we seek Laylatul Qadr, the Night of Power and Decree, let us remember the immense rewards of charity and compassion during this blessed time. Your generosity today can be the lifeline for those clinging to hope amidst despair. Let your heart guide your actions, and together, we can bring light to the darkest corners of Gaza.
                        </Text>
                    </Section>

                    <Section style={{
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "0px",
                        background: "#0A2E58"
                    }}>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "20px", color: "white", textAlign: "center", fontWeight: "bold" }}>
                            On Laylatul Qadr, every righteous act is magnified. Giving Sadaqah during Ramadan, especially tonight, holds immense reward. Remember, offering Zakat or Sadaqah during this blessed month is multiplied by 70 times. Make your donation count.
                        </Text>
                    </Section>
                    <Text style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "sans", fontSize: "16px", color: "#161F31", fontStyle: "italic" }}>
                        With heartfelt gratitude, <br /> WLUMSA | Penny Appeal Canada

                    </Text>

                    <Hr
                        style={{ width: "100%", border: "solid #eaeaea", margin: "10px 0" }}
                    />
                    <Text
                        style={{ fontSize: "12px", lineHeight: "24px", color: "#666666" }}
                    >
                        This is an automated email,any inquires should be directed to msa@wlu.ca

                    </Text>
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