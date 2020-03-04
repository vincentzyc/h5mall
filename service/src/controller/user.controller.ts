import { Controller, HttpCode, HttpStatus, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from '@src/service/user.service';
import { UserResult } from '@src/entity/user.entity';
import { UserDto } from '@src/dto/user.dto';

@Controller('appUser')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(@Query() query: Object): Promise<UserResult> {
    return this.userService.findAll(query);
  }
  @Post('/reg')
  @HttpCode(HttpStatus.OK)
  appUserReg(@Body() body: UserDto) {
    return this.userService.appUserReg(body);
  }
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  appUserLogin(@Body() body: UserDto) {
    return this.userService.appUserLogin(body);
  }
  @Post('/getInfoByUserId')
  @HttpCode(HttpStatus.OK)
  getInfoByUserId(@Body() body: any) {
    return this.userService.getInfoByUserId(body);
  }
}
