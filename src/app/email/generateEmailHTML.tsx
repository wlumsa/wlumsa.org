import { render } from '@react-email/render';
import WelcomeEmail from 'emails/signup';
import Email from 'emails/test';
import EventEmail from 'emails/event';
//converts JSX Emails to HTML

// Membership Email
export const getEmailHtml = (firstName: string, lastName: string, email:string, studentId: string, newsletter:boolean ): string => {
    return render(<WelcomeEmail firstName={firstName}  lastName={lastName} email={email} studentId={studentId} newsletter={newsletter} />);
};
//Newsletter email

//Event email
export const getEmailHtmlEvent = (formLink:string, content: string): string => {
    return render(<EventEmail  formLink={formLink} content={content}  />);
};


//General


