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
    return this.appMessageService.getMessage(body, 0);
  }
  @Post('/tradeMessage')
  @HttpCode(HttpStatus.OK)
  tradeMessage(@Body() body: any) {
    return this.appMessageService.getMessage(body, 1);
  }
  @Post('/purchaseMessage')
  @HttpCode(HttpStatus.OK)
  purchaseMessage(@Body() body: any) {
    return this.appMessageService.getMessage(body, 2);
  }
  @Post('/shopMessage')
  @HttpCode(HttpStatus.OK)
  shopMessage(@Body() body: any) {
    return this.appMessageService.getMessage(body, 3);
  }
}
