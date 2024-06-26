

type Nav ={
  id: number;
  items: {
    label?: string | null;
    links?:
      | {
          title?: string | null;
          url: string;
          id?: string | null;
        }[]
      | null;
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}

import { Footer, Social,Link } from "@/payload-types";



export type FooterProps = {
  footerGroups: Footer,
  socialLinks: Social[],
};
