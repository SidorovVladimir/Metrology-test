import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDTO } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answersRepository: Repository<Answer>,
  ) {}

  async createAnswer(
    dto: CreateAnswerDTO,
    questionId: number,
  ): Promise<Answer> {
    try {
      const answer = new Answer();
      answer.text = dto.text;
      answer.is_correct = dto.is_correct;
      answer.question_id = questionId;
      await this.answersRepository.save(answer);
      return answer;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteAnswer(questionId: number): Promise<void> {
    try {
      await this.answersRepository.delete({ question_id: questionId });
    } catch (e) {
      throw new Error(e);
    }
  }
}
