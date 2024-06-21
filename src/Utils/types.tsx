import { Database } from "./supabase/supabase";

declare global {
  type Social = {
    id: number;
    title: string;
    link: number | Link;
    icon: string;
    updatedAt: string;
    createdAt: string;
  }

  type Link = {
    id: number;
    title?: string | null;
    url: string;
    updatedAt: string;
    createdAt: string;
  }
  
  type NavbarData = {
    
      label?: string | null;
      links?:
        Link[]
        | null;
      id?: string | null;
    }[] | null;
    
  

}