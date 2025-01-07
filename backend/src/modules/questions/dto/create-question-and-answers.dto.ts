import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString } from 'class-validator';
import { CreateAnswerDTO } from 'src/modules/answers/dto/create-answer.dto';

export class CreateQuestionAndAnswersDTO {
  @IsString()
  text: string;

  @Transform(({ value }) => {
    return value === 'true' || value === true;
  })
  @IsBoolean()
  has_multiple_answers: boolean;

  @Type(() => CreateAnswerDTO)
  @IsArray()
  answers: CreateAnswerDTO[];
}
