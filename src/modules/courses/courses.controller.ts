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
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard, AuthUserType } from '@/guards';
import { Roles, User } from '@/decorators';
import { RolesEnum } from '@/enums';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AssociativeArray, storage } from '@/utils';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

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
      thumbnail_url: Express.Multer.File[];
    },
    @User() user: AuthUserType,
  ) {
    return this.coursesService.create(createCourseDto, files, user);
  }

  @Get()
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
  findAll(  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() filters: AssociativeArray,) {
    return this.coursesService.findAll(filters);
  }

  @Get('my-course')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  findMyCourse(@User() user: AuthUserType) {
    return this.coursesService.findMyCourse(user);
  }
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.coursesService.findOne(slug);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  @ApiConsumes('multipart/form-data')
  @ApiAcceptedResponse({
    description: 'The record has been successfully created.',
    type: UpdateCourseDto,
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
  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles()
    files: {
      thumbnail_url: Express.Multer.File[];
    },
    @User() user: AuthUserType,
  ) {
    return this.coursesService.update(slug, updateCourseDto, files, user);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  @ApiQuery({ name: 'status', required: true, type: Boolean })
  @Put('change-status:slug')
  changeStatus(@Param('slug') slug: string, @Query('status') status: boolean) {
    return this.coursesService.changeStatus(slug, status);
  }
}
