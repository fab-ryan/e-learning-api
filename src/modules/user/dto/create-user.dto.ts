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
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';
import { RolesEnum as Roles } from '@/enums';

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


export class ProfileDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'https://example.com/icon.png',
    description: 'The profile picture of the user',
    type: 'string',
    format: 'binary',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.PROFILE_PIC_REQUIRED',
    ),
  })
  profile_picture?: Express.Multer.File;

  @ApiProperty({
    example: 'Kigali, Rwanda',
    description: 'The address of the user',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.ADDRESS_REQUIRED',
    ),
  })
  address: string;

  @ApiProperty({
    example: 'I am a software engineer',
    description: 'The bio of the user',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_REGISTER.BIO_REQUIRED',
    ),
  })
  bio: string;
}
export class ImagePicDto {
  profile_picture: Express.Multer.File;
}