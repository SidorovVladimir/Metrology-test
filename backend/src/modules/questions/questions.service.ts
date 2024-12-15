import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) {}

  async createQuestion(dto: any): Promise<any> {
    try {
      const question = await this.questionsRepository.save(dto);
      return question;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteQuestion(questionId: number): Promise<boolean> {
    try {
      await this.questionsRepository.delete(questionId);
      return true;
    } catch (e) {
      throw new Error();
    }
  }

  async updateQuestion(questionId: number, updateDto: any): Promise<any> {
    try {
      await this.questionsRepository.update(questionId, updateDto);
      return updateDto;
    } catch (e) {
      throw new Error();
    }
  }
}
