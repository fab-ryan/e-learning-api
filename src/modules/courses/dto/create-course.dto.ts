import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Course Name',
    description: 'The name of the course',
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_NAME_REQUIRED',
    ),
  })
  title: string;

  @ApiProperty({
    example: 'Course Description',
    description: 'The description of the course',
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_DESCRIPTION_REQUIRED',
    ),
  })
  description: string;

  @ApiProperty({
    example: 200,
    description: 'The price of the course',
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_PRICE_REQUIRED',
    ),
  })
  price: string;

  @ApiProperty({
    example: 'USD',
    description: 'The currency of the course',
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_CURRENT_PRICE_REQUIRED',
    ),
  })
  currency: string;

  @ApiProperty({
    example: false,
    type: 'boolean',
  })
  @IsOptional({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_IS_FREE_REQUIRED',
    ),
  })
  isFree: string;

  @ApiProperty({
    example: 'https://example.com/icon.png',
    description: 'the Thumbnail Image',
    type: 'string',
    format: 'binary',
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_THUMBNAIL_REQUIRED',
    ),
  })
  @IsOptional({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_THUMBNAIL_REQUIRED',
    ),
  })
  thumbnail_url: string;
  @ApiProperty({
    example: false,
    type: 'boolean',
  })
  @IsOptional({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_IS_FEATURED_REQUIRED',
    ),
  })
  featured: string;

  @ApiProperty({
    example: 'category Id',
    description: 'The category of the course',
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.COURSES.COURSE_CATEGORY_REQUIRED',
    ),
  })
  category_id: string;
}

export class FilesDto {
  thumbnail_url: Express.Multer.File[];
}
