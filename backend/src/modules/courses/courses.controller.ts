import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.quard';
import { Role } from '../auth/decorators/roles.decorator';
import { CreateCourseDTO } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  @Role('admin')
  createCourse(@Body() createCourseDto: CreateCourseDTO): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneCourses(@Param('id', ParseIntPipe) courseId: number): Promise<Course> {
    return this.coursesService.getOneCourses(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCourse(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() updateCourseDto: CreateCourseDTO,
  ): Promise<Course> {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }
}
