import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Layout";

export const metadata = buildMetadata({
  title: "Согласие на обработку персональных данных",
  description: `Согласие на обработку персональных данных для заявок на сайте ${siteConfig.name}. Оператор: ${siteConfig.legalName}.`,
  path: "/personal-data-consent",
});

export default function ConsentPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Согласие на обработку персональных данных", href: "/personal-data-consent" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Согласие", href: "/personal-data-consent" },
        ]}
      />
      <Section>
        <Container>
          <article className="prose-article mx-auto max-w-3xl">
            <h1 className="font-display text-4xl text-foreground">
              Согласие на обработку персональных данных
            </h1>
            <p>
              Нажимая отметку согласия в форме на сайте {siteConfig.name} и отправляя заявку, я,
              субъект персональных данных, даю согласие {siteConfig.legalName} (ИНН {siteConfig.inn})
              на обработку моих персональных данных на условиях ниже.
            </p>
            <h2>1. Оператор</h2>
            <p>
              {siteConfig.legalName}, ИНН {siteConfig.inn}. Адрес офиса: {siteConfig.address}.
              Телефон: {siteConfig.phoneDisplay}. Регион: {siteConfig.region}.
            </p>
            <h2>2. Состав данных</h2>
            <p>
              Имя; номер телефона; сведения, которые я указываю о мебели, размерах, материалах,
              бюджете и сроках; комментарий; приложенные файлы; адрес страницы, с которой отправлена
              форма; дата и время отправки; тип формы; UTM-метки, если они сохранились в браузере.
            </p>
            <h2>3. Цели</h2>
            <p>
              Принятие и обработка заявки на расчёт корпусной мебели, связь со мной, подготовка
              предложения, уточнение комплектации, анализ источника обращения.
            </p>
            <h2>4. Действия с данными</h2>
            <p>
              Сбор, запись, систематизация, хранение, уточнение, использование, передача сотрудникам
              оператора, передача в сервис доставки сообщений (если он настроен владельцем сайта),
              удаление.
            </p>
            <h2>5. Срок</h2>
            <p>
              Согласие действует с момента отправки формы до отзыва либо до истечения срока,
              необходимого для обработки обращения, если закон не требует иного хранения.
            </p>
            <h2>6. Отзыв</h2>
            <p>
              Согласие можно отозвать, связавшись с оператором по телефону {siteConfig.phoneDisplay}.
              Отзыв не влияет на законность обработки, выполненной до него.
            </p>
            <h2>7. Политика</h2>
            <p>
              Подробности обработки изложены в{" "}
              <Link href="/privacy">Политике конфиденциальности</Link>.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
