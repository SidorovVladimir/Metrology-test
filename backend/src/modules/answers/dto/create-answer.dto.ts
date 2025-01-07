import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAnswerDTO {
  @IsString()
  text: string;

  @Transform(({ value }) => {
    return value === 'true' || value === true;
  })
  @IsBoolean()
  is_correct: boolean;
}
