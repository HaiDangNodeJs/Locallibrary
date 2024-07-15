import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Book from "./book.entity";
import { SQL_CONSTANTS } from "../constant/db.type.constants";

@Entity()
export default class BookInstance extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.TWOHUNDRED})
    imprint: string;

    @Column({type: SQL_CONSTANTS.STRING, length: SQL_CONSTANTS.TWOHUNDRED})
    status: string;

    @Column({ name: 'due_back', type: SQL_CONSTANTS.TIMESTAMP , nullable: true })
    dueBack: Date;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'book_id' })
    book: Book;

    constructor(data?: Partial<BookInstance>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
}
