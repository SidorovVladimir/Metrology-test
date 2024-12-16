import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Test]), QuestionsModule],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
