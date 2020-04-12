import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Mail} from "../entity/mail";
import {Repository} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

const namor = require("namor");

@Injectable()
export class MailsService {
  private readonly categories: string[] = ['Phishing', 'Malicious', 'Spam'];

  constructor(
      @InjectRepository(Mail)
      private readonly mailsRepository: Repository<Mail>,
  ) {}

  async getMails(offset?: number, limit?: number): Promise<Mail[]> {
    return await this.mailsRepository.find( {
      skip: offset,
      take: limit,
      order: {
        id: "ASC"
      }
    });
  }

  async populateData(numberOfMails?: number): Promise<number> {
    await this.mailsRepository.clear();

    const emails: Mail[] = [];
    const numberOfMailsToPopulate = numberOfMails || 2000;

    for (let i=0; i < numberOfMailsToPopulate; i++) {
      const mail: Mail = new Mail();
      mail.uuid = uuidv4();
      mail.sentTime = new Date();
      mail.recipient = MailsService.generateRandomEmail();
      mail.sender = MailsService.generateRandomEmail();
      mail.subject = MailsService.generateRandomString();
      mail.category = this.categories[Math.floor(Math.random()*this.categories.length)];
      emails.push(mail);
    }

    const emailEntities = this.mailsRepository.create(emails);
    await this.mailsRepository.insert(emailEntities);
    return numberOfMailsToPopulate;
  }

  async deleteMail(id: string): Promise<void> {
    await this.mailsRepository.delete(id);
  }

  private static generateRandomEmail(): string {
    return `${namor.generate({ separator: '@', saltLength: 0 })}.com`;
  }

  private static generateRandomString(): string {
    return namor.generate({ words: 4, separator: ' ', saltLength: 0 });
  }
}
