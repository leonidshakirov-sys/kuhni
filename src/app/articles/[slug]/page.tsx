import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { getArticle, getArticleSlugs, getArticles } from "@/lib/articles";
import { buildMetadata, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = getArticle(slug);
    if (!article) return {};
    return buildMetadata({
      title: article.title,
      description: article.description,
      path: `/articles/${article.slug}`,
    });
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Главная", href: "/" },
            { name: "Статьи", href: "/articles" },
            { name: article.h1, href: `/articles/${article.slug}` },
          ]),
          ...(article.faq.length ? [faqJsonLd(article.faq)] : []),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Статьи", href: "/articles" },
          { name: article.h1, href: `/articles/${article.slug}` },
        ]}
      />
      <Section>
        <Container>
          <article className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {article.category}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{article.h1}</h1>
            <p className="mt-4 text-lg text-muted">{article.description}</p>
            <div className="prose-article mt-10">
              <Markdown>{article.content}</Markdown>
            </div>
            <div className="mt-10 rounded-[1.25rem] bg-accent-soft p-6">
              <p className="font-display text-2xl">Нужен расчёт по своим размерам?</p>
              <p className="mt-2 text-sm text-muted">
                На сайте указаны стартовые цены базовых решений. Точную стоимость рассчитаем по вашим
                размерам — через страницу услуги или квиз.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href={article.serviceHref}>{article.serviceLabel}</ButtonLink>
                <ButtonLink href="/calculator" variant="secondary">
                  Рассчитать стоимость
                </ButtonLink>
              </div>
            </div>
          </article>
        </Container>
      </Section>
      {article.faq.length > 0 ? <FAQ items={article.faq} /> : null}
      {related.length > 0 ? (
        <Section className="bg-surface-2/40">
          <Container>
            <h2 className="font-display text-3xl">Ещё статьи</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <ArticleCard
                  key={item.slug}
                  href={`/articles/${item.slug}`}
                  title={item.h1}
                  description={item.description}
                  category={item.category}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
      <CTASection />
    </>
  );
}
