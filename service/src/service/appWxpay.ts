import { Injectable } from '@nestjs/common';

@Injectable()
export class AppWxpayService {
  getWxShareInfo(body: any): Object {
    return {
      nonceStr: '111',
      timestamp: '111',
      appId: '111',
      signature: '111',
      url: body.url || ''
    };
  }
}
