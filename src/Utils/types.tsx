type Social = {
  id: number;
  title: string;
  link: number | Link;
  icon: string;
  updatedAt: string;
  createdAt: string;
}
type Link = {
  title?: string | null;
  url: string;
 
}

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
