import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('mails', { schema: 'public' })
export class Mail {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id'
  })
  id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'uuid'
  })
  uuid: string;

  @Column('timestamp without time zone', {
    nullable: false,
    name: 'sentTime'
  })
  sentTime: Date;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'recipient'
  })
  recipient: string;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'sender'
  })
  sender: string;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'subject'
  })
  subject: string;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'category'
  })
  category: string;
}
