import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Category Name',
    description: 'The name of the category',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.CATEGORY_REGISTER.NAME_REQUIRED',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.CATEGORY_REGISTER.NAME_REQUIRED',
    ),
  })
  name: string;

  @ApiProperty({
    example: 'Category Description',
    description: 'The description of the category',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.CATEGORY_REGISTER.DESCRIPTION_REQUIRED',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.CATEGORY_REGISTER.DESCRIPTION_REQUIRED',
    ),
  })
  description: string;

  @ApiProperty({
    example: 'https://example.com/icon.png',
    description: 'The icon url of the category',
    type: 'string',
    format: 'binary',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.CATEGORY_REGISTER.ICON_URL_REQUIRED',
    ),
  })
  @IsOptional({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.CATEGORY_REGISTER.ICON_URL_REQUIRED',
    ),
  })
  icon_url?: Express.Multer.File;
}

export class FilesDto {
  icon_url: Express.Multer.File;
}
