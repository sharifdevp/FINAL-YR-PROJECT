// app/api/send-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, status, userEmail, notes } = await req.json();

    const emailContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4CAF50;">Leave Approval Notice</h1>
        <p><strong>To Employee:</strong> ${userEmail}</p>
         <p><strong>Status:</strong> ${status}</p>
        <p><strong>Comment notes:</strong> ${notes}</p>
        <br>
        <p>Regards,</p>
        <p>Your HR Team<br/>
        Golden Tulip Canaan Kampala
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: emailContent,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
