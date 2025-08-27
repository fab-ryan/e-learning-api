import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerOption, Question, Quiz } from './entities/quiz.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, AnswerOption, Question, Lesson])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
