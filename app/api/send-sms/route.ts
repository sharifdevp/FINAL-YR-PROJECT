import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const POST = async (req: Request) => {
  try {
    const { phoneNumber, message } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { message: 'Phone number is required before approval' },
        { status: 400 }
      );
    }

    const twilioResponse = await client.messages.create({
      body: message,
      from: fromPhoneNumber,
      to: phoneNumber,
    });

    console.log('SMS sent successfully', twilioResponse);
    return NextResponse.json(
      { message: 'SMS sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send SMS', error);
    return NextResponse.json(
      { message: 'Failed to send SMS' },
      { status: 500 }
    );
  }
};
