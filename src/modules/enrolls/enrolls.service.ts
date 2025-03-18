import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enroll } from './entities/enroll.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { ResponseService } from '@/utils';
import { AuthUserType } from '@/guards';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';

@Injectable()
export class EnrollsService {
    constructor(
        @InjectRepository(Enroll)
        private enrollRepository: Repository<Enroll>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        private readonly responseService: ResponseService,
        private readonly i18n: I18nService<I18nTranslations>,

    ) { }

    studentEnroll = async (courseId: string, student: AuthUserType) => {
        try {
            const user = await this.userRepository.findOne({
                where: { id: student.sub }
            })
            const existUserEnrolled = await this.enrollRepository.findOne({
                where: {
                    course: { id: courseId },
                    student: user,
                }
            })
            if (existUserEnrolled) {
                return this.responseService.Response({
                    message: 'You have already enrolled in this course',
                    data: null
                })
            }
            const course = await this.courseRepository.findOne({
                where: { id: courseId }
            })
            if (!course) {
                return this.responseService.Response({
                    message: 'Course not found',
                    data: null
                })
            }
            const enroll = this.enrollRepository.create({
                course,
                student: user
            })
            await this.enrollRepository.save(enroll)
            return this.responseService.Response({
                message: 'Enrolled successfully',
                data: enroll,
                key: 'enroll'
            })

        } catch (error) {
            const message = (error as Error).message
            return this.responseService.Response({
                message,
                data: null
            })
        }
    }

    unenrollCourse = async (courseId: string, student: AuthUserType) => {
        try {
            const user = await this.userRepository.findOne({
                where: { id: student.sub }
            })
            const enroll = await this.enrollRepository.findOne({
                where: {
                    course: { id: courseId },
                    student: user
                }
            })
            if (!enroll) {
                return this.responseService.Response({
                    message: 'You have not enrolled in this course',
                    data: null
                })
            }
            await this.enrollRepository.remove(enroll)
            return this.responseService.Response({
                message: 'Unenrolled successfully',
                data: null
            })
        } catch (error) {
            const message = (error as Error).message
            return this.responseService.Response({
                message,
                data: null
            })
        }
    }
    studentEnrollChangeStatus = async (courseId: string, student: AuthUserType) => {
        try {
            const user = await this.userRepository.findOne({
                where: { id: student.sub }
            })
            const enroll = await this.enrollRepository.createQueryBuilder('enroll')
                .leftJoinAndSelect('enroll.course', 'course')
                .where('enroll.student.id = :id',
                    { id: user.id })
                .andWhere('course.id = :courseId', { courseId })
                .getOne()

            if (!enroll) {
                return this.responseService.Response({
                    message: 'You have not enrolled in this course',
                    data: null
                })
            }
            const updatedEnroll = await this.enrollRepository.save({
                ...enroll,
                status: !enroll.status
            })
            return this.responseService.Response({
                message: 'Enroll status updated successfully',
                data: updatedEnroll,
                key: 'enroll'
            })
        } catch (error) {
            const message = (error as Error).message
            return this.responseService.Response({
                message,
                data: null
            })
        }
    }
    studentGetEnrollsCourses = async (student: AuthUserType) => {
        try {
            const user = await this.userRepository.findOne({
                where: { id: student.sub }
            })
            const enrolls = await this.enrollRepository.createQueryBuilder('enroll')
                .leftJoinAndSelect('enroll.course', 'course')
                .where('enroll.student.id = :id',
                    { id: user.id })
                .getMany()
            return this.responseService.Response({
                message: 'Enrolls fetched successfully',
                data: enrolls,
                key: 'enrolls'
            })
        } catch (error) {
            const message = (error as Error).message
            return this.responseService.Response({
                message,
                data: null
            })
        }
    }


    instructorGetEnrollsCourses = async (instructor: AuthUserType) => {
        try {
            const user = await this.userRepository.findOne({
                where: { id: instructor.sub }
            })
            const enrolls = await this.enrollRepository.createQueryBuilder('enroll')
                .leftJoinAndSelect('enroll.course', 'course')
                .where('course.creator.id = :id',
                    { id: user.id })
                .getMany()
            return this.responseService.Response({
                message: 'Enrolls fetched successfully',
                data: enrolls,
                key: 'enrolls'
            })
        } catch (error) {
            const message = (error as Error).message
            return this.responseService.Response({
                message,
                data: null
            })
        }
    }
}
