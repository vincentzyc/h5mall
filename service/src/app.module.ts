import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './module/index';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ApiModule,
    HttpModule,
    ServeStaticModule.forRoot({
      renderPath: join(__dirname, '..', 'public'),
      rootPath: join(__dirname, '..', 'public'),
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }