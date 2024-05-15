import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';
import { Roles } from '@/enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.USERNAME_REQUIRED',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.USERNAME_REQUIRED',
    ),
  })
  username: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.NAME_REQUIRED',
    ),
  })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'The email of the user',
  })
  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    {
      message: i18nValidationMessage<I18nTranslations>(
        'validation.USER_REGISTER.EMAIL_INVALID',
      ),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.EMAIL_REQUIRED',
    ),
  })
  email: string;
  @ApiProperty({
    example: '+250788888888',
    description: 'The phone number of the user',
  })
  @IsPhoneNumber('RW', {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.PHONE_INVALID',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.PHONE_REQUIRED',
    ),
  })
  phone: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
  })
  @IsOptional()
  role: Roles = Roles.USER;

  @ApiProperty({
    example: 'johndoe',
    description: 'The password ',
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.PASSWORD_REQUIRED',
    ),
  })
  @MinLength(6, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.PASSWORD_MIN',
    ),
  })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.PASSWORD_MATCH',
    ),
  })
  password: string;
}
