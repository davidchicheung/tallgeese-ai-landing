import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: Request) => {
  const { firstName, lastName, workEmail, company, message } =
    await request.json();

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "noreply@contact.tallgeese.ai",
      to: process.env.CONTACT_TO_EMAIL || "david@tallgeese.ai",
      subject: `Contact form: ${firstName} ${lastName} (${company})`,
      replyTo: workEmail,
      text: `
Name: ${firstName} ${lastName}
Email: ${workEmail}
Company: ${company}

Message:
${message || "N/A"}
      `.trim(),
    });

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: "Error sending message" },
      { status: 400 },
    );
  }
};
