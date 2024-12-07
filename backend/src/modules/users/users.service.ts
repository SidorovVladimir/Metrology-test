import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersReposittory: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      return hash;
      return;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createUser(dto: CreateUserDto): Promise<any> {
    const user = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: await this.hashPassword(dto.password),
      isAdmin: false,
    };
    return this.usersReposittory.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.usersReposittory.findOne({ where: { email } });
    } catch (e) {
      throw new Error(e);
    }
  }
  async publicUser(email: string): Promise<any> {
    try {
      const user = await this.usersReposittory.findOne({
        where: { email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          isAdmin: true,
        },
      });
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  }
}
