import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Quiz } from '../quiz/entities/quiz.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Quiz, Course])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {

}
