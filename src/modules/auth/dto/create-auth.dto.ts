import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
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

class ForgetPasswordDto {
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.AUTH_LOGIN.USER_NAME',
    ),
  })
  @IsNotEmpty()
  @ApiProperty({ example: 'email or Phone Number' })
  username: string;
}

class OTPDto {
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 0,
    },
    {
      message: i18nValidationMessage<I18nTranslations>(
        'validation.AUTH_LOGIN.OTP_REQUIRED',
      ),
    },
  )
  @IsNotEmpty()
  @ApiProperty({ example: 1234 })
  otp: number;
}

class ResetPasswordDto {
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.AUTH_LOGIN.PASSWORD_REQUIRED',
    ),
  })
  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;

  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.AUTH_LOGIN.PASSWORD_REQUIRED',
    ),
  })
  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  confirmPassword: string;
}
export { ForgetPasswordDto, OTPDto, ResetPasswordDto };
