import { NextRequest, NextResponse } from 'next/server';
import { Twilio } from 'twilio';

export async function POST(request: NextRequest) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
        return NextResponse.json({ error: 'Twilio credentials not provided.' }, { status: 500 });
    }

    const client = new Twilio(accountSid, authToken);

    try {
        const { phone, message } = await request.json();

        if (!phone || !message) {
            return NextResponse.json({ error: 'Phone number and message are required.' }, { status: 400 });
        }

        const result = await client.messages.create({
            body: message,
            from: '+13853965994',
            to: phone,
        });

        return NextResponse.json({ message: 'Message sent successfully', result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send message'}, { status: 500 });
    }
}