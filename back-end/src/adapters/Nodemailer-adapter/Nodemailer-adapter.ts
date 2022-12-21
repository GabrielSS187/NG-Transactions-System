import { IMailAdapter, ISendMailData } from "../INodemailer-adapter";
import nodemailer from "nodemailer";

// "smtp.mailtrap.io"
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
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