import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { TestsModule } from '../tests/tests.module';
import { Test } from '../tests/entities/test.entity';
import { QuestionsModule } from '../questions/questions.module';
import { Question } from '../questions/entities/question.entity';
import { Course } from '../courses/entities/course.entity';
import { VideoMaterial } from '../video-materials/entities/video-material.entity';
import { Answer } from '../answers/entities/answer.entity';
import { Image } from '../images/entities/image.entity';
import { Attempt } from '../attempts/entities/attempt.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('db_host'),
        port: +configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        entities: [
          User,
          Test,
          Question,
          Course,
          VideoMaterial,
          Answer,
          Image,
          Attempt,
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    TestsModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
