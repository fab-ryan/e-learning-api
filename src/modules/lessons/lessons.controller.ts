import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseUUIDPipe, UploadedFiles } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesEnum } from '@/enums';


import { AuthGuard, AuthUserType } from '@/guards';
import { Roles, User } from '@/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storage } from '@/utils';


@ApiTags('Lesson')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiAcceptedResponse({
    description: 'The record has been successfully created.',
    type: CreateLessonDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'content_url',
          maxCount: 1,
        },
        {
          name: 'thumbnail'
        }
      ],
      { storage: storage('lesson') },
    ),
  )
  create(@Body() createLessonDto: CreateLessonDto,
    @Param('courseId') courseId: string,
    @UploadedFiles()
    files: {
      content_url: Express.Multer.File,
      thumbnail: Express.Multer.File
    }
  ) {
    return this.lessonsService.create(createLessonDto, courseId, files);
  }

  @Get()
  findAll(@Param('slug') slug: string) {
    return this.lessonsService.findAll(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
