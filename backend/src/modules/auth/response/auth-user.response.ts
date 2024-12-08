import { IsBoolean, IsNumber, IsString } from 'class-validator';

class UserResponse {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class AuthUserResponse {
  user: UserResponse;

  @IsString()
  token: string;
}
