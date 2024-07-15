import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Author from "./author.entity";
import BookInstance from "./book_instance.entity";
import Genre from "./genre.entity";
import { SQL_CONSTANTS } from "../constant/db.type.constants";


@Entity()
export default class Book extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.HUNDRED})
    title: string;

    @Column({type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.THOUSAND, nullable: true})
    summary: string;

    @Column({type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.HUNDRED, nullable: true })
    isbn: string;

    @ManyToOne(() => Author)
    @JoinColumn({ name: 'author_id' })
    author: Author;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    @OneToMany(() => BookInstance, bookInstance => bookInstance.book)
    bookInstances: BookInstance[];

    constructor(data?: Partial<Book>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
}
