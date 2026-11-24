import Image from "next/image";

import type { Product } from "#/lib/products";
import products from "#/lib/products";

import ExternalLink from "./external-link";
import Section from "./section";

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "long",
  timeZone: "UTC",
});

const buttonClassName =
  "rounded-md bg-control px-3 py-2 text-center text-sm font-bold transition-colors hover:bg-control-hover";

const ProductCard = ({ product }: Readonly<{ product: Product }>) => (
  <li className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
    <Image
      alt={product.title}
      className="h-auto w-full"
      placeholder="blur"
      sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
      src={product.preview}
    />

    <div className="flex grow flex-col gap-4 p-4">
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p className="text-sm leading-relaxed">{product.description}</p>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
        <dt className="text-muted">公開日</dt>
        <dd>
          <ExternalLink
            className="rounded-sm underline decoration-muted/40 underline-offset-4 hover:text-accent hover:decoration-accent"
            href={product.releaseAnnouncement}
          >
            <time dateTime={product.releasedOn}>
              {dateFormatter.format(new Date(product.releasedOn))}
            </time>
          </ExternalLink>
        </dd>

        <dt className="text-muted">使用技術</dt>
        <dd>
          <ul className="flex flex-wrap gap-1.5">
            {product.technologies.map((technology) => (
              <li key={technology.name}>
                <ExternalLink
                  className="block rounded-full border border-line px-2 py-0.5 text-xs transition-colors hover:border-accent hover:text-accent"
                  href={technology.url}
                >
                  {technology.name}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </dd>
      </dl>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <ExternalLink className={buttonClassName} href={product.website}>
          ウェブサイト
        </ExternalLink>
        <ExternalLink className={buttonClassName} href={product.source}>
          ソースコード
        </ExternalLink>
      </div>
    </div>
  </li>
);

export default function Products() {
  return (
    <Section id="products" title="プロダクト">
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </Section>
  );
}
