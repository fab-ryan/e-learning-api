import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
// import {  } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz, Question, AnswerOption } from './entities/quiz.entity';
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
    // @InjectRepository(Answer)
    // private answerRepository: Repository<Answer>,

    private readonly responseService: ResponseService,
  ) {}

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

      // const options = createQuizDto.questions.map((question) => ({
      //   text: question.options,
      //   isCorrect: question.correctAnswers,
      // }));

      const quiz = this.quizRepository.create({
        title: createQuizDto.title,
        description: createQuizDto.description,
        lesson: lesson,
      });

      const questions = createQuizDto.questions.map((question) => ({
        text: question.text,
        type: question.type,
        correctAnswers: question.correctAnswers,
      }));
      const savedQuestions = await this.questionRepository.save(questions);

      const savedQuiz = await this.quizRepository.save({
        ...quiz,
        questions: savedQuestions,
      });

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
