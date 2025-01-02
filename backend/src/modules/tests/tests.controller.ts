import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.quard';
import { Role } from '../auth/decorators/roles.decorator';
import { CreateTestDTO } from './dto/create-test.dto';
import { Test } from './entities/test.entity';
import { UpdateTestDTO } from './dto/update-test.dto';

@Controller('courses')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':courseId/tests')
  @Role('admin')
  createTest(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() createTestDto: CreateTestDTO,
  ): Promise<Test> {
    return this.testsService.createTest(createTestDto, courseId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':courseId/tests/:testId')
  @Role('admin')
  deleteTest(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('testId', ParseIntPipe) testId: number,
  ): Promise<void> {
    return this.testsService.deleteTest(testId, courseId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':courseId/tests/:testId')
  @Role('admin')
  updateTest(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('testId', ParseIntPipe) testId: number,
    @Body() updateTestDto: UpdateTestDTO,
  ): Promise<Test> {
    return this.testsService.updateTest(testId, courseId, updateTestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':courseId/tests')
  getAllCourseTests(
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<Test[]> {
    return this.testsService.getAllCourseTests(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':courseId/tests/:testId')
  getOneCourseTest(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('testId', ParseIntPipe) testId: number,
  ): Promise<Test> {
    return this.testsService.getOneCourseTest(courseId, testId);
  }
}
