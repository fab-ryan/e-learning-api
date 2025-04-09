import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseUUIDPipe, UploadedFiles, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesEnum } from '@/enums';


import { AuthGuard, AuthUserType } from '@/guards';
import { Roles, User } from '@/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AssociativeArray, storage } from '@/utils';


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
  @ApiQuery({
    name: 'slug',
    required: false,
    description: 'Slug of the course',
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  findAll(@Query('slug') slug: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() filters: AssociativeArray,
  ) {
    const { slug: _, ...filteredFilters } = filters; // Exclude 'slug' from filters
    return this.lessonsService.findAll(slug, filteredFilters);
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
