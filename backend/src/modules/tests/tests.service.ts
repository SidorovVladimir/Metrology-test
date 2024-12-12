import { Injectable } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './dto/create-test.dto';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
  ) {}

  async createTest(dto: CreateTestDTO): Promise<CreateTestDTO> {
    const test = await this.testsRepository.save({ title: dto.title });
    return test;
  }

  async updateTest() {}

  async deleteTest() {}

  async getAllTests() {}
}
