import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async createCourse(dto: CreateCourseDTO): Promise<Course> {
    try {
      const course = new Course();
      course.title = dto.title;
      course.description = dto.description;
      await this.coursesRepository.save(course);
      return course;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllCourses(): Promise<Course[]> {
    try {
      return this.coursesRepository.find();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getOneCourses(id: number): Promise<Course> {
    try {
      return this.coursesRepository.findOne({ where: { course_id: id } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateCourse(id: number, dto: CreateCourseDTO): Promise<Course> {
    try {
      const course = await this.getOneCourses(id);
      course.title = dto.title;
      course.description = dto.description;
      await this.coursesRepository.save(course);
      return course;
    } catch (e) {
      throw new Error(e);
    }
  }
}
