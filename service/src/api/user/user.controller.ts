import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResult } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(@Query() query: Object): Promise<UserResult> {
    return this.userService.findAll(query);
  }
}
