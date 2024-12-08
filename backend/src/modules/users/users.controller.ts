import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.quard';
import { Role } from '../auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete()
  @Role('admin')
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.usersService.deleteUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const user = request.user;
    return this.usersService.updateUser(user.id, updateUserDto);
  }
}
