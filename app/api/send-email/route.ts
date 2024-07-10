import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend instance with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to extract email details
    const { to, subject, status, userEmail, notes } = await req.json();

    // Create the email content using the extracted details
    const emailContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #ADD8E6;">Leave Approval Notice</h1>
        <p>Dear ${userEmail},</p>
        <p>We are pleased to inform you that your leave request has been <strong>${status}</strong>.</p>
        <p><strong>Comments:</strong> ${notes}</p>
        <br>
        <p>Thank you for your continued dedication and hard work.</p>
        <p>Best regards,</p>
        <p>HR Department</p>
        <p>Golden Tulip Canaan Kampala</p>
      </div>
    `;

    // Send the email using the Resend API
    await resend.emails.send({
      from: 'Golden Tulip Canaan Kampala <gtck@36pairs.com>', // Formal sender email address
      to, // Recipient email address (dynamic)
      subject, // Email subject
      html: emailContent, // Email content in HTML format
    });

    // Respond with a success message
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email', error);
    // Respond with an error message and status code
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
