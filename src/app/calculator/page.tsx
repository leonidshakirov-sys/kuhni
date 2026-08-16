import { buildMetadata, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";
import { calculatorFaq } from "@/data/faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Quiz } from "@/components/Quiz";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { MessengerButtons } from "@/components/MessengerButtons";
import { quizSteps } from "@/data/quiz";

export const metadata = buildMetadata({
  title: "Калькулятор стоимости мебели на заказ",
  description:
    "Пошаговый расчёт корпусной мебели: тип изделия, размеры, стиль, материалы, бюджет. Отправьте данные и получите предложение.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Главная", href: "/" },
            { name: "Расчёт стоимости", href: "/calculator" },
          ]),
          faqJsonLd(calculatorFaq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Расчёт", href: "/calculator" },
        ]}
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Квиз"
              title={quizSteps.title}
              text="Шесть шагов: что нужно, размеры, стиль, материалы, бюджет и контакты. Это не мгновенный прайс, а сбор данных для предложения. Можно сразу написать в WhatsApp или Telegram."
            />
            <div className="mt-6">
              <MessengerButtons place="calculator" note />
            </div>
            <div className="mt-10">
              <Quiz />
            </div>
          </div>
        </Container>
      </Section>
      <FAQ items={calculatorFaq} />
    </>
  );
}
