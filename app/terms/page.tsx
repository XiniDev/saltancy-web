import { LegalPage, LegalSection } from "@/components/sections/legal";

export const metadata = {
  title: "Terms and Conditions | Saltancy",
  description: "Terms and conditions for engaging with Saltancy Consulting.",
};

export default function TermsPage() {
  const email = process.env.SALTANCY_EMAIL;

  return (
    <LegalPage title="Terms and Conditions" lastUpdated="March 2026">
      <LegalSection title="1. Introduction">
        <p>
          Welcome to Saltancy. These Terms and Conditions govern your use of our website and the
          technical consultancy and development services we provide. By accessing our website or
          engaging our services, you agree to be bound by these terms.
        </p>
      </LegalSection>

      <LegalSection title="2. Services Provided">
        <p>
          Saltancy provides software development, full-stack web development, mobile application
          development, and technical consulting services. The specific scope, deliverables,
          timeline, and cost of any project will be outlined in a separate Statement of Work
          (SOW) or formal proposal agreed upon by both parties before work begins.
        </p>
      </LegalSection>

      <LegalSection title="3. Client Responsibilities">
        <p>
          To ensure the successful delivery of our services, you agree to provide timely access
          to necessary information, assets (such as logos, copy, or API keys), and feedback.
          Delays in providing these materials may result in adjustments to project timelines and
          delivery dates.
        </p>
      </LegalSection>

      <LegalSection title="4. Intellectual Property">
        <p>Unless otherwise agreed upon in writing:</p>
        <ul>
          <li>
            <strong>Background IP:</strong> Saltancy retains ownership of any pre-existing code,
            libraries, or tools used to build your solution.
          </li>
          <li>
            <strong>Client Deliverables:</strong> Upon final and full payment for the services
            rendered, the intellectual property rights for the custom, client-specific code and
            assets developed during the project will be transferred to you.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Payment Terms">
        <p>
          Payment schedules will be detailed in your project proposal. Typically, we require an
          upfront deposit before work commences, with subsequent milestone payments. Invoices are
          due within <strong>14</strong> days of receipt. We reserve the right to pause work or
          withhold deliverables if payments are delayed.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation of Liability">
        <p>
          While we strive to write robust, error-free code, software is inherently complex.
          Saltancy shall not be liable for any indirect, incidental, or consequential damages
          (including loss of data, revenue, or business interruption) arising out of the use or
          inability to use the software we develop, beyond the total amount paid by the client for
          the specific services in question.
        </p>
      </LegalSection>

      <LegalSection title="7. Termination">
        <p>
          Either party may terminate a project with written notice if the other party breaches
          these terms and fails to correct the breach within a reasonable timeframe. Upon
          termination, you will be invoiced for all work completed up to the date of termination.
        </p>
      </LegalSection>

      <LegalSection title="8. Governing Law">
        <p>
          These Terms and Conditions shall be governed by and construed in accordance with the
          laws of <strong>the United Kingdom</strong>, without regard to its conflict of law
          provisions.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>If you have any questions about these Terms, please contact us at:</p>
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
