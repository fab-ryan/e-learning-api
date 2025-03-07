import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { config } from '@/configs/config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config().mail.host,
        secure: false,
        auth: {
          user: config().mail.auth.user,
          pass: config().mail.auth.pass,
        },
      },
      defaults: {
        from: config().mail.from,
      },
      template: {
        dir: join(__dirname, '../../templates/'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
