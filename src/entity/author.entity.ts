import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Book from "./book.entity";
import { SQL_CONSTANTS } from "../constant/db.type.constants";

@Entity()
export default class Author extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.HUNDRED })
    firstName: string;

    @Column({ name: 'family_name', type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.HUNDRED })
    familyName: string;

    @Column({ name: 'date_of_birth', nullable: true, type: SQL_CONSTANTS.DATE })
    dateOfBirth: Date;

    @Column({ name: 'date_of_death', nullable: true, type: SQL_CONSTANTS.DATE })
    dateOfDeath: Date;

    @OneToMany(() => Book, book => book.author)
    books: Book[];
    
    constructor(data?: Partial<Author>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
}
