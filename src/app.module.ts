import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MailsModule} from "./mails/mails.module";

@Module({
  imports: [TypeOrmModule.forRoot(), MailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
