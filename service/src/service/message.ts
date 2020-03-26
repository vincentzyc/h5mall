import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '@src/entity/message';

function formatTime(message) {
  return message.map(v => {
    return {
      ...v,
      create_time: v.create_time.getTime()
    }
  })
}

@Injectable()
export class AppMessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) { }
  async getMessageIndex(body: any): Promise<any> {
    let resultSystem: Number = await this.messageRepository.count({ user_id: body.user_id, state: 0, type: 0 });
    let resultTrade: Number = await this.messageRepository.count({ user_id: body.user_id, state: 0, type: 1 });
    let resultPurchase: Number = await this.messageRepository.count({ user_id: body.user_id, state: 0, type: 2 });
    let resultShop: Number = await this.messageRepository.count({ user_id: body.user_id, state: 0, type: 3 });
    return {
      user_id: body.user_id,
      SystemMessage: resultSystem > 0, //	boolean	是	系统消息	
      TradeMessage: resultTrade > 0, //	boolean	是	交易消息	
      PurchaseMessage: resultPurchase > 0, //	boolean	是	农户报价	
      ShopMessage: resultShop > 0 //	boolean	是	农户通知
    };
  }
  async getMessage(body: any, type: number): Promise<any> {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .where("message.user_id = :user_id", { user_id: body.user_id })
      .andWhere("message.type = :type", { type: type })
      // .limit(10)
      .getMany();
    return formatTime(message)
  }
}
