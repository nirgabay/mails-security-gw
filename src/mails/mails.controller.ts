import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {MailsService} from "./mails.service";
import {Mail} from "../entity/mail";

@Controller('mails')
export class MailsController {
    constructor(private readonly mailsService: MailsService) {
    }

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
    async deleteMail(@Body() body: any): Promise<any> {
        const mailIds: string[] = body.mailIds;
        let message: string;
        let error: string = '';

        if (mailIds && mailIds.length > 0) {
            try {
                await this.mailsService.deleteMails(mailIds);
                message = `Deleted ${mailIds.length} Mails successfully`
            } catch (e) {
                message = 'Failed to delete mails!';
                error = e;
            }
        } else {
            message = 'Failed to delete mails! Missing or empty mailIds array in request body';
        }

        return {
            message,
            error
        }
    }

    @Put()
    async updateMailsStatus(@Body() body: any): Promise<any> {
        const mailIds: string[] = body.mailIds;
        const status: string = body.status;
        const errorMessagePrefix = 'Failed to update mails status! ';
        let message: string;
        let error: string = '';

        if (!mailIds || mailIds.length === 0) {
            return {
                message: `${errorMessagePrefix}Missing or empty mailIds array in request body`
            }
        }

        if (!status) {
            return {
                message: `${errorMessagePrefix}Missing or empty status in request body`
            }
        }

        try {
            await this.mailsService.updateMailsStatus(mailIds, status);
            message = `Updated ${mailIds.length} Mails successfully`
        } catch (e) {
            message = 'Failed to update mails!';
            error = e;
        }

        return {
            message,
            error
        }
    }
}
