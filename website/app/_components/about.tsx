import Section from "./section";
import TextLink from "./text-link";

export default function About() {
  return (
    <Section id="about" title="Haneru Developers とは?">
      <div className="mt-6 max-w-3xl space-y-4 leading-relaxed">
        <p>
          Haneru Developers はバーチャル YouTuber の
          <TextLink href="https://www.youtube.com/channel/UC0Owc36U9lOyi9Gx9Ic-4qg">
            因幡はねるさん
          </TextLink>
          をテーマとしたアプリやサービスの開発を主として行うコミュニティです。因幡はねるさんのことを応援している人たちがメンバーになっています。
        </p>
        <p>
          開発されたアプリやサービスのソースコードは特別な事情がない限り{" "}
          <TextLink href="https://opensource.org/licenses/MIT">
            MIT License
          </TextLink>{" "}
          が適用されたオープンソースソフトウェアとして{" "}
          <TextLink href="https://github.com/inabagumi">GitHub</TextLink>{" "}
          で公開されています。
          <TextLink href="https://www.typescriptlang.org/">
            TypeScript
          </TextLink>{" "}
          を主に用いて開発が行われています。
        </p>
      </div>
    </Section>
  );
}
