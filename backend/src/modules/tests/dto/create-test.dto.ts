import { IsString } from 'class-validator';

export class CreateTestDTO {
  @IsString()
  title: string;
}
