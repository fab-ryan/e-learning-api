import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';

export class CreateAuthDto {
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.AUTH_LOGIN.USER_NAME',
    ),
  })
  @IsNotEmpty()
  @ApiProperty({ example: 'example@example.com | 078888888' })
  username: string;

  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.AUTH_LOGIN.PASSWORD_REQUIRED',
    ),
  })
  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;
}
