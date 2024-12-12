import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TestsService } from './tests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.quard';
import { Role } from '../auth/decorators/roles.decorator';
import { CreateTestDTO } from './dto/create-test.dto';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  @Role('admin')
  createTest(@Body() createTestDto: CreateTestDTO): Promise<CreateTestDTO> {
    return this.testsService.createTest(createTestDto);
  }
}
