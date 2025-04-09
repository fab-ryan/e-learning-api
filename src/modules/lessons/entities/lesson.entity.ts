import { Entity, Column, PrimaryColumn, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, } from "typeorm";
import { uuid } from "@/utils";
import { Type } from "class-transformer";
import { Course } from "@/modules/courses/entities/course.entity";
import { IsString } from "class-validator";
import { Quiz } from "@/modules/quiz/entities/quiz.entity";

export enum LessonType {
    VIDEO = 'video',
    PDF = 'pdf',
    QUIZ = 'quiz',
    ARTICLE = 'article',
}

@Entity()
export class Lesson {
    constructor(partial: Partial<Lesson>) {
        this.id = uuid();
    }
    @PrimaryColumn()
    id: string;

    @Column({
        nullable: false,
        unique: true,
    })
    @IsString()
    @Unique('slug', ['slug'], {
        deferrable: 'INITIALLY DEFERRED'
    })
    slug: string;

    @Type(() => Course)
    @ManyToOne(() => Course, course => course.id)
    course: Course;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'enum', enum: LessonType })
    type: LessonType;

    @Column({ type: 'int' })
    position: number;

    @Column({ nullable: true })
    contentUrl?: string;

    @Column({ nullable: true })
    thumbnail?: string

    @Column({ type: 'jsonb', nullable: true })
    contentMetadata?: Record<string, any>

    @Column({ nullable: false, default: true })
    status: boolean;

    @OneToOne(() => Quiz, { nullable: true }) // Only if lesson is a quiz
    quiz?: Quiz;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;

}
