import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MailsController} from "./mails.controller";
import {Mail} from "../entity/mail";
import {MailsService} from "./mails.service";

@Module({
  imports: [TypeOrmModule.forFeature([Mail])],
  controllers: [MailsController],
  providers: [MailsService],
})
export class MailsModule {}
