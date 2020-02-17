import { Controller, Get,Post,Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResult } from './user.entity';

@Controller('appUser')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(@Query() query: Object): Promise<UserResult> {
    return this.userService.findAll(query);
  }
  @Post('/reg')
  postTest(@Body() body: any) {
    return this.userService.appUserReg(body);
  }
}
