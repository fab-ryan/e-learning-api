import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz, Question, QuestionType, AnswerOption } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Lesson } from '../lessons/entities/lesson.entity';
import { ResponseService } from '@/utils';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(AnswerOption)
    private answerOptionRepository: Repository<AnswerOption>,

    private readonly responseService: ResponseService,


  ) { }

  async createQuiz(createQuizDto: CreateQuizDto, lessonId: string) {
    try {
      const lesson = await this.lessonRepository.findOne({
        where: { id: lessonId },
      });

      if (!lesson) {
        return this.responseService.Response({
          message: 'Lesson not found',
          statusCode: 404,
        });
      }

      const quiz = this.quizRepository.create({
        ...createQuizDto,
        lesson,
      });

      const savedQuiz = await this.quizRepository.save(quiz);

      return this.responseService.Response({
        message: 'Quiz created successfully',
        statusCode: 201,
        data: savedQuiz,
      });

    } catch (error) {
      this.responseService.Response({
        message: 'Error creating quiz',
        statusCode: 500,
      });

    }
  }
}
