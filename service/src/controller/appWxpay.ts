import { Controller, Post,Body,HttpCode,HttpStatus } from '@nestjs/common';
import { AppWxpayService } from '@src/service/appWxpay';

@Controller('appWxpay')
export class AppWxpayController {
  constructor(private readonly appWxpayService: AppWxpayService) { }

  @Post('/getWxShareInfo')
  @HttpCode(HttpStatus.OK)
  appUserReg(@Body() body: any) {
    return this.appWxpayService.getWxShareInfo(body);
  }
}
