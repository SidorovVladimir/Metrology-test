import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) {}

  // TODO: add types createQuestion
  async createQuestion(dto: CreateQuestionDTO, testId: number): Promise<any> {
    try {
      const data = {
        text: dto.text,
        has_multiple_answers: dto.has_multiple_answers,
        testId,
      };
      const question = await this.questionsRepository.save(data);
      return question;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteQuestion(questionId: number): Promise<void> {
    try {
      await this.questionsRepository.delete(questionId);
    } catch (e) {
      throw new Error(e);
    }
  }
  // TODO: Add UpdateDTO question
  async updateQuestion(questionId: number, updateDto: any): Promise<any> {
    try {
      await this.questionsRepository.update(questionId, updateDto);
      return updateDto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteAllQuestionsTest(testId: number): Promise<void> {
    try {
      await this.questionsRepository.delete({ testId });
    } catch (e) {
      throw new Error(e);
    }
  }
}
