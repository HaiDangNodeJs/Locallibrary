import Book from '@src/entity/book.entity';
import { AppDataSource } from '../config/data-source';
import BookInstance from '../entity/book_instance.entity';
import { BookInstanceStatus } from '../enums/book_instance_status';

export class BookInstanceService {
    private bookInstanceRepository = AppDataSource.getRepository(BookInstance);

    async getIndexData() {
        return await this.bookInstanceRepository.count();
    }

    async getIndexBookInstances() {
        return await this.bookInstanceRepository.count({
            where: { status: BookInstanceStatus.AVAILABLE }
        });
    }

    async getBookInstanceList() {
        return this.bookInstanceRepository.find({ relations: ['book'] })
    }

    async getBookInstanceById(id: number) {
        return this.bookInstanceRepository.findOne({
            where: { id },
            relations: ['book'],
        });
    }

    async createBookInstance(
        book: Book,
        imprint: string,
        status: BookInstanceStatus,
        due_back?: Date
    ) {
        const bookInstance = new BookInstance();
        bookInstance.book = book;
        bookInstance.imprint = imprint;
        bookInstance.status = status;
        if (due_back) bookInstance.dueBack = due_back;
        return this.bookInstanceRepository.save(bookInstance);
    };

    async deleteBookInstance(id: number) {
        return this.bookInstanceRepository.delete(id);
    }

    async updateBookinstance(
        bookInstance: BookInstance,
        book: Book,
        imprint: string,
        status: BookInstanceStatus,
        due_back?: Date
    ) {
        bookInstance.book = book;
        bookInstance.imprint = imprint;
        bookInstance.status = status;
        if (due_back) bookInstance.dueBack = due_back;
        return this.bookInstanceRepository.save(bookInstance);
    };
}
