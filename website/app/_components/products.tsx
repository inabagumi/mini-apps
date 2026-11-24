import Image from "next/image";

import type { Product } from "#/lib/products";
import products from "#/lib/products";

import Section from "./section";
import TextLink from "./text-link";

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "long",
  timeZone: "UTC",
});

const ProductSection = ({ product }: Readonly<{ product: Product }>) => (
  <section
    aria-labelledby={`${product.id}-heading`}
    // Keep the section out from under the sticky header.
    className="grid scroll-mt-14 gap-6 border-t border-line py-10 first:border-t-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10"
    id={product.id}
  >
    <Image
      alt=""
      className="h-auto w-full rounded-lg border border-line"
      placeholder="blur"
      sizes="(min-width: 1152px) 492px, (min-width: 1024px) 45vw, 100vw"
      src={product.preview}
    />

    <div>
      <p className="text-sm font-bold text-accent">{product.category}</p>
      <h3
        className="mt-1 text-xl font-bold sm:text-2xl"
        id={`${product.id}-heading`}
      >
        {product.title}
      </h3>
      <p className="mt-3 leading-relaxed">{product.description}</p>

      <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-3">
        <dt className="text-muted">ウェブサイト</dt>
        <dd>
          <TextLink href={product.website}>
            {new URL(product.website).hostname}
          </TextLink>
        </dd>

        <dt className="text-muted">ソースコード</dt>
        <dd>
          <TextLink href={product.repository.url}>
            {product.repository.label}
          </TextLink>
        </dd>

        <dt className="text-muted">公開日</dt>
        <dd>
          <TextLink href={product.releaseAnnouncement}>
            <time dateTime={product.releasedOn}>
              {dateFormatter.format(new Date(product.releasedOn))}
            </time>
          </TextLink>
        </dd>

        <dt className="text-muted">使用技術</dt>
        <dd>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {product.technologies.map((technology) => (
              <li key={technology.name}>
                <TextLink href={technology.url}>{technology.name}</TextLink>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </div>
  </section>
);

export default function Products() {
  return (
    <Section id="products" title="プロダクト">
      <div className="mt-2">
        {products.map((product) => (
          <ProductSection key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
