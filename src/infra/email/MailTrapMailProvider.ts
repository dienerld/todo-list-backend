import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { IMailProvider, IMessage } from '@presentation/interfaces/IMailProvider';
export class MailTrapMailProvider implements IMailProvider {
  transport: Mail;
  constructor () {
    this.transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      requireTLS: true
    });
  }

  async sendMail (message: IMessage): Promise<void> {
    await this.transport.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: process.env.MAIL_NAME,
        address: process.env.MAIL_FROM
      },
      subject: message.subject,
      html: message.body
    });
  }
}
