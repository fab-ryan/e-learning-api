import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendForgotPasswordEmail(email: string, otp: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot Password',
      template: './forgot-password',
      context: {
        name,
        otp,
      },
    });
  }
}
