import ExternalLink from "./external-link";

const socialLinks = [
  { href: "https://github.com/inabagumi", label: "GitHub" },
  { href: "https://discord.gg/d9V3PSj", label: "Discord" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate text-white on-slate">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:gap-12">
          <section aria-labelledby="notice-heading">
            <h2 className="font-bold" id="notice-heading">
              注意
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Haneru Developers
              によって提供されるアプリやサービスは因幡はねるさんや因幡はねるさんが所属する『ななしいんく』とは一切関係のない第三者によって開発と運用が行われています。これらのアプリやサービスに対する問い合わせを因幡はねるさんや『ななしいんく』に対して行うのはお止めください。
            </p>
          </section>

          <nav aria-labelledby="social-heading">
            <h2 className="font-bold" id="social-heading">
              ソーシャル
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <ExternalLink
                    className="rounded-sm text-white/80 hover:text-white hover:underline"
                    href={link.href}
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-center text-sm text-white/80">
          Copyright © 2019 Haneru Developers.
        </p>
      </div>
    </footer>
  );
}
