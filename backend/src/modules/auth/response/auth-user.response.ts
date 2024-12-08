import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

class UserResponse {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class AuthUserResponse {
  user: UserResponse;

  @IsString()
  token: string;
}
