import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1586693173381 implements MigrationInterface {
    name = 'CreateTable1586693173381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."mails" ("id" BIGSERIAL NOT NULL, "uuid" character varying(255) NOT NULL, "sentTime" TIMESTAMP NOT NULL, "recipient" character varying(255), "sender" character varying(255), "subject" character varying(255), "category" character varying(255), CONSTRAINT "PK_47ec61979ddb4d23cf4ab9fc9e1" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."mails"`, undefined);
    }

}
