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

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  @Role('admin')
  createTest(@Body() createTestDto: CreateTestDTO): Promise<CreateTestDTO> {
    return this.testsService.createTest(createTestDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @Role('admin')
  deleteTest(@Param('id', ParseIntPipe) testId: number): Promise<boolean> {
    return this.testsService.deleteTest(testId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @Role('admin')
  updateTest(
    @Param('id', ParseIntPipe) testId: number,
    @Body() updateTestDto: UpdateTestDTO,
  ): Promise<UpdateTestDTO> {
    return this.testsService.updateTest(testId, updateTestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTests(): Promise<Test[]> {
    return this.testsService.getAllTests();
  }
}
