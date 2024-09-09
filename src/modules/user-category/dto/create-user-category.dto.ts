import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';

export class CreateUserCategoryDto {
  @ApiProperty({})
  @IsArray()
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_CATEGORY_REGISTER.CATEGORY_ID_REQUIRED',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_CATEGORY_REGISTER.CATEGORY_ID_REQUIRED',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.USER_CATEGORY_REGISTER.CATEGORY_ID_REQUIRED',
    ),
  })
  categoryId: string[];
}
