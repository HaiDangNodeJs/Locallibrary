import Genre from '@src/entity/genre.entity';
import { AppDataSource } from '../config/data-source';
import Book from '../entity/book.entity';
import Author from '@src/entity/author.entity';

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);

    async getIndexData() {
        return await this.bookRepository.count();
    }

    async getBooks() {
        return this.bookRepository.find({ order: { title: 'ASC' }, relations: ['author'] })
    }

    async getBookById(id: number) {
        return this.bookRepository.findOne({
            relations: ['author', 'genres', 'bookInstances'],
            where: { id },
        });
    };

    async createBook(bookInput: any): Promise<Book> {
        const { title, author, summary, isbn, genres } = bookInput;

        let genreEntities: Genre[] = [];
        if (genres && Array.isArray(genres) && genres.length > 0) {
            genreEntities = await AppDataSource.getRepository(Genre).findByIds(genres);
        }

        const newBook = this.bookRepository.create({
            title,
            summary,
            isbn,
            author: author || undefined,
            genres: genreEntities.length > 0 ? genreEntities : undefined,
        });

        return await this.bookRepository.save(newBook);
    }

    async updateBook(
        book: Book,
        title: string,
        author: Author,
        summary: string,
        isbn: string,
        genres: Genre[]
    ) {
        book.title = title;
        book.author = author;
        book.summary = summary;
        book.isbn = isbn;
        book.genres = genres;
        return this.bookRepository.save(book);
    };

    async deleteBook(id: number) {
        return this.bookRepository.delete(id);
    }
}
