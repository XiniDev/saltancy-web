import { LegalPage, LegalSection } from "@/components/sections/legal";

export const metadata = {
  title: "Privacy Policy | Saltancy",
  description: "Privacy Policy and data handling practices for Saltancy Consulting.",
};

export default function PrivacyPage() {
  const email = process.env.SALTANCY_EMAIL;

  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 2026">
      <LegalSection title="1. Introduction">
        <p>
          Welcome to Saltancy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to
          protecting your personal information and your right to privacy. If you have any
          questions or concerns about this privacy notice or our practices with regard to
          your personal information, please contact us at <strong>{email}</strong>.
        </p>
        <p>
          When you visit our website and use our services, you trust us with your personal
          information. We take your privacy very seriously. In this privacy notice, we seek
          to explain to you in the clearest way possible what information we collect, how we
          use it, and what rights you have in relation to it.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>
          We collect personal information that you voluntarily provide to us when you express
          an interest in obtaining information about us or our products and services, when you
          participate in activities on the Website, or otherwise when you contact us.
        </p>
        <ul>
          <li>
            <strong>Personal Information Provided by You:</strong> We may collect names, email
            addresses, phone numbers, and other similar contact data when you fill out a
            contact form.
          </li>
          <li>
            <strong>Automatically Collected Information:</strong> We may automatically collect
            certain information when you visit, use, or navigate the site (such as IP address,
            browser type, and operating system) for basic analytics to improve our website.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>
          We use personal information collected via our Website for a variety of business
          purposes described below. We process your personal information for these purposes in
          reliance on our legitimate business interests, in order to enter into or perform a
          contract with you, with your consent, and/or for compliance with our legal
          obligations.
        </p>
        <ul>
          <li>To respond to user inquiries and offer support to users.</li>
          <li>To send administrative information to you, such as service changes or updates.</li>
          <li>To deliver and facilitate the delivery of services to the user.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Will Your Information Be Shared?">
        <p>
          We only share information with your consent, to comply with laws, to provide you with
          services, to protect your rights, or to fulfill business obligations. We absolutely do
          not sell your personal data to third-party data brokers or marketing agencies.
        </p>
      </LegalSection>

      <LegalSection title="5. How Long Do We Keep Your Information?">
        <p>
          We will only keep your personal information for as long as it is necessary for the
          purposes set out in this privacy notice, unless a longer retention period is required
          or permitted by law (such as tax, accounting, or other legal requirements).
        </p>
      </LegalSection>

      <LegalSection title="6. Your Privacy Rights">
        <p>
          Depending on your location (such as if you reside in the EEA, UK, or certain US
          states), you may have specific rights regarding your personal information, including
          the right to request access, correct inaccuracies, or request deletion of your
          personal data.
        </p>
        <p>
          If you would like to exercise any of these rights, please contact us using the
          information provided below.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact Us">
        <p>If you have questions or comments about this notice, you may email us at:</p>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-medium text-foreground">Saltancy Consulting</p>
          <p>
            Email: <strong>{email}</strong>
          </p>
          <p>
            Address: <strong>Available upon request</strong>
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
