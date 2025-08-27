import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '@/strategy';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { ResponseService } from '@/utils';
import { GoogleStrategy } from '@/strategy';
import { MailModule } from '../mails/mail.module';

@Module({
  imports: [
    JwtModule.register({
      secret: config().secret,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ResponseService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
