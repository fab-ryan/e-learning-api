import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from '@/utils';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly responseService: ResponseService,
  ) {}

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
    return {
      access_token: this.jwtService.sign(payload),
    };
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
}
