import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { Answer } from 'src/modules/answers/entities/answer.entity';
import { Image } from 'src/modules/images/entities/image.entity';

export class QuestionAndAnswersResponse {
  @IsString()
  text: string;

  @IsBoolean()
  has_multiple_answers: boolean;

  @IsNumber()
  test_id: number;

  @IsNumber()
  question_id: number;

  @IsString()
  create_at: string;

  image: Image;

  @IsArray()
  answers: Answer[];
}
