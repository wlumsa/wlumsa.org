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


type NavItem = {
  label: string;
  links: Link[];
};

type NavbarData = NavItem[];

