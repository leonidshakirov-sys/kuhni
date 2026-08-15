import { getArticles } from "@/lib/articles";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

export const metadata = buildMetadata({
  title: "Статьи о кухнях, шкафах и мебели на заказ",
  description:
    "Разборы: сколько стоит кухня и шкаф на заказ, как считать размеры, наполнение купе и гардеробной, материалы корпусной мебели.",
  path: "/articles",
});

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Статьи", href: "/articles" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Статьи", href: "/articles" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Блог"
            title="Полезные статьи"
            text="Тексты для тех, кто выбирает кухню, шкаф или гардеробную и хочет понять логику размеров, наполнения и цены — без обещаний, которых нет в фактах."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                href={`/articles/${article.slug}`}
                title={article.h1}
                description={article.description}
                category={article.category}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
