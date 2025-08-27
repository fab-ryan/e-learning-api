import { uuid } from '@/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '@/modules/lessons/entities/lesson.entity';

export enum QuestionType {
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
  TEXT = 'text',
}

@Entity()
export class Quiz {
  constructor() {
    this.id = uuid();
  }
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[];

  @OneToOne(() => Lesson, (lesson) => lesson.quiz) // Bidirectional relationship
  lesson: Lesson;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class Question {
  constructor() {
    this.id = uuid();
  }
  @PrimaryColumn()
  id: string;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quiz;

  @OneToMany(() => AnswerOption, (option) => option.question, { cascade: true })
  options: AnswerOption[];

  @Column({ type: 'simple-array', nullable: true })
  correctAnswers?: string[]; // For MCQs: ["A", "C"], for text: ["exact answer"]
}

@Entity()
export class AnswerOption {
  constructor() {
    this.id = uuid();
  }
  @PrimaryColumn()
  id: string;

  @Column()
  label: string; // e.g., "A", "B", "C"

  @Column()
  text: string;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  question: Question;
}
