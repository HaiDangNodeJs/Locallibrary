import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SQL_CONSTANTS } from "../constant/db.type.constants";
import Book from "./book.entity";

@Entity()
export default class Genre extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.HUNDRED })
    name: string;

    @ManyToMany(() => Book, book => book.genres)
    books: Book[];

    constructor(data?: Partial<Genre>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
}
