import { Controller, Get, Post, Param,Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
  @Get('/aaa/:id')
  getIdTest(@Param('id') id: string) {
    return this.appService.getIdTest(id);
  }
  @Post('/bbb')
  postTest(@Body() body: any) {
    return this.appService.postTest(body);
  }
}
