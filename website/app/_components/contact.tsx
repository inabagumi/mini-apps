import ContactForm from "./contact-form/contact-form";
import ContactFormProvider from "./contact-form/provider";
import Section from "./section";

export default function Contact() {
  return (
    <Section id="contact" title="お問い合わせ">
      <div className="max-w-3xl">
        <p className="mt-6 leading-relaxed">
          Haneru Developers
          に対してなんらかの連絡がある場合はそれぞれのアプリやサービスのリポジトリの
          Issue、もしくは以下のお問い合わせフォームからご連絡ください。Haneru
          Developers
          は本業の傍らで開発をしているため、返事の保証は致しかねます。
        </p>

        <ContactFormProvider>
          <ContactForm />
        </ContactFormProvider>
      </div>
    </Section>
  );
}
