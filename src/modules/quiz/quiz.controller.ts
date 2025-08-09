import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guards';
import { Roles } from '@/decorators';
import { RolesEnum } from '@/enums';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  @Post(':lessonId')
  @ApiAcceptedResponse({
    description: 'The record has been successfully created.',
    type: CreateQuizDto,
  })
  createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @Param('lessonId') lessonId: string,) {
    return this.quizService.createQuiz(createQuizDto, lessonId);
  }


}
