import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms and Conditions | Saltancy",
  description: "Terms and conditions for engaging with Saltancy Consulting.",
};

export default function TermsPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="min-h-screen flex flex-col selection:bg-secondary">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        <div className="space-y-8 text-muted-foreground">
          
          <div className="border-b border-border pb-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg">Last updated: {lastUpdated}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to Saltancy. These Terms and Conditions govern your use of our website and the technical consultancy and development services we provide. By accessing our website or engaging our services, you agree to be bound by these terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Services Provided</h2>
            <p>
              Saltancy provides software development, full-stack web development, mobile application development, and technical consulting services. The specific scope, deliverables, timeline, and cost of any project will be outlined in a separate Statement of Work (SOW) or formal proposal agreed upon by both parties before work begins.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Client Responsibilities</h2>
            <p>
              To ensure the successful delivery of our services, you agree to provide timely access to necessary information, assets (such as logos, copy, or API keys), and feedback. Delays in providing these materials may result in adjustments to project timelines and delivery dates.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Intellectual Property</h2>
            <p>
              Unless otherwise agreed upon in writing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Background IP:</strong> Saltancy retains ownership of any pre-existing code, libraries, or tools used to build your solution.</li>
              <li><strong>Client Deliverables:</strong> Upon final and full payment for the services rendered, the intellectual property rights for the custom, client-specific code and assets developed during the project will be transferred to you.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Payment Terms</h2>
            <p>
              Payment schedules will be detailed in your project proposal. Typically, we require an upfront deposit before work commences, with subsequent milestone payments. Invoices are due within <strong>[e.g., 14 or 30]</strong> days of receipt. We reserve the right to pause work or withhold deliverables if payments are delayed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
            <p>
              While we strive to write robust, error-free code, software is inherently complex. Saltancy shall not be liable for any indirect, incidental, or consequential damages (including loss of data, revenue, or business interruption) arising out of the use or inability to use the software we develop, beyond the total amount paid by the client for the specific services in question.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Termination</h2>
            <p>
              Either party may terminate a project with written notice if the other party breaches these terms and fails to correct the breach within a reasonable timeframe. Upon termination, you will be invoiced for all work completed up to the date of termination.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of <strong>[e.g., England and Wales / Your State/Country]</strong>, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-muted p-6 rounded-xl border border-border mt-4">
              <p className="font-medium text-foreground">Saltancy Consulting</p>
              <p>Email: <strong>[Your Email Address]</strong></p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
