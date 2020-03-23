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
    // return [{
    //   user_id: body.user_id,
    //   create_time: Date.now(),//	long	是	系统消息创建时间	
    //   from_id: 123, //	int	是	来源用户id	
    //   message: '这是一条测试测试测试测试消息', //	string	是	消息内容	
    //   message_head: '这是标题', //	string	是	消息标题	
    //   order_item_id: 12, //	int	是	订单详情id	
    //   quote_id: 11, //	itn	是	报价id	
    //   state: 0, //	int	是	消息状态，0未读，1已读	
    //   type: 1, //	int	是	消息类型，0系统消息，1交易消息，2报价消息，3农户通知，4普通聊天消息	
    // }];
  }
}
