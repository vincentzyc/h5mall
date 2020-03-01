import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validation.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局注册错误的过滤器(错误异常)
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器(成功返回格式)
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局使用管道(数据校验)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3030);
}
bootstrap();
