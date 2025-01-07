import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.quard';
import { Role } from '../auth/decorators/roles.decorator';
import { CreateQuestionAndAnswersDTO } from './dto/create-question-and-answers.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { QuestionAndAnswersResponse } from './response/question-and-answers.response';

@Controller('courses')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':courseId/tests/:testId/questions')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueFileName = `${uuidv4()}.jpg`;
          callback(null, uniqueFileName);
        },
      }),
    }),
  )
  // @Role('admin')
  createQuestion(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateQuestionAndAnswersDTO,
    @Param('testId', ParseIntPipe) testId: number,
  ): Promise<QuestionAndAnswersResponse> {
    const data = plainToClass(CreateQuestionAndAnswersDTO, createDto);
    return this.questionsService.createQuestion(data, testId, file);
  }

  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':courseId/tests/:testId/questions/:questionId')
  // @Role('admin')
  deleteQuestion(
    @Param('testId', ParseIntPipe) testId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<void> {
    return this.questionsService.deleteQuestion(questionId, testId);
  }
}
