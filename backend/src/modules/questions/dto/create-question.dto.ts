import { IsBoolean, IsString } from 'class-validator';

export class CreateQuestionDTO {
  @IsString()
  text: string;

  @IsBoolean()
  has_multiple_answers: boolean;
}
