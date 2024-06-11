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
