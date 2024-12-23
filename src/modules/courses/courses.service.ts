/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCourseDto, FilesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { generateSlug, ResponseService } from '@/utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async create(createCourseDto: CreateCourseDto, files: FilesDto) {
    try {
      const slug = generateSlug(createCourseDto.title);
      const courseExist = await this.courseExist(createCourseDto.title, slug);
      if (courseExist) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.COURSE.COURSE_EXIST'),
        });
      }

      const images = files.thumbnail_url?.path;
      const course = this.courseRepository.create({
        ...createCourseDto,
        price: createCourseDto.price.toString(),
        slug,
        thumbnail: images,
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
      const errorMsg = (e as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: this.i18n.t('response.COURSE.COURSE_FAILED_TO_CREATE'),
        success: false,
        key: 'courses',
      });
    }
  }

  async findAll() {
    try {
      const courses = await this.courseRepository.find();
      return this.responseService.Response({
        data: courses,
        message: 'Courses fetched successfully',
        success: true,
        key: 'courses',
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      console.log(error);
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to fetch courses',
        success: false,
        key: 'courses',
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
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
}
