import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { ImagesModule } from '../images/images.module';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), ImagesModule, AnswersModule],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
