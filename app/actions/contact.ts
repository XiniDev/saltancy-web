"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const toEmail = process.env.SALTANCY_EMAIL;

  if (!toEmail) {
    console.error("SALTANCY_EMAIL environment variable is not set.");
    return { success: false, error: "Server configuration error." };
  }

  try {
    const data = await resend.emails.send({
      from: "Saltancy Website <info@send.saltancy.com>",
      to: toEmail,
      subject: `New Consultancy Lead from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Resend API Error:", error);
    return { success: false, error: "Something went wrong." };
  }
}