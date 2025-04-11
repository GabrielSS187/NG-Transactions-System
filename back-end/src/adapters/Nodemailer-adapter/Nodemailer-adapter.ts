import { IMailAdapter, ISendMailData } from "../INodemailer-adapter";
import nodemailer from "nodemailer";

// "smtp.mailtrap.io"
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST as string,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true' ? true : false,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail ({ subject, body, email, text }: ISendMailData) {
    await transport.sendMail({
      from: `"NG Transações"  <${process.env.EMAIL}>`,
      to: `<${email}>`,
      subject,
      html: body,
      text: text
    });
  };
};