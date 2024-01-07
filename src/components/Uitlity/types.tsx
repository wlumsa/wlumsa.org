type PrayerRooms = {
    building: string;
    roomNumber: number;
    description: string;
  };
  type InstagramPost = {
    link: string;
    date: Date;
  };
  type JummahInfo = {
    room: string;
    time: string;
  };
  
  type WeeklyEvents = {
    day: string;
    desc: string;
    img: string;
    name: string;
    room: string;
    time: string;
  };
  type LocalMosques = {
    name: string;
    link: string;
  };
  
  type Other = {
    name: string;
    link: string;
  };
 
  type Socials = {
    icon: string;
    link: string;
    name: string;
    date: Date;
  };
  type Forms = {
    link: string;
    name: string;
  };
  type Member = {
    FirstName: string;
    LastName: string;
    StudentId: string;
    Email: string;
    Newsletter: boolean;
  };
  
  type ServicesOffered = {
    title: string;
    description: string;
    link: string;
    index:number;
  };
  
  type CampusResource = {
    title: string;
    link: string;
  };
  
  type ReligiousResource = {
    title: string;
    link: string;
  };
  
  type OtherResource = {
    title: string;
    link: string;
  };
  type Product = {
    name: string;
    price: number;
    description: string;
    image: string;
    hasSizes: boolean;
    quantity: number; // For products without sizes
    sizes?: { [size: string]: number }; // For products with sizes
    tags: string[];
  };
  
  type EmailEntryImages = {
    type: "images";
    value: string[];
  };
  
  type EmailEntryText = {
    type: "text";
    value: string;
  };
  type EmailEntryAttachments = {
    type: "attachments";
    value: string[];
  };
  // Define the props for your Email component
  
  // Define the structure for the modified values you expect from FireCMS
  interface EmailEntry {
    name: string;
    subject: string;
    content: (EmailEntryImages | EmailEntryText | EmailEntryAttachments)[];
    created_on: Date;
    status: string;
    sendEmail: boolean;
    distributionListType: "members" | "custom";
    customEmails?: string; // Optional, only if distributionListType is 'custom'
  }
  
  type FormShortAns = {
    label: string;
    required?: boolean;
    maxCharacters: number;
  };
  
  type FormParagraph = {
    label: string;
    required?: boolean;
  };
  type FormImages = {
    label?: string;
    value: string[];
    // Additional properties like maxFileSize, allowedFileTypes, etc.
  };
  type FormFiles = {
    label?: string;
    value: string[];
    // Additional properties like maxFileSize, allowedFileTypes, etc.
  };
  type FormNumber = {
    label: string;
    min?: number;
    max?: number;
    required?: boolean;
  };
  type FormCheckbox = {
    questionText: string;
    options: string[]; // List of options for checkboxes
    required: boolean; // Indicates if the question is required
    // Optional: defaultValue: string[];
  };
  type FormMultipleChoiceQuestion = {
    questionText: string;
    options: string[]; // List of options for multiple choice
    required: boolean; // Indicates if the question is required
    // Optional: defaultValue: string;
  };
  type FormEmail = {
    label: string;
    required?: boolean;
    // Regular expression for email validation
    pattern?: string;
  };
  type FormTelephone = {
    label: string;
    required?: boolean;
    // Regular expression for telephone number validation
    pattern?: string;
  };
  
  // Define the custom form type
  interface CustomForm {
    name: string;
    title: string;
    description: string;
    questions: (
      | FormParagraph
      | FormShortAns
      | FormImages
      | FormFiles
      | FormNumber
      | FormCheckbox
      | FormMultipleChoiceQuestion
      | FormEmail
      | FormTelephone
    )[];
    registrationLimit?: number;
    sendEmails: boolean;
  }
  interface Navbar {
    Group: string;
    CustomGroup?: string; // Optional property for custom group name
    NoGroup?:string;
    NoGroupLink:string;
    index:number;
  }
  interface Links {
    name: string;
    link: string;
    index:number;
  }
  interface Footer {
    Group: string;
    CustomGroup?: string; // Optional property for custom group name

  }
 
  
  type Events = {
    day: string;
    desc: string;
    img: string;
    name: string;
    room: string;
    time: string;
  };
  interface EventsProps {
    events:Events[];
  }
  type SocialLinkProps = {
    name: string;
    link: string;
    icon: string;
    index: number;
  };
  interface NavbarGroup {
    Group: string;
    CustomGroup?: string;
    NoGroup?: string;
    NoGroupLink?: string;
    links: Links[];
  }
  interface Links {
    name: string;
    link: string;
    index:number
  }
  
  interface FooterGroup {
    Group: string;
    CustomGroup?: string;
    links: Links[];
  }
  
  interface SocialLink {
    name: string;
    link: string;
    icon: string;
  }
  
  interface FooterProps {
    footerGroups: FooterGroup[];
    socialLinks: SocialLink[];
  }
  

  interface DiscountCodes {
    appliedToAll: boolean;
    id: string;
    discountAmount: number;
    code: string;
  }
  
  
interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  DhuhrIqamah: string;
  Asr: string;
  AsrIqamah: string;
  Maghrib: string;
  MaghribIqamah:  string;
  Isha: string;
  IshaIqamah: string;
}

interface DayTimings {
  timings: Timings;
  day: number;
}
interface Jummah {
  room: string;
  time: string;
}

interface Resources {
  Group: string;
  CustomGroup?: string; // Optional property for custom group name
  NoGroup?:string;
  NoGroupLink:string;
  index:number;
}
interface ResourceData {
  group:string;
  links: Links[];
}
