import { Injectable } from '@nestjs/common';

@Injectable()
export class AppMessageService {
  getMessageIndex(body: any): Object {
    return {
      user_id: body.user_id,
      SystemMessage: true, //	boolean	是	系统消息	
      TradeMessage: true, //	boolean	是	交易消息	
      PurchaseMessage: true, //	boolean	是	农户报价	
      ShopMessage: true //	boolean	是	农户通知
    };
  }
}
