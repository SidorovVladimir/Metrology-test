import { Injectable } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './dto/create-test.dto';
import { UpdateTestDTO } from './dto/update-test.dto';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
    private readonly questionsService: QuestionsService,
  ) {}

  async createTest(dto: CreateTestDTO, id: number): Promise<Test> {
    try {
      const test = new Test();
      test.course_id = id;
      test.title = dto.title;
      await this.testsRepository.save(test);
      return test;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateTest(
    testId: number,
    courseId: number,
    dto: UpdateTestDTO,
  ): Promise<Test> {
    try {
      const test = await this.getOneCourseTest(courseId, testId);
      test.title = dto.title;
      await this.testsRepository.save(test);
      return test;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteTest(testId: number, courseId: number): Promise<void> {
    try {
      await this.questionsService.deleteAllQuestionsTest(testId);
      await this.testsRepository.delete({ course_id: courseId, id: testId });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllCourseTests(id: number): Promise<Test[]> {
    try {
      return this.testsRepository.find({ where: { course_id: id } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getOneCourseTest(courseId: number, testId: number): Promise<Test> {
    try {
      return this.testsRepository.findOne({
        where: { course_id: courseId, id: testId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
