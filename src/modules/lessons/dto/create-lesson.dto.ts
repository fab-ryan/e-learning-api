import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '../entities/lesson.entity';

export class CreateLessonDto {
  @ApiProperty({
    example: 'Lesson Title',
    description: 'Leason tilte must be listed',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Lesson title is required',
  })
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: LessonType,
    default: LessonType.PDF,
  })
  @IsEnum(LessonType)
  type: LessonType;

  @ApiProperty({
    example: {
      user: 'john',
    },
  })
  @IsOptional()
  contentMetadata?: Record<string, any>;
  @ApiProperty({
    example: false,
    type: 'boolean',
  })
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({
    example: 'https://example.com/icon.png',
    description: 'the File content ',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  content_url?: string;

  @ApiProperty({
    example: 'https://example.com/icon.png',
    description: 'the thumbnail',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  thumbnail?: string;
}

export class FilesDTO {
  content_url: Express.Multer.File;
  thumbnail: Express.Multer.File;
}
