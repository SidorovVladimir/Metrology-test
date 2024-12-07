import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AppError } from 'src/common/constant/errors';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(dto: CreateUserDto): Promise<any> {
    try {
      const existUser = await this.usersService.findUserByEmail(dto.email);
      if (existUser) return new BadRequestException(AppError.USER_EXIST);
      await this.usersService.createUser(dto);
      return this.usersService.publicUser(dto.email);
    } catch (e) {
      throw new Error(e);
    }
  }

  async loginUser(dto: any): Promise<any> {
    try {
      const existUser = await this.usersService.findUserByEmail(dto.email);
      if (!existUser) return new BadRequestException(AppError.USER_NOT_EXIST);
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword)
        return new BadRequestException(AppError.WRONG_DATA);
      return this.usersService.publicUser(dto.email);
    } catch (e) {
      throw new Error(e);
    }
  }
}
