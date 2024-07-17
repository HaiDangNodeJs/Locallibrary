import { AppDataSource } from '../config/data-source';
import Book from '../entity/book.entity';

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);

    async getIndexData() {
        return await this.bookRepository.count();
    }
}
