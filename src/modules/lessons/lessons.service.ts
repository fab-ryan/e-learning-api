import { Injectable } from '@nestjs/common';
import { CreateLessonDto, FilesDTO } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { DataSource, Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { Quiz } from '../quiz/entities/quiz.entity';
import { AssociativeArray, filterQueryBuilderFromRequest, generateSlug, removeFile, ResponseService } from '@/utils';
import { PaginateHelper } from '@/utils/paginate';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
    private dataSource: DataSource,
    private readonly responseService: ResponseService,
    private readonly pagination: PaginateHelper<Lesson>,
  ) { }
  async create(createLessonDto: CreateLessonDto, courseId: string, files: FilesDTO, quizId?: string) {
    try {
      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });

      if (!course) {
        this.responseService.Response({
          message: 'Course not found',
          statusCode: 404,
        });
      }

      this.dataSource.transaction(async (manager) => {
        await manager.getRepository(Lesson)
          .createQueryBuilder()
          .update()
          .set({ position: () => `"position" + 1` })
          .where('courseId = :courseId', { courseId })
          .execute();
        const lesson = this.lessonRepository.create({
          ...createLessonDto,
          contentUrl: `lesson/${files.content_url[0]?.filename}`,
          thumbnail: `lesson/${files.thumbnail[0]?.filename}`,
          course,
          slug: generateSlug(createLessonDto.title),
          position: 1,
        });
        const savedLesson = await manager.save(lesson);
        return this.responseService.Response({
          message: 'Lesson created successfully',
          statusCode: 201,
          data: savedLesson,
        });
      })

    } catch (error) {
      const errorMessage = (error as Error).message;
      this.responseService.Response({
        message: errorMessage,
        statusCode: 500,
      });

    }
  }

  async findAll(slug: string, filters?: AssociativeArray) {
    try {
      const lessonQuery = this.lessonRepository.createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.course', 'course')
        .where('course.slug = :slug', { slug })
        .andWhere('lesson.status = :status', { status: true })
        .orderBy('lesson.position', 'ASC');
      filterQueryBuilderFromRequest(lessonQuery, filters);

      const lessons = await this.pagination.run(lessonQuery);

      return this.responseService.Response({
        message: 'Lessons fetched successfully',
        data: lessons,
        key: 'lessons',
        statusCode: 200,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      return this.responseService.Response({
        message: errorMessage,
        statusCode: 500,
      });

    }
  }

  async findOne(lesson_slug: string, course_slug: string) {
    try {
      const lesson = await this.lessonRepository.createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.course', 'course')
        .leftJoinAndSelect('course.creator', 'instructor')
        .where('lesson.slug = :lesson_slug', { lesson_slug })
        .andWhere('course.slug = :course_slug', { course_slug })
        .getOne();
      if (!lesson) {
        return this.responseService.Response({
          message: 'Lesson not found',
          statusCode: 404,
        });
      }
      return this.responseService.Response({
        message: 'Lesson fetched successfully',
        data: lesson,
        key: 'lesson',
        statusCode: 200,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      return this.responseService.Response({
        message: errorMessage,
        statusCode: 500,
      });

    }
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, files: FilesDTO, quizId?: string) {
    try {
      const lesson = await this.lessonRepository.findOne({
        where: { id },
      });
      if (!lesson) {
        return this.responseService.Response({
          message: 'Lesson not found',
          statusCode: 404,
        });
      }
      if (files.content_url) {
        removeFile(lesson.contentUrl);

      }
      if (files.thumbnail) {
        removeFile(lesson.thumbnail);
      }
      const updatedLesson = await this.lessonRepository.save({
        ...lesson,
        ...updateLessonDto,
        contentUrl: files.content_url ? `lesson/${files.content_url[0]?.filename}` : lesson.contentUrl,
        thumbnail: files.thumbnail ? `lesson/${files.thumbnail[0]?.filename}` : lesson.thumbnail,
      });
      return this.responseService.Response({
        message: 'Lesson updated successfully',
        data: updatedLesson,
        key: 'lesson',
        statusCode: 200,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      return this.responseService.Response({
        message: errorMessage,
        statusCode: 500,
      });

    }
  }

  async remove(id: string) {
    try {
      const lesson = await this.lessonRepository.findOne({
        where: { id },
      });
      if (!lesson) {
        return this.responseService.Response({
          message: 'Lesson not found',
          statusCode: 404,
        });

      }
      removeFile(lesson.contentUrl);
      removeFile(lesson.thumbnail);
      await this.lessonRepository.delete(id);
      return this.responseService.Response({
        message: 'Lesson deleted successfully',
        statusCode: 200,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      return this.responseService.Response({
        message: errorMessage,
        statusCode: 500,
      });
    }
  }

  async getAllLessonByInstructionn(slug: string, filters?: AssociativeArray) {
    {
      try {
        const lessonQuery = this.lessonRepository.createQueryBuilder('lesson')
          .leftJoinAndSelect('lesson.course', 'course')
          .where('course.slug = :slug', { slug })
          .orderBy('lesson.position', 'ASC');
        filterQueryBuilderFromRequest(lessonQuery, filters);

        const lessons = await this.pagination.run(lessonQuery);

        return this.responseService.Response({
          message: 'Lessons fetched successfully',
          data: lessons,
          key: 'lessons',
          statusCode: 200,
        });
      } catch (error) {
        const errorMessage = (error as Error).message;
        return this.responseService.Response({
          message: errorMessage,
          statusCode: 500,
        });

      }
    }
  }
}
