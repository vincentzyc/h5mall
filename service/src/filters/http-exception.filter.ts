import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Logger } from '../logger-service';

import { formatDate } from '../utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message =
      exception.message ||
      exception.message.message ||
      exception.message.error ||
      null;
    Logger.info(`错误提示：${message}`);
    const errorResponse = {
      message: (typeof message == 'string') ? (message || '请求失败') : JSON.stringify(message),
      code: 1, // 自定义code
      // path: request.url, // 错误的url地址
      // method: request.method, // 请求方式
      // timestamp: new Date().toLocaleDateString(), // 错误的时间
    };
    // 打印日志
    Logger.error(
      `【${formatDate(Date.now())}】${request.method} ${request.url} ${JSON.stringify(errorResponse)}`
    );
    // 设置返回的请求头、发送错误信息
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
