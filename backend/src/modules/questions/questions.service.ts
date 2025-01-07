import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionAndAnswersDTO } from './dto/create-question-and-answers.dto';
import { ImagesService } from '../images/images.service';
import { AnswersService } from '../answers/answers.service';
import { QuestionAndAnswersResponse } from './response/question-and-answers.response';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    private readonly imagesService: ImagesService,
    private readonly answersService: AnswersService,
  ) {}

  async createQuestion(
    dto: CreateQuestionAndAnswersDTO,
    testId: number,
    file: Express.Multer.File,
  ): Promise<QuestionAndAnswersResponse> {
    try {
      const question = new Question();
      question.text = dto.text;
      question.has_multiple_answers = dto.has_multiple_answers;
      question.test_id = testId;

      await this.questionsRepository.save(question);

      const image = await this.imagesService.createImage(
        file,
        question.question_id,
      );

      const answers = await Promise.all(
        dto.answers.map((answer) =>
          this.answersService.createAnswer(answer, question.question_id),
        ),
      );

      return { ...question, image, answers };
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteQuestion(questionId: number, testId: number): Promise<void> {
    try {
      await this.answersService.deleteAnswer(questionId);
      await this.imagesService.deleteImage(questionId);
      await this.questionsRepository.delete({
        question_id: questionId,
        test_id: testId,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  // // TODO: Add UpdateDTO question
  // async updateQuestion(questionId: number, updateDto: any): Promise<any> {
  //   try {
  //     await this.questionsRepository.update(questionId, updateDto);
  //     return updateDto;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async deleteAllQuestionsTest(testId: number): Promise<void> {
  //   try {
  //     await this.questionsRepository.delete({ test_id: testId });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}
