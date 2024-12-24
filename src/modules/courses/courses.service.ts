/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseDto, FilesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import {
  generateSlug, removeFile, ResponseService,
  AssociativeArray,
  filterQueryBuilderFromRequest,
} from '@/utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';
import { AuthUserType } from '@/guards';
import { UserService } from '../user/user.service';
import { PaginateHelper } from '@/utils/paginate';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly userService: UserService,
    private readonly coursePagination: PaginateHelper<Course>,
  ) { }

  async create(
    createCourseDto: CreateCourseDto,
    files: FilesDto,
    user: AuthUserType,
  ) {
    try {
      const slug = generateSlug(createCourseDto.title);
      const courseExist = await this.courseExist(createCourseDto.title, slug);
      if (courseExist) {
        removeFile(files.thumbnail_url[0].filename);
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.COURSE.COURSE_EXIST'),
        });
      }

      const images = files.thumbnail_url[0]?.filename;
      const userDetail = await this.userService.userDetail(user.sub);
      const course = this.courseRepository.create({
        ...createCourseDto,
        price: createCourseDto.price.toString(),
        slug,
        thumbnail: images,
        isFree: createCourseDto.isFree === 'true',
        featured: createCourseDto.featured === 'true',
        creator: userDetail,
      });
      await this.courseRepository.save(course);
      return this.responseService.Response({
        data: course,
        message: this.i18n.t('response.COURSE.COURSE_CREATED_SUCCESSFULLY'),
        key: 'course',
        statusCode: 201,
        success: true,
      });
    } catch (e) {
      removeFile(files.thumbnail_url[0].filename);
      const errorMsg = (e as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: this.i18n.t('response.COURSE.COURSE_FAILED_TO_CREATE'),
        success: false,
        key: 'courses',
      });
    }
  }

  async findAll(filter?: AssociativeArray) {
    try {
      const coursesQuery = this.courseRepository.createQueryBuilder('course');
      filterQueryBuilderFromRequest(coursesQuery, filter);
      const courses = await this.coursePagination.run(coursesQuery);

      return this.responseService.Response({
        data: courses,
        message: 'Courses fetched successfully',
        success: true,
        key: 'courses',
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to fetch courses',
        success: false,
        key: 'courses',
      });
    }
  }

  async findOne(slug: string) {
    try {
      const course = await this.courseRepository.findOne({
        where: { slug },
        relations: ['creator'],
      });
      return this.responseService.Response({
        data: course,
        message: 'Course fetched successfully',
        success: true,
        key: 'course',
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to fetch course',
        success: false,
        key: 'courses',
      });
    }
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
    files: FilesDto,
    user: AuthUserType,
  ) {
    try {
      const course = await this.courseRepository.findOne({
        where: { id },
        relations: ['creator'],
      });
      if (!course) {
        removeFile(files.thumbnail_url[0].filename);
        return this.responseService.Response({
          data: null,
          message: 'Course not found',
          success: false,
          key: 'courses',
        });
      }
      let images: string;
      if (files.thumbnail_url) {
        images = files.thumbnail_url[0]?.filename;
      } else {
        images = course.thumbnail;
      }

      const userDetail = await this.userService.userDetail(user.sub);
      const updatedCourse = await this.courseRepository.save({
        ...course,
        ...updateCourseDto,
        thumbnail: images,
        creator: userDetail,
        isFree: updateCourseDto.isFree
          ? updateCourseDto.isFree === 'true'
          : course.isFree,
        featured: updateCourseDto.featured
          ? updateCourseDto.featured === 'true'
          : course.featured,
      });
      return this.responseService.Response({
        data: updatedCourse,
        message: 'Course updated successfully',
        success: true,
        key: 'courses',
      });
    } catch (error) {
      removeFile(files.thumbnail_url[0].filename);
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to update course',
        success: false,
        key: 'courses',
      });
    }
  }

  async remove(id: string) {
    try {
      await this.courseRepository.softDelete(id);

      return this.responseService.Response({
        data: null,
        message: 'Course deleted successfully',
        success: true,
        key: 'courses',
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to delete course',
        success: false,
        key: 'courses',
      });
    }
  }

  async courseExist(title: string, slug: string): Promise<boolean> {
    const course = await this.courseRepository.exists({
      where: {
        title,
        slug,
      },
    });
    return course;
  }

  async changeStatus(id: string, status: boolean) {
    try {
      const course = await this.courseRepository.findOne({
        where: { id },
      });
      if (!course) {
        return this.responseService.Response({
          data: null,
          message: 'Course not found',
          success: false,
          key: 'courses',
        });
      }
      const updatedCourse = await this.courseRepository.save({
        ...course,
        status,
      });
      return this.responseService.Response({
        data: updatedCourse,
        message: 'Course status updated successfully',
        success: true,
        key: 'courses',
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to update course status',
        success: false,
        key: 'courses',
      });
    }
  }
  async findMyCourse(user: AuthUserType) {
    try {
      const creator = await this.userService.userDetail(user.sub);
      const courses = await this.courseRepository.find({
        where: { creator },
      });
      return this.responseService.Response({
        data: courses,
        message: 'Courses fetched successfully',
        success: true,
        key: 'courses',
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to fetch courses',
        success: false,
        key: 'courses',
      });
    }
  }
}
