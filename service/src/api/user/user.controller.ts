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
  appUserReg(@Body() body: any) {
    return this.userService.appUserReg(body);
  }
  @Post('/login')
  appUserLogin(@Body() body: any) {
    return this.userService.appUserLogin(body);
  }
}
