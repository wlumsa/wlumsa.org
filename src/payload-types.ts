/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    execs: Exec;
    link: Link;
    Instagram: Instagram;
    resources: Resource;
    media: Media;
    Emails: Email;
    Members: Member;
    Socials: Social;
    Products: Product;
    Posts: Post;
    categories: Category;
    tags: Tag;
    Sizes: Size;
    WeeklyEvents: WeeklyEvent;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    nav: Nav;
    footer: Footer;
  };
  locale: null;
  user:
    | (Exec & {
        collection: 'execs';
      })
    | (Email & {
        collection: 'Emails';
      });
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "execs".
 */
export interface Exec {
  id: number;
  name?: string | null;
  department?:
    | (
        | 'marketing'
        | 'events_brothers'
        | 'events_sisters'
        | 'religious_affairs_brothers'
        | 'religious_affairs_sisters'
        | 'finance'
        | 'community_engagement'
        | 'operations'
        | 'technology'
      )
    | null;
  position?: ('vice_president' | 'head_director' | 'director') | null;
  'student id'?: number | null;
  major?: string | null;
  year?: number | null;
  'phone number'?: number | null;
  'mylaurier email'?: string | null;
  city?: string | null;
  roles?: ('admin' | 'editor') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "link".
 */
export interface Link {
  id: number;
  title?: string | null;
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Instagram".
 */
export interface Instagram {
  id: number;
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resources".
 */
export interface Resource {
  id: number;
  link: (number | Link)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  caption?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Emails".
 */
export interface Email {
  id: number;
  Title?: string | null;
  Subject?: string | null;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  attachments?: (number | Media)[] | null;
  published?: ('Yes' | 'No') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Members".
 */
export interface Member {
  id: number;
  'First Name'?: string | null;
  'Last Name'?: string | null;
  'mylaurier email': string;
  'Student Id'?: string | null;
  Newsletter?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Socials".
 */
export interface Social {
  id: number;
  title: string;
  link: number | Link;
  icon: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Products".
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  image: (number | Media)[];
  tags: number | Tag;
  sizes?: (number | null) | Size;
  quantity?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: number;
  title?: string | null;
  color?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Sizes".
 */
export interface Size {
  id: number;
  size: 'Small' | 'Medium' | 'Large';
  quantity: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Posts".
 */
export interface Post {
  id: number;
  title?: string | null;
  description?: string | null;
  header_image?: (number | Media)[] | null;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  content_html?: string | null;
  categories?: (number | Category)[] | null;
  tags?: (number | Tag)[] | null;
  authors?: (number | Exec)[] | null;
  status?: ('draft' | 'published') | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "WeeklyEvents".
 */
export interface WeeklyEvent {
  id: number;
  name: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeStart: string;
  timeEnd: string;
  location: string;
  caption: string;
  image: (number | Media)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user:
    | {
        relationTo: 'execs';
        value: number | Exec;
      }
    | {
        relationTo: 'Emails';
        value: number | Email;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nav".
 */
export interface Nav {
  id: number;
  items: {
    label?: string | null;
    links: {
      title?: string | null;
      url: string;
      id?: string | null;
    }[];
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  items: {
    label?: string | null;
    links: {
      title?: string | null;
      url: string;
      id?: string | null;
    }[];
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}