import nodemailer from 'nodemailer';
import 'dotenv/config';
import { Request, Response } from 'express';

export interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async (
  data: EmailData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Response,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Set this to `true` to enforce certificate verification
    },
  });

  transporter.verify((error) => {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP connection is successful');
    }
  });

  const info = await transporter.sendMail({
    from: '"Hey 👻" <foo@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};
