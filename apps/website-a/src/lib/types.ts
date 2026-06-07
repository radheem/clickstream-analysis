export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
  pinned?: boolean;
}

export interface Article {
  slug: string;
  content: string;
  frontmatter: ArticleFrontmatter;
}
