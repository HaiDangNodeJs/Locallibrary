import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1721030813415 implements MigrationInterface {
    name = 'InitDatabase1721030813415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`genre\` ADD \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`first_name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`family_name\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`family_name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`date_of_birth\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`date_of_birth\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`date_of_death\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`date_of_death\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP COLUMN \`imprint\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD \`imprint\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD \`status\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP COLUMN \`due_back\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD \`due_back\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`title\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`summary\` varchar(1000) NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`isbn\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`isbn\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`genre\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`genre\` ADD \`name\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`genre\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`genre\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`isbn\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`isbn\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`summary\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP COLUMN \`due_back\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD \`due_back\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP COLUMN \`imprint\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD \`imprint\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`date_of_death\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`date_of_death\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`date_of_birth\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`date_of_birth\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`family_name\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`family_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`first_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`genre\` DROP COLUMN \`url\``);
    }

}
