import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Course } from '@/modules/courses/entities/course.entity';
import { Type } from 'class-transformer';
import { uuid } from '@/utils';
import 'reflect-metadata';

@Entity('enrolles')
export class Enroll {
  constructor(partial: Partial<Enroll>) {
    this.id = uuid();
  }
  @PrimaryColumn()
  id: string;

  @Type(() => Course)
  @ManyToOne(() => Course, (course) => course.id)
  course: Course;

  @Type(() => User)
  @ManyToOne(() => User, (user) => user.id)
  student: User;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
