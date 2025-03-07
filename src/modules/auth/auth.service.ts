import { Injectable } from '@nestjs/common';
import {
  CreateAuthDto,
  ForgetPasswordDto,
  OTPDto,
  ResetPasswordDto,
} from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from '@/utils';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';
import * as bcrypt from 'bcrypt';
import { RolesEnum as Roles } from '@/enums';
import { MailService } from '../mails/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly responseService: ResponseService,
    private readonly mailService: MailService,
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    const lang = I18nContext.current().lang;

    try {
      const { username, password } = createAuthDto;
      const user = this.usernameFormat(username);
      if (this.isEmail(user?.email)) {
        const emailExists = await this.checkEmailExists(user.email);
        if (!emailExists) {
          return this.responseService.Response({
            data: null,
            message: await this.i18n.t('response.AUTH.USER_NOT_FOUND', {
              lang,
            }),
          });
        }
      }
      const phoneExists = await this.checkPhoneExists(user.phone);
      if (!phoneExists) {
        return this.responseService.Response({
          data: null,
          message: await this.i18n.t('response.AUTH.USER_NOT_FOUND', {
            lang,
          }),
        });
      }
      return this.validateUser(user, password);
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: errorMsg,
      });
    }
  }

  usernameFormat(username: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(username)) {
      return {
        email: username,
      };
    }
    return {
      phone: username,
    };
  }

  async validateUser(user: any, password: string) {
    const lang = I18nContext.current().lang;

    const foundUser = await this.userRepository.findOne({
      where: user,
    });
    if (!foundUser) {
      return this.responseService.Response({
        data: null,
        message: await this.i18n.t('response.AUTH.USER_NOT_FOUND', {
          lang,
        }),
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      return this.responseService.Response({
        data: null,
        message: await this.i18n.t('response.AUTH.INVALID_CREDENTIALS', {
          lang,
        }),
      });
    }
    const payload = { sub: foundUser.id, role: foundUser.role };
    return this.responseService.Response({
      data: this.jwtService.sign(payload),
      statusCode: 200,
      success: true,
      message: await this.i18n.t('response.AUTH.LOGIN_SUCCESS', {
        lang,
      }),
      key: 'access_token',
    });
  }

  checkEmailExists(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email } });
  }
  isEmail(username: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(username);
  }
  checkPhoneExists(phone: string): Promise<boolean> {
    const user = this.userRepository.findOne({ where: { phone } });
    return user.then((res) => {
      return res ? true : false;
    });
  }

  loginWithGoogle() {
    return {
      code: 200,
      message: 'Login with Google',
    };
  }

  async googleLogin(req: any) {
    const lang = I18nContext.current().lang;
    const emailExists = await this.checkEmailExists(req.user.email);
    if (!emailExists) {
      const userRole = Roles.USER;
      const user = this.userRepository.create({
        email: req.user.email,
        name: req.user.firstName + ' ' + req.user.lastName,
        role: userRole,
        username: this.formatUsername(req.user.firstName),
        password: await bcrypt.hash('password', 10),
        profile_picture: req.user.picture,
      });
      await this.userRepository.save(user);
    }
    const user = await this.userRepository.findOne({
      where: { email: req.user.email },
    });
    const payload = { sub: user.id, role: user.role };
    return this.responseService.Response({
      data: this.jwtService.sign(payload),
      statusCode: 200,
      success: true,
      message: await this.i18n.t('response.AUTH.LOGIN_SUCCESS', {
        lang,
      }),
      key: 'access_token',
    });
  }

  async forgotPassword(passwordDto: ForgetPasswordDto) {
    try {
      const { username } = passwordDto;
      const user = this.usernameFormat(username);
      if (this.isEmail(user?.email)) {
        const emailExists = this.checkEmailExists(user.email);
        if (!emailExists) {
          return this.responseService.Response({
            data: null,
            message: 'Email not found',
          });
        }
      }
      const phoneExists = await this.checkPhoneExists(user.phone);
      if (!phoneExists) {
        return this.responseService.Response({
          data: null,
          message: 'Phone number not found',
          statusCode: 404,
          success: false,
        });
      }
      const existUser = await this.userRepository.findOne({ where: user });
      if (!existUser) {
        return this.responseService.Response({
          data: null,
          message: 'User not found',
          statusCode: 404,
          success: false,
        });
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await this.mailService.sendForgotPasswordEmail(
        user.email,
        otp,
        existUser?.name,
      );

      const payload = {
        otp,
        exps: Math.floor(Date.now() / 1000) + 60 * 60,
        id: existUser.id,
      };

      const token = this.jwtService.sign(payload);
      return this.responseService.Response({
        data: token,
        message: 'Password reset link sent',
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: errorMsg,
        statusCode: 500,
        success: false,
      });
    }
  }

  async verifyOtp(otp: OTPDto, token: string) {
    try {
      const lang = I18nContext.current().lang;
      const decoded = this.jwtService.decode(token) as any;
      if (Number(decoded.otp) !== otp.otp) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.AUTH.OTP_INVALID', {
            lang,
          }),
          statusCode: 400,
          success: false,
        });
      }
      if (decoded.exps < Math.floor(Date.now() / 1000)) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.AUTH.OTP_EXPIRED', {
            lang,
          }),
          statusCode: 400,
          success: false,
        });
      }
      return this.responseService.Response({
        data: token,
        message: this.i18n.t('response.AUTH.OTP_SUCCESS', {
          lang,
        }),
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: errorMsg,
        statusCode: 500,
        success: false,
      });
    }
  }

  async resetPassword(payload: ResetPasswordDto, token: string) {
    try {
      const lang = I18nContext.current().lang;

      if (payload.password !== payload.confirmPassword) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.AUTH.PASSWORD_MISMATCH', {
            lang,
          }),
          statusCode: 400,
          success: false,
        });
      }
      const decoded = this.jwtService.decode(token) as any;
      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });
      if (!user) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.AUTH.USER_NOT_FOUND', {
            lang,
          }),
          statusCode: 404,
          success: false,
        });
      }
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      await this.userRepository.update(user.id, { password: hashedPassword });
      return this.responseService.Response({
        data: null,
        message: this.i18n.t('response.AUTH.PASSWORD_RESET_SUCCESS', {
          lang,
        }),
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: errorMsg,
        statusCode: 500,
        success: false,
      });
    }
  }
  formatUsername(name: string): string {
    if (!name) return '';
    return name
      .replace(/' '/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .replace(/\s/g, '')
      .toLowerCase();
  }
}
