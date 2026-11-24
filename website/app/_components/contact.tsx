import ContactForm from "./contact-form/contact-form";
import Section from "./section";

export default function Contact() {
  return (
    <Section
      id="contact"
      lead={
        <p className="mt-4 leading-relaxed">
          Haneru Developers
          に対してなんらかの連絡がある場合はそれぞれのアプリやサービスのリポジトリの
          Issue、もしくはこのお問い合わせフォームからご連絡ください。Haneru
          Developers
          は本業の傍らで開発をしているため、返事の保証は致しかねます。
        </p>
      }
      split
      title="お問い合わせ"
    >
      <ContactForm />
    </Section>
  );
}
