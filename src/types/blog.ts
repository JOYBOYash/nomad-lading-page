export interface BlogPost {
  id?: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  authorName: string;
  createdAt: any;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    x?: string;
  };
}
