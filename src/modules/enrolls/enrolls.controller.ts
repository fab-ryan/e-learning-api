import { Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { EnrollsService } from './enrolls.service';
import { Roles, User } from '@/decorators';
import { AuthGuard, AuthUserType } from '@/guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '@/enums';

@ApiTags('enrolls')
@Controller('enrolls')
export class EnrollsController {
  constructor(private readonly enrollsService: EnrollsService) { }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.ALL)
  @Get('courses')
  getStudentEnrollsCourses(@User() user: AuthUserType) {
    return this.enrollsService.studentGetEnrollsCourses(user);
  }
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR, RolesEnum.MENTOR)
  @UseGuards(AuthGuard)
  @Get('instructor')
  getInstructorEnrollsCourses(@User() user: AuthUserType) {
    return this.enrollsService.instructorGetEnrollsCourses(user);
  }

  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.ALL)
  @UseGuards(AuthGuard)
  @Post('/:courseId')
  enrollCourse(@User() user: AuthUserType, @Param('courseId') courseId: string) {
    return this.enrollsService.studentEnroll(courseId, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.ALL)
  @Put('/:courseId')
  unenrollCourse(@User() user: AuthUserType, @Param('courseId') courseId: string) {
    return this.enrollsService.unenrollCourse(courseId, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.ALL)
  @Patch('/:courseId/status')
  changeStatusCourse(@User() user: AuthUserType, @Param('courseId') courseId: string) {
    return this.enrollsService.studentEnrollChangeStatus(courseId, user);
  }


}
