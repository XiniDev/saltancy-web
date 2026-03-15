import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy Policy | Saltancy",
  description: "Privacy Policy and data handling practices for Saltancy Consulting.",
};

export default function PrivacyPage() {
  const lastUpdated = "March 2026";
  const email = process.env.SALTANCY_EMAIL;

  return (
    <div className="min-h-screen flex flex-col selection:bg-secondary">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        <div className="space-y-8 text-muted-foreground">
          
          <div className="border-b border-border pb-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg">Last updated: {lastUpdated}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to Saltancy ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <strong>{email}</strong>.
            </p>
            <p>
              When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information Provided by You:</strong> We may collect names, email addresses, phone numbers, and other similar contact data when you fill out a contact form.</li>
              <li><strong>Automatically Collected Information:</strong> We may automatically collect certain information when you visit, use, or navigate the site (such as IP address, browser type, and operating system) for basic analytics to improve our website.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to user inquiries and offer support to users.</li>
              <li>To send administrative information to you, such as service changes or updates.</li>
              <li>To deliver and facilitate the delivery of services to the user.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Will Your Information Be Shared?</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We absolutely do not sell your personal data to third-party data brokers or marketing agencies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. How Long Do We Keep Your Information?</h2>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Your Privacy Rights</h2>
            <p>
              Depending on your location (such as if you reside in the EEA, UK, or certain US states), you may have specific rights regarding your personal information, including the right to request access, correct inaccuracies, or request deletion of your personal data. 
            </p>
            <p>
              If you would like to exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email us at:
            </p>
            <div className="bg-muted p-6 rounded-xl border border-border mt-4">
              <p className="font-medium text-foreground">Saltancy Consulting</p>
              <p>Email: <strong>{email}</strong>.</p>
              <p>Address: <strong>Available upon request</strong></p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
