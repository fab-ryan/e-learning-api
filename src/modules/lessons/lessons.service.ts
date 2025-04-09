import { Injectable } from '@nestjs/common';
import { CreateLessonDto, FilesDTO } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { DataSource, Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { Quiz } from '../quiz/entities/quiz.entity';
import { generateSlug, ResponseService } from '@/utils';

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
    private readonly responseService: ResponseService
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
        // if (quizId) {
        //   const quiz = this.quizzesRepository.create({
        //     ...createLessonDto,
        //     lesson: savedLesson,
        //   });
        //   await manager.save(quiz);
        // }
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

  async findAll(slug: string) {
    try {
      const course = await this.courseRepository.findOne({
        where: { slug },
      });
      const lesson = await this.lessonRepository.findAndCount({
      });
      const lessons = lesson[0].map((lesson) => { })
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

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
