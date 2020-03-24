import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '@src/entity/message';

@Injectable()
export class AppMessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) { }
  getMessageIndex(body: any): Object {
    return {
      user_id: body.user_id,
      SystemMessage: true, //	boolean	是	系统消息	
      TradeMessage: true, //	boolean	是	交易消息	
      PurchaseMessage: true, //	boolean	是	农户报价	
      ShopMessage: true //	boolean	是	农户通知
    };
  }
  async systemMessage(body: any): Promise<any> {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .where("message.user_id = :user_id", { user_id: body.user_id })
      .andWhere("message.type = :type", { type: 0 })
      .limit(10)
      .getMany();
    let res = message.map(v => {
      return {
        ...v,
        create_time: v.create_time.getTime()
      }
    })
    return res
  }
}
