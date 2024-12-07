import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Role } from './decorators/roles.decorator';
import { RoleGuard } from './guards/role.quard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<any> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto: any): Promise<any> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('test')
  @Role('admin')
  test(@Req() request) {
    return request.user;
  }
}
