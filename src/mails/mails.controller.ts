import {Controller, Delete, Get, Post, Query} from '@nestjs/common';
import {MailsService} from "./mails.service";
import {Mail} from "../entity/mail";

@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Get()
  async getMails(@Query() params): Promise<Mail[]> {
    return await this.mailsService.getMails(params.offset, params.limit);
  }

  @Post()
  async populateEmails(@Query() params): Promise<any> {
    try {
      const numberOfEmails = await this.mailsService.populateData(params.numberOfMails);
      return {
        message: `Added ${numberOfEmails} mails successfully`
      }
    } catch (e) {
      return {
        message: `Failed to populate mails!`,
        error: e
      }
    }
  }

  @Delete()
  async deleteMail(@Query() params): Promise<any> {
    const mailId = params.id;
    try {
      await this.mailsService.deleteMail(mailId);
      return {
        message: `Mail ${mailId} deleted successfully`
      }
    } catch (e) {
      return {
        message: `Failed to delete mail ${mailId}!`,
        error: e
      }
    }
  }
}
