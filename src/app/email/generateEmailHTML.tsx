import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/signup';
import Email from '@/emails/test';
import EventEmail from '@/emails/event';
//converts JSX Emails to HTML
import { pretty } from '@react-email/render';

// export const getEmailHtml = (firstName: string, lastName: string, email:string, studentId: string, newsletter:boolean ): string => {
//     return render(<WelcomeEmail firstName={firstName}  lastName={lastName} email={email} studentId={studentId} newsletter={newsletter} />);
// };
//Newsletter email

//Event email
async function generateEmailHtml(formLink:string, content: string) {
    const eventEmail = <EventEmail formLink={formLink} content={content} />;
    const html = await pretty(await render(eventEmail));
    return html;
}

export const getEmailHtmlEvent = async (formLink:string, content: string): Promise<string> => {
    return await generateEmailHtml(formLink, content);
};





