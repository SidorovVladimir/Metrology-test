import { Injectable } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './dto/create-test.dto';
import { UpdateTestDTO } from './dto/update-test.dto';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
  ) {}

  async createTest(dto: CreateTestDTO): Promise<CreateTestDTO> {
    try {
      const test = await this.testsRepository.save({ title: dto.title });
      return test;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateTest(testId, dto: UpdateTestDTO): Promise<UpdateTestDTO> {
    try {
      await this.testsRepository.update(testId, dto);
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteTest(testId: number): Promise<boolean> {
    try {
      await this.testsRepository.delete(testId);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllTests(): Promise<Test[]> {
    try {
      return this.testsRepository.find();
    } catch (e) {
      throw new Error(e);
    }
  }
}
