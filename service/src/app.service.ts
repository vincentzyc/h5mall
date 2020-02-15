import { Injectable, HttpService } from '@nestjs/common';
import { Logger } from './logger-service';
import { getIPAdress } from './utils';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async getHello(): Promise<string> {
    const remoteIp: string = getIPAdress();

    let res = await this.httpService.post(`http://${remoteIp}:3030/bbb`, { aaa: 111, bbb: 222, ccc: '123123' }).toPromise();
    // let res = await this.httpService.get('http://192.168.220.188:3030/aaa/666').toPromise();
    Logger.info(`这是一条测试日志111///${JSON.stringify(res.data)}`)
    return JSON.stringify(res.data);
  }
  getIdTest(id: string): string {
    Logger.info('这是一条测试日志222')
    return `This action returns ---${id}--- `;
  }
  postTest(req): string {
    Logger.info(`这是一条测试日志333`)
    return `This is a post test ---${JSON.stringify(req)}--- `;
  }
}
