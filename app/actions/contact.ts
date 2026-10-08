"use server";

import { Resend } from "resend";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const toEmail = process.env.SALTANCY_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!toEmail || !apiKey) {
    console.error("SALTANCY_EMAIL or RESEND_API_KEY environment variable is not set.");
    return { success: false, error: "Server configuration error." };
  }

  try {
    // Resend reports a refused send (bad key, unverified domain) in `error`
    // instead of throwing, so check it explicitly.
    const { data, error } = await new Resend(apiKey).emails.send({
      from: "Saltancy Website <info@saltancy.com>",
      to: toEmail,
      subject: `New Consultancy Lead from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: "Something went wrong." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Resend API Error:", error);
    return { success: false, error: "Something went wrong." };
  }
}
