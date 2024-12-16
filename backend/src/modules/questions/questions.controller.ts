import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.quard';
import { Role } from '../auth/decorators/roles.decorator';
import { CreateQuestionDTO } from './dto/create-question.dto';

@Controller('tests')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // TODO: add types createQuestion
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':testId/questions')
  @Role('admin')
  createQuestion(
    @Body() createDto: CreateQuestionDTO,
    @Param('testId', ParseIntPipe) testId: number,
  ): Promise<any> {
    return this.questionsService.createQuestion(createDto, testId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('questions/:questionId')
  @Role('admin')
  deleteQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<void> {
    return this.questionsService.deleteQuestion(questionId);
  }
}
