import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  h1: string;
  category: string;
  serviceHref: string;
  serviceLabel: string;
  date: string;
}

export interface Article extends ArticleMeta {
  content: string;
  faq: { question: string; answer: string }[];
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function readDir() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith(".md"));
}

export function getArticleSlugs() {
  return readDir().map((file) => file.replace(/\.md$/, ""));
}

export function getArticles(): ArticleMeta[] {
  return readDir()
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title || ""),
        description: String(data.description || ""),
        h1: String(data.h1 || data.title || ""),
        category: String(data.category || "Мебель на заказ"),
        serviceHref: String(data.serviceHref || "/custom-furniture"),
        serviceLabel: String(data.serviceLabel || "К услуге"),
        date: String(data.date || ""),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | null {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title || ""),
    description: String(data.description || ""),
    h1: String(data.h1 || data.title || ""),
    category: String(data.category || "Мебель на заказ"),
    serviceHref: String(data.serviceHref || "/custom-furniture"),
    serviceLabel: String(data.serviceLabel || "К услуге"),
    date: String(data.date || ""),
    content,
    faq: Array.isArray(data.faq) ? (data.faq as Article["faq"]) : [],
  };
}
