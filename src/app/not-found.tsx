import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-3 font-display text-5xl text-graphite">Страница не найдена</h1>
      <p className="mt-4 max-w-md text-muted">
        Возможно, ссылка устарела. Перейдите на главную, в каталог или сразу к расчёту мебели.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">На главную</ButtonLink>
        <ButtonLink href="/catalog" variant="secondary">
          Каталог
        </ButtonLink>
        <ButtonLink href="/calculator" variant="dark">
          Рассчитать стоимость
        </ButtonLink>
      </div>
      <Link href="/contacts" className="mt-6 text-sm text-accent">
        Контакты
      </Link>
    </div>
  );
}
