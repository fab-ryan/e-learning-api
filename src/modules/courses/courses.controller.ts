import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@/guards';
import { Roles } from '@/decorators';
import { RolesEnum } from '@/enums';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storage } from '@/utils';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiAcceptedResponse({
    description: 'The record has been successfully created.',
    type: CreateCourseDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'thumbnail_url',
          maxCount: 1,
        },
      ],
      { storage },
    ),
  )
  create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFiles()
    files: {
      thumbnail_url: Express.Multer.File;
    },
  ) {
    return this.coursesService.create(createCourseDto, files);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
