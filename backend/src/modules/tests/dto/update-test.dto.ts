import { IsString } from 'class-validator';

export class UpdateTestDTO {
  @IsString()
  title: string;
}
