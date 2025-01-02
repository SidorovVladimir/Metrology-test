import { IsString } from 'class-validator';

export class CreateCourseDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
