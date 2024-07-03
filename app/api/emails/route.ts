import { SendEmail } from "@/app/utils/mail.utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { sender, recipients, subject, message } = await request.json();

        const result = await SendEmail({
            sender,
            recipients,
            subject,
            message,
        });

        return NextResponse.json({
            accepted: result.accepted,
        });
    } catch (error) {
        console.error('Email sending failed:', error);
        return new Response(JSON.stringify({
            message: "Unable to send message this time",
        }), { status: 500 });
    }
}