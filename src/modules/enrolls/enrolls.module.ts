import { Module } from '@nestjs/common';
import { EnrollsService } from './enrolls.service';
import { EnrollsController } from './enrolls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enroll } from './entities/enroll.entity';
import { Course } from '../courses/entities/course.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enroll, User, Course])],
  controllers: [EnrollsController],
  providers: [EnrollsService],
  exports: [EnrollsService],
})
export class EnrollsModule {}
