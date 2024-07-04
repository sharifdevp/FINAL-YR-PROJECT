import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Log environment variables (except for password) to ensure they are being read correctly
console.log('MAIL_HOST:', process.env.MAIL_HOST);
console.log('MAIL_PORT:', process.env.MAIL_PORT);
console.log('MAIL_USER:', process.env.MAIL_USER);

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: (process.env.MAIL_PORT, 10),
    secure: process.env.NODE_ENV !== 'development',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
} as SMTPTransport.Options);

export const SendEmail = async (dto: { sender: any; recipients: any; subject: any; message: any; }) => {
    const { sender, recipients, subject, message } = dto;

    return await transport.sendMail({
        from: `${sender.name} <${sender.address}>`,
        to: recipients.map((recipient: any) => `${recipient.name} <${recipient.address}>`),
        subject,
        html: message,
        text: message,
    });
}