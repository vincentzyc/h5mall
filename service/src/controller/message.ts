import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AppMessageService } from '@src/service/message';

@Controller('appMessage')
export class AppMessageController {
  constructor(private readonly appMessageService: AppMessageService) { }

  @Post('/messageIndex')
  @HttpCode(HttpStatus.OK)
  messageIndex(@Body() body: any) {
    return this.appMessageService.getMessageIndex(body);
  }
  @Post('/systemMessage')
  @HttpCode(HttpStatus.OK)
  systemMessage(@Body() body: any) {
    return this.appMessageService.systemMessage(body);
  }
}
