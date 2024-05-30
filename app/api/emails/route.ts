import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, status, userEmail, notes } = await request.json();

    const emailContent = `
      <div>
        <h1>Leave Approval Notice</h1>
        <p>Status: ${status}</p>
        <p>Recipient: ${userEmail}</p>
        <p>Comment/Notice: ${notes}</p><br/>
        <p>Regards,
        <h6>HR Team,<br/>
        Golden Tulip Canaan Kampala</h6>
        Email: hr@gtcanaankampala.com
        Phone: +256 7527799635</p>
      </div>
    `;

    // Log the email details for debugging. . Also lets ensure the approver is the one who applied for leave for testing purposes of the email feature in the dev environment. When we deploy we shall use the domain name of our application as the sender not 'onboarding@resend.dev'and then it will allow sending emails to other users who requested for leave when approved by the approver who uses another email.
    console.log('Sending email to:', to);
    console.log('Email subject:', subject);
    console.log('Email content:', emailContent);

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev', // This works only in the dev environment. Lets ensure to use the real domain name of our application in the production environment otherwise we shall be penalized for it. Lets not forget
      to, //we have to provide the variable for the recipient's user email.
      subject,
      html: emailContent,
    });

    // Log the response from the email service
    console.log('Email service response:', response);

    if (response.status === 'success') {
      console.log('Email sent successfully');
      return new Response('Email sent', { status: 200 });
    } else {
      console.error('Failed to send email:', response);
      return new Response('Failed to send email', { status: 500 });
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    return new Response('Failed to send email', { status: 500 });
  }
}
